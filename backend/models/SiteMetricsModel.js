import mongoose from "mongoose";

const siteMetricsSchema = mongoose.Schema(
  {
    _id: { type: String, default: "global" },
    directVisits: { type: Number, default: 0 },
    directConversions: { type: Number, default: 0 },
    directRevenue: { type: Number, default: 0 },
  },
  { _id: false }
);

const SiteMetrics = mongoose.model("SiteMetrics", siteMetricsSchema);

export default SiteMetrics;
