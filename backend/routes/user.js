import express from "express";
import path from "path";
import {
  handleGetUser,
  handleDeleteUser,
  handleChangePassword,
  getLoginHistory,
  updateProfile,
} from "../controllers/user.js";

import upload from "../middlewares/upload.js";

const userRouter = express.Router();

// Get user info
userRouter.get("/", handleGetUser);

// Delete user (consider changing method to DELETE later)
userRouter.post("/:id", handleDeleteUser);

// Change password
userRouter.patch("/", handleChangePassword);

// Get login history
userRouter.get("/logins", getLoginHistory);

// Upload avatar/profile picture
userRouter.patch("/profile", upload.single("avatar"), updateProfile);

export default userRouter;
