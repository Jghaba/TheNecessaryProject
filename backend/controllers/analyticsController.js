import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "../middleware/asyncHandler.js";
import Analytics from "../models/AnalyticsModel.js";
import SiteMetrics from "../models/SiteMetricsModel.js";
import Order from "../models/OderModel.js";
import { syncInstagramMetrics } from "../utils/instagramScraper.js";

// @desc    Create a new campaign record (called by AI/Scraper pipeline)
// @route   POST /api/analytics
// @access  Private/Admin
const createSocialPostRecord = asyncHandler(async (req, res) => {
  const { source, niche, contentStyle, postId, product, cost } = req.body;
  const record = new Analytics({ source, niche, contentStyle, postId, product, cost: Number(cost) || 0 });
  const createdRecord = await record.save();
  res.status(201).json(createdRecord);
});

// @desc    Register a click from a social media tracking URL
// @route   PUT /api/analytics/:campaignId/click
// @access  Public
const registerClick = asyncHandler(async (req, res) => {
  const record = await Analytics.findOne({ campaignId: req.params.campaignId });
  if (!record) {
    res.status(404);
    throw new Error("Campaign not found");
  }
  record.clicks += 1;
  await record.save();
  res.json({ message: "Click registered" });
});

// @desc    Register a direct site visit (no campaign link)
// @route   POST /api/analytics/direct-visit
// @access  Public
const registerDirectVisit = asyncHandler(async (req, res) => {
  await SiteMetrics.findOneAndUpdate(
    { _id: "global" },
    { $inc: { directVisits: 1 } },
    { upsert: true }
  );
  res.json({ message: "Direct visit registered" });
});

// @desc    Register a conversion from a campaign link
// @route   PUT /api/analytics/:campaignId/convert
// @access  Private
const registerConversion = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findOne({ _id: orderId, user: req.user._id, isPaid: false });
  if (!order) {
    res.status(404);
    throw new Error("Order not found or already attributed");
  }
  const record = await Analytics.findOne({ campaignId: req.params.campaignId });
  if (!record) {
    res.status(404);
    throw new Error("Campaign not found");
  }
  record.conversions += 1;
  record.totalRevenue += order.totalPrice;
  await record.save();
  res.json({ message: "Conversion registered", record });
});

// @desc    Register a direct conversion (no campaign)
// @route   POST /api/analytics/direct-convert
// @access  Private
const registerDirectConversion = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findOne({ _id: orderId, user: req.user._id, isPaid: false });
  if (!order) {
    res.status(404);
    throw new Error("Order not found or already attributed");
  }
  await SiteMetrics.findOneAndUpdate(
    { _id: "global" },
    { $inc: { directConversions: 1, directRevenue: order.totalPrice } },
    { upsert: true }
  );
  res.json({ message: "Direct conversion registered" });
});

// @desc    Get aggregated KPIs for the admin analytics dashboard
// @route   GET /api/analytics
// @access  Private/Admin
const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const { from, to } = req.query;
  const dateFilter =
    from && to ? { createdAt: { $gte: new Date(from), $lte: new Date(to) } } : {};
  const orderDateFilter = from && to
    ? { isPaid: true, paidAt: { $gte: new Date(from), $lte: new Date(to) } }
    : { isPaid: true };

  const [
    [campaignTotals],
    byPlatform,
    campaigns,
    siteMetricsDoc,
    [orderTotals],
  ] = await Promise.all([
    Analytics.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalClicks: { $sum: "$clicks" },
          totalConversions: { $sum: "$conversions" },
          totalRevenue: { $sum: "$totalRevenue" },
          totalViews: { $sum: "$views" },
          totalLikes: { $sum: "$likes" },
          totalShares: { $sum: "$shares" },
          totalSaved: { $sum: "$saved" },
        },
      },
    ]),
    Analytics.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$source",
          clicks: { $sum: "$clicks" },
          conversions: { $sum: "$conversions" },
          revenue: { $sum: "$totalRevenue" },
        },
      },
      { $sort: { revenue: -1 } },
    ]),
    Analytics.find(dateFilter)
      .populate("product", "name price image")
      .sort({ totalRevenue: -1 }),
    SiteMetrics.findOne({ _id: "global" }),
    Order.aggregate([
      { $match: orderDateFilter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
    ]),
  ]);

  const siteMetrics = siteMetricsDoc || {
    directVisits: 0,
    directConversions: 0,
    directRevenue: 0,
  };

  res.json({
    campaign: campaignTotals || {
      totalClicks: 0,
      totalConversions: 0,
      totalRevenue: 0,
    },
    direct: siteMetrics,
    overall: orderTotals || { totalRevenue: 0, totalOrders: 0 },
    byPlatform,
    campaigns,
  });
});

// @desc    Manually trigger Instagram metrics sync
// @route   POST /api/analytics/sync
// @access  Private/Admin
const triggerInstagramSync = asyncHandler(async (req, res) => {
  const result = await syncInstagramMetrics();
  res.json({ message: "Sync complete", ...result });
});

// @desc    Link an Instagram post URL to a campaign
// @route   PUT /api/analytics/:campaignId/post
// @access  Private/Admin
const setPostId = asyncHandler(async (req, res) => {
  const { postUrl } = req.body;
  const match = postUrl.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
  if (!match) {
    res.status(400);
    throw new Error("Invalid Instagram post URL");
  }
  const shortcode = match[1];
  const record = await Analytics.findOne({ campaignId: req.params.campaignId });
  if (!record) {
    res.status(404);
    throw new Error("Campaign not found");
  }
  record.postId = shortcode;
  await record.save();
  res.json({ message: "Post linked", postId: shortcode });
});

// @desc    Generate AI caption + Kling prompt for a campaign
// @route   POST /api/analytics/generate
// @access  Private/Admin
const generateCampaignContent = asyncHandler(async (req, res) => {
  const { productName, productPrice, platform, niche, contentStyle } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a social media marketing expert for "TheNecessary", a premium streetwear clothing brand. Generate content for a social media campaign.

Platform: ${platform}
Product: ${productName} (€${productPrice})
Niche: ${niche}
Content Style: ${contentStyle}

Return ONLY a valid JSON object with exactly these two fields (no markdown, no explanation, no code blocks):
{
  "caption": "engaging caption with relevant hashtags, adapted to platform tone, max 250 words",
  "videoPrompt": "detailed Runway ML video generation prompt to animate the product image: describe movement, lighting, camera angles, mood, background, style — be cinematic and specific"
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const cleaned = raw.replace(/^```json\n?/, "").replace(/\n?```$/, "");
  const content = JSON.parse(cleaned);
  res.json(content);
});

export {
  createSocialPostRecord,
  setPostId,
  generateCampaignContent,
  registerClick,
  registerDirectVisit,
  registerConversion,
  registerDirectConversion,
  getAnalyticsSummary,
  triggerInstagramSync,
};
