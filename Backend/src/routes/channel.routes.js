import { Router } from "express";
import {
  getChannelProfile,
  getChannelVideos,
  subscribeChannel,
  unsubscribeChannel,
  getSubscriberCount,
  getUserSubscriptions,
} from "../controllers/channel.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { apiLimiter } from "../middlewares/security.middleware.js";

const router = Router();

// Protected routes MUST come first
router.get("/subscriptions/my", authMiddleware, getUserSubscriptions);
router.post("/:channelId/subscribe", authMiddleware, subscribeChannel);
router.delete("/:channelId/subscribe", authMiddleware, unsubscribeChannel);

// Public routes (more specific first)
router.get("/:channelId/subscribers", apiLimiter, getSubscriberCount);
router.get("/:username/videos", apiLimiter, getChannelVideos);
router.get("/:username", apiLimiter, getChannelProfile);

export default router;