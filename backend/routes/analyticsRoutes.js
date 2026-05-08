import express from "express";
const router = express.Router();
import {
  createSocialPostRecord,
  registerClick,
  getAnalyticsSummary,
} from "../controllers/analyticsController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, createSocialPostRecord)
  .get(protect, admin, getAnalyticsSummary);

router.route("/:id/click").put(registerClick);

export default router;