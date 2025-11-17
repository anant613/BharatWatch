import express from "express";
import * as snipsController from "../controllers/snips.controller.js"; // Assuming you are using named exports

const router = express.Router();

router.get("/", snipsController.getAllSnips);
router.get("/:id", snipsController.getSnipById);
router.post("/", snipsController.createSnip);
router.post("/:id/comment", snipsController.addComment);
router.post("/:id/like", snipsController.likeSnip);
router.delete("/:id", snipsController.deleteSnip);

export default router;
