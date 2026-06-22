import { GoogleGenerativeAI } from "@google/generative-ai";
import asyncHandler from "../middleware/asyncHandler.js";
import Analytics from "../models/AnalyticsModel.js";
import SiteMetrics from "../models/SiteMetricsModel.js";
import DirectTrafficLog from "../models/DirectTrafficLogModel.js";
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
  await Promise.all([
    DirectTrafficLog.create({ type: "visit", revenue: 0 }),
    SiteMetrics.findOneAndUpdate(
      { _id: "global" },
      { $inc: { directVisits: 1 } },
      { upsert: true }
    ),
  ]);
  res.json({ message: "Direct visit registered" });
});

// @desc    Register a conversion from a campaign link
// @route   PUT /api/analytics/:campaignId/convert
// @access  Private
const registerConversion = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findOne({ _id: orderId, user: req.user._id, isPaid: true });
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
  const order = await Order.findOne({ _id: orderId, user: req.user._id, isPaid: true });
  if (!order) {
    res.status(404);
    throw new Error("Order not found or already attributed");
  }
  await Promise.all([
    DirectTrafficLog.create({ type: "conversion", revenue: order.totalPrice }),
    SiteMetrics.findOneAndUpdate(
      { _id: "global" },
      { $inc: { directConversions: 1, directRevenue: order.totalPrice } },
      { upsert: true }
    ),
  ]);
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
    [directLogTotals],
    dailyOrders,
    dailyDirectVisits,
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
    DirectTrafficLog.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          directVisits: { $sum: { $cond: [{ $eq: ["$type", "visit"] }, 1, 0] } },
          directConversions: { $sum: { $cond: [{ $eq: ["$type", "conversion"] }, 1, 0] } },
          directRevenue: { $sum: "$revenue" },
        },
      },
    ]),
    Order.aggregate([
      { $match: { ...orderDateFilter, isPaid: true } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
          revenue: { $sum: "$totalPrice" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
    DirectTrafficLog.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          visits: { $sum: { $cond: [{ $eq: ["$type", "visit"] }, 1, 0] } },
          conversions: { $sum: { $cond: [{ $eq: ["$type", "conversion"] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  // DirectTrafficLog supports date filter; SiteMetrics is fallback for all-time when no filter
  const hasDateFilter = !!(from && to);
  const direct = hasDateFilter
    ? {
        directVisits: directLogTotals?.directVisits || 0,
        directConversions: directLogTotals?.directConversions || 0,
        directRevenue: directLogTotals?.directRevenue || 0,
      }
    : {
        directVisits: siteMetricsDoc?.directVisits || 0,
        directConversions: siteMetricsDoc?.directConversions || 0,
        directRevenue: siteMetricsDoc?.directRevenue || 0,
      };

  res.json({
    campaign: campaignTotals || { totalClicks: 0, totalConversions: 0, totalRevenue: 0 },
    direct,
    overall: orderTotals || { totalRevenue: 0, totalOrders: 0 },
    byPlatform,
    campaigns,
    hasDateFilter,
    dailyOrders,
    dailyDirectVisits,
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
const PLATFORM_CAPTION_RULES = {
  Instagram: "2-3 punchy sentences + line break + 5-8 hashtags. Total under 200 characters of body text (hashtags separate). Emotional, aspirational tone.",
  TikTok: "1 hook sentence (max 8 words, creates curiosity) + 1-2 lines + 3-5 trending hashtags. Total under 150 characters. Gen-Z tone, energetic.",
  Facebook: "2-3 sentences with a story angle + clear CTA at the end + 1-2 hashtags. Conversational, slightly longer than Instagram.",
  YouTube: "Descriptive title-style opening sentence + 2-3 lines of context + no hashtags. SEO-friendly, keyword-rich.",
};

const generateCampaignContent = asyncHandler(async (req, res) => {
  const { productName, productPrice, platform, niche, contentStyle } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const captionRules = PLATFORM_CAPTION_RULES[platform] || "Engaging, on-brand, max 200 characters + hashtags.";

  const prompt = `You are a social media marketing expert for "TheNecessary", a premium Romanian men's streetwear brand targeting 18-35 urban males.

Campaign inputs:
- Platform: ${platform}
- Product: ${productName} (€${productPrice})
- Niche: ${niche}
- Content style: ${contentStyle}

Generate two outputs:

1. CAPTION — ${captionRules}

2. VIDEO PROMPT — A Runway ML Gen-4 cinematic prompt. Rules:
   - HARD LIMIT: under 900 characters total
   - Format: [scene + model description]. [lighting]. Sequence: [shot 1] → [shot 2] → [close-up detail shot]. [mood/aesthetic keywords].
   - Use technical camera terms: rack focus, tracking shot, slow zoom, shallow DOF
   - Separate camera moves with →
   - End with 3-5 aesthetic keywords (e.g. "film grain, 4K, editorial fashion")
   - NO redundant adjectives, NO long sentences — keep it punchy and visual

Return ONLY a valid JSON object, no markdown, no explanation:
{
  "caption": "...",
  "videoPrompt": "..."
}`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const cleaned = raw.replace(/^```json\n?/, "").replace(/\n?```$/, "");
  const content = JSON.parse(cleaned);

  // Enforce 900 char hard limit on videoPrompt
  if (content.videoPrompt && content.videoPrompt.length > 900) {
    content.videoPrompt = content.videoPrompt.slice(0, 897) + "...";
  }

  res.json(content);
});

// @desc    Delete a campaign record
// @route   DELETE /api/analytics/:campaignId
// @access  Private/Admin
const deleteCampaign = asyncHandler(async (req, res) => {
  const record = await Analytics.findOneAndDelete({ campaignId: req.params.campaignId });
  if (!record) {
    res.status(404);
    throw new Error("Campaign not found");
  }
  res.json({ message: "Campaign deleted" });
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
  deleteCampaign,
};
