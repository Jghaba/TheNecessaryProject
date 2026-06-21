import express from "express";
import {
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
} from "../controllers/analyticsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, getAnalyticsSummary)
  .post(protect, admin, createSocialPostRecord);

// Static routes before /:campaignId
router.route("/generate").post(protect, admin, generateCampaignContent);
router.route("/sync").post(protect, admin, triggerInstagramSync);
router.route("/direct-visit").post(registerDirectVisit);
router.route("/direct-convert").post(protect, registerDirectConversion);

// Dynamic routes
router.route("/:campaignId/click").put(registerClick);
router.route("/:campaignId/convert").put(protect, registerConversion);
router.route("/:campaignId/post").put(protect, admin, setPostId);
router.route("/:campaignId").delete(protect, admin, deleteCampaign);

export default router;
