import { Router } from "express";
import { likeComment, replyToComment, getReplies, likeReply } from "../controllers/comment.controller.js";

const router = Router();

router.post("/:commentId/like", likeComment);
router.post("/:commentId/replies", replyToComment);
router.get("/:commentId/replies", getReplies);
router.post("/:commentId/replies/:replyId/like", likeReply);

export default router;
