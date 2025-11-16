import { Router } from "express";
import { 
    uploadVideo, 
    getAllVideos, 
    getVideoById, 
    toggleVideoLike, 
    addToWatchLater, 
    getTrendingVideos 
} from "../controllers/video.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/upload").post(
    authMiddleware,
    upload.fields([
        { name: "videoFile", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    uploadVideo
);

router.route("/").get(getAllVideos);
router.route("/trending").get(getTrendingVideos);
router.route("/:videoId").get(getVideoById);
router.route("/:videoId/like").post(authMiddleware, toggleVideoLike);
router.route("/:videoId/watchlater").post(authMiddleware, addToWatchLater);

export default router;
