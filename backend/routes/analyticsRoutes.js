import express from "express";
import {
  createSocialPostRecord,
  registerClick,
  registerConversion,
  getAnalyticsSummary,
  triggerInstagramSync,
} from "../controllers/analyticsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getAnalyticsSummary).post(protect, admin, createSocialPostRecord);

router.route("/sync").post(protect, admin, triggerInstagramSync);

router.route("/:campaignId/click").put(registerClick);

router.route("/:campaignId/convert").put(protect, registerConversion);

export default router;
