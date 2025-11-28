import express from "express";
import * as snipsController from "../controllers/snips.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadLimiter } from "../middlewares/security.middleware.js";

const router = express.Router();

router.post(
  "/upload",
  uploadLimiter,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  snipsController.uploadSnip
);

// Update snip
router.patch("/:id", snipsController.updateSnip);

// Comments
router.post("/:id/comment", snipsController.addComment); // add top-level comment
router.post("/:id/comment/:commentId/reply", snipsController.addReply); // reply to comment
router.post("/:id/comment/:commentId/like", snipsController.likeComment); // like a comment

// Likes on snip
router.post("/:id/like", snipsController.likeSnip);

// Get snips
router.get("/", snipsController.getAllSnips);
router.get("/:id", snipsController.getSnipById);

// Delete / publish
router.delete("/:id", snipsController.deleteSnip);
router.patch("/:id/publish", snipsController.publishSnip);


export default router;
