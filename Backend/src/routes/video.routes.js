import { Router } from "express";
import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  toggleVideoLike,
  addToWatchLater,
  getTrendingVideos,
} from "../controllers/video.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validateVideoUpload } from "../middlewares/validation.middleware.js";
import { uploadLimiter, apiLimiter } from "../middlewares/security.middleware.js";

const router = Router();

// Video upload with rate limiting and validation (auth temporarily disabled for testing)
router.route("/upload").post(
    uploadLimiter,
    // authMiddleware, // Temporarily disabled for testing
    upload.fields([
        { name: "videoFile", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    validateVideoUpload,
    uploadVideo
);

// Public video routes
router.route("/").get(apiLimiter, getAllVideos);
router.route("/trending").get(apiLimiter, getTrendingVideos);
router.route("/:videoId").get(apiLimiter, getVideoById);

// Authenticated video routes
router.route("/:videoId/like").post(authMiddleware, toggleVideoLike);
router.route("/:videoId/watchlater").post(authMiddleware, addToWatchLater);

export default router;
