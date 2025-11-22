import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

export const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body; // Changed from content to text

  if (!text?.trim()) {
    throw new ApiError(400, "Comment text is required");
  }

  const comment = await Comment.create({
    content: text,
    video: videoId,
    owner: req.user?._id || new mongoose.Types.ObjectId(),
  });

  const populatedComment = await comment.populate("owner", "fullName");

  const transformed = {
    id: populatedComment._id,
    user: populatedComment.owner?.fullName || "Anonymous",
    avatar: populatedComment.owner?.fullName?.charAt(0) || "A",
    time: new Date(populatedComment.createdAt).toLocaleDateString(),
    text: populatedComment.content,
    likes: 0,
    replies: 0,
  };

  res.status(201).json(new ApiResponse(201, transformed, "Comment added successfully"));
});

export const getComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const comments = await Comment.find({ video: videoId })
    .populate("owner", "fullName")
    .sort({ createdAt: -1 });

  const transformedComments = comments.map((comment) => ({
    id: comment._id,
    user: comment.owner?.fullName || "Anonymous",
    avatar: comment.owner?.fullName?.charAt(0) || "A",
    time: new Date(comment.createdAt).toLocaleDateString(),
    text: comment.content,
    likes: comment.likes || 0,
    replies: comment.replies?.length || 0,
  }));

  res.status(200).json(new ApiResponse(200, transformedComments, "Comments fetched successfully"));
});
