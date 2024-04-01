import express from "express";
import {
  getProducts,
  getProductsById,
} from "../controllers/productController.js";

const router = express.Router();
//calls for the productControllers
router.route("/").get(getProducts);
router.route("/:id").get(getProductsById);

export default router;
