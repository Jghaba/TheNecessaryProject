import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//calls for the userController func

router.route("/").post(registerUser).get(getUsers);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserByID).put(updateUser);

export default router;
