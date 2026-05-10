import mongoose from "mongoose";
import crypto from "crypto";

const analyticsSchema = mongoose.Schema(
  {
    campaignId: {
      type: String,
      unique: true,
      default: () => crypto.randomUUID(),
    },
    source: {
      type: String,
      required: true,
      enum: ["TikTok", "Instagram", "Facebook", "YouTube"],
    },
    niche: {
      type: String,
      required: true,
    },
    contentStyle: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },

    // Instagram Graph API fields — populated by scraper
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    saved: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
