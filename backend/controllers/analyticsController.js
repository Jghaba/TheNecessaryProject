import asyncHandler from "../middleware/asyncHandler.js";
import Analytics from "../models/AnalyticsModel.js";
import { syncInstagramMetrics } from "../utils/instagramScraper.js";

// @desc    Create a new campaign record (called by AI/Scraper pipeline)
// @route   POST /api/analytics
// @access  Private/Admin
const createSocialPostRecord = asyncHandler(async (req, res) => {
  const { source, niche, contentStyle, postId, product } = req.body;

  const record = new Analytics({ source, niche, contentStyle, postId, product });
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

// @desc    Register a conversion (order placed via campaign link)
// @route   PUT /api/analytics/:campaignId/convert
// @access  Private (called internally from order controller)
const registerConversion = asyncHandler(async (req, res) => {
  const { revenue } = req.body;
  const record = await Analytics.findOne({ campaignId: req.params.campaignId });

  if (!record) {
    res.status(404);
    throw new Error("Campaign not found");
  }

  record.conversions += 1;
  record.totalRevenue += Number(revenue) || 0;
  await record.save();
  res.json({ message: "Conversion registered", record });
});

// @desc    Get aggregated KPIs for the admin analytics dashboard
// @route   GET /api/analytics
// @access  Private/Admin
const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const [overallTotals] = await Analytics.aggregate([
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
  ]);

  const byPlatform = await Analytics.aggregate([
    {
      $group: {
        _id: "$source",
        clicks: { $sum: "$clicks" },
        conversions: { $sum: "$conversions" },
        revenue: { $sum: "$totalRevenue" },
      },
    },
    { $sort: { revenue: -1 } },
  ]);

  const campaigns = await Analytics.find({})
    .populate("product", "name price image")
    .sort({ totalRevenue: -1 });

  res.json({
    totals: overallTotals || { totalClicks: 0, totalConversions: 0, totalRevenue: 0 },
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

export { createSocialPostRecord, registerClick, registerConversion, getAnalyticsSummary, triggerInstagramSync };
