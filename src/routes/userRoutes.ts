import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getUser, changePassword } from "../controllers/usersController";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.post("/change-password", authMiddleware, changePassword);

export default router;