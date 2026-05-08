import asyncHandler from "../middleware/asyncHandler.js";
import Analytics from "../models/AnalyticsModel.js";

// @desc    Înregistrează o postare nouă (venită din procesul AI/Scraper)
// @route   POST /api/analytics
// @access  Private/Admin
const createSocialPostRecord = asyncHandler(async (req, res) => {
  const { source, postId, contentStyle, product } = req.body;

  const record = new Analytics({
    source,
    postId,
    contentStyle,
    product,
  });

  const createdRecord = await record.save();
  res.status(201).json(createdRecord);
});

// @desc    Înregistrează un click de pe social media
// @route   PUT /api/analytics/:id/click
// @access  Public
const registerClick = asyncHandler(async (req, res) => {
  const record = await Analytics.findById(req.params.id);

  if (record) {
    record.clicks += 1;
    await record.save();
    res.json({ message: "Click înregistrat cu succes" });
  } else {
    res.status(404);
    throw new Error("Înregistrarea analytics nu a fost găsită");
  }
});

// @desc    Obține toate statisticile pentru dashboard-ul admin
// @route   GET /api/analytics
// @access  Private/Admin
const getAnalyticsSummary = asyncHandler(async (req, res) => {
  const stats = await Analytics.find({}).populate("product", "name price");
  res.json(stats);
});

export { createSocialPostRecord, registerClick, getAnalyticsSummary };