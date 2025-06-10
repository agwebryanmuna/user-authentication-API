import express from "express";
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", authenticateUser, loginUser);

userRouter.post("/update", authenticateUser, updateUser);

userRouter.post("/delete", authenticateUser, deleteUser);

export default userRouter;
