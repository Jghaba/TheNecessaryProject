import mongoose from "mongoose";

const analyticsSchema = mongoose.Schema(
  {
    // Sursa traficului: TikTok, Instagram, etc.
    source: {
      type: String,
      required: true,
      enum: ["TikTok", "Instagram", "Facebook", "YouTube"],
    },
    // Referința către postarea specifică (URL-ul clipului generat cu AI)
    postId: {
      type: String,
      required: true,
    },
    // Stilul de conținut identificat de scraper (ex: 'ASMR', 'Street Interview', 'Unboxing')
    contentStyle: {
      type: String,
      required: true,
    },
    // Produsul promovat în acel clip
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    // Indicatori de Performanță (KPIs)
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    conversions: {
      type: Number,
      required: true,
      default: 0, // Câte comenzi au fost plasate
    },
    totalRevenue: {
      type: Number,
      required: true,
      default: 0.0, // Câți bani a adus postarea respectivă
    },
  },
  {
    timestamps: true, // Ne va permite să vedem evoluția în timp (ex: vânzări pe martie vs aprilie)
  }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;