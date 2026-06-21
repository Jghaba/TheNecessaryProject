import mongoose from "mongoose";

const directTrafficLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["visit", "conversion"],
      required: true,
    },
    revenue: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DirectTrafficLog = mongoose.model("DirectTrafficLog", directTrafficLogSchema);

export default DirectTrafficLog;
