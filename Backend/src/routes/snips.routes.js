import express from "express";
import * as snipsController from "../controllers/snips.controller.js"; // Assuming you are using named exports
import { upload } from "../middlewares/multer.middleware.js";
import { uploadLimiter } from "../middlewares/security.middleware.js";

const router = express.Router();

router.post("/upload", uploadLimiter,
 //authMiddleware, Temrorily disabled for testing
    upload.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 }
]), snipsController.uploadSnip);
router.patch('/:id', snipsController.updateSnip);
router.post("/:id/comment",snipsController.addComment);
router.post("/:id/like", snipsController.likeSnip);
router.get("/", snipsController.getAllSnips);
router.get("/:id", snipsController.getSnipById);
router.post("/:id/comment", snipsController.addComment);
router.post("/:id/like", snipsController.likeSnip);
router.delete("/:id", snipsController.deleteSnip);
router.patch("/:id/publish", snipsController.publishSnip);


export default router;
