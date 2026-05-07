import express from "express";
import authController from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // 5 lần thử
  message: "Too many login attempts"
});

router.post("/login", loginLimiter, authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

// protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;