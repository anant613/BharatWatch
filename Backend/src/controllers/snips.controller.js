import Snip from "../models/snip.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/uploadoncloudinary.js";

// GET all snips
export const getAllSnips = async (req, res) => {
  try {
    const snips = await Snip.find().sort({ createdAt: -1 });
    res.status(200).json(snips);
  } catch (err) {
    res.status(500).json({ message: "Error fetching snips", error: err });
  }
};

// GET one snip by ID
export const getSnipById = async (req, res) => {
  try {
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ message: "Snip not found" });
    res.status(200).json(snip);
  } catch (err) {
    res.status(500).json({ message: "Error fetching snip", error: err });
  }
};

// POST new snip
// export const createSnip = async (req, res) => {
//   try {
//     const { videoUrl, title, caption, songTitle, artist, comments, likeCount } = req.body;
//     const snip = new Snip({
//       videoUrl,
//       title,
//       caption,
//       songTitle,
//       artist,
//       comments: comments || [],
//       likeCount,
//     });
//     const savedSnip = await snip.save();
//     res.status(201).json(savedSnip);
//   } catch (err) {
//     console.log("Snip Create Error ----", err);
//     res.status(400).json({ message: "Error creating snip", error: err });
//   }
// };

// POST comment
export const addComment = async (req, res) => {
  try {
    const { text, user, profile } = req.body;
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ message: "Snip not found" });

    const comment = { user, text, profile, likes: 0, replies: 0 };
    snip.comments.unshift(comment);
    await snip.save();
    res.status(201).json(snip.comments[0]);
  } catch (err) {
    res.status(400).json({ message: "Error adding comment", error: err });
  }
};

// LIKE/UNLIKE Snip (toggle)
export const likeSnip = async (req, res) => {
  try {
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ message: "Snip not found" });

    // New: Toggle logic using payload
    if ("like" in req.body) {
      if (req.body.like) {
        snip.likeCount = (snip.likeCount || 0) + 1;
      } else {
        snip.likeCount = Math.max(0, (snip.likeCount || 0) - 1);
      }
      await snip.save();
      return res.status(200).json({ likeCount: snip.likeCount, isLiked: req.body.like });
    }

    // Fallback for legacy requests (always increment)
    snip.likeCount = (snip.likeCount || 0) + 1;
    await snip.save();
    res.status(200).json({ likeCount: snip.likeCount });
  } catch (err) {
    res.status(400).json({ message: "Error liking snip", error: err });
  }
};

// Delete a snip
export const deleteSnip = async (req, res) => {
  try {
    const snip = await Snip.findByIdAndDelete(req.params.id);
    if (!snip) return res.status(404).json({ message: "Snip not found" });
    res.status(200).json({ message: "Snip deleted." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting snip", error: err });
  }
};

// Upload Snip
export const uploadSnip = asyncHandler(async (req, res) => {
  const { title, description, visibility } = req.body;
  
  if (!title || !req.files?.videoFile?.[0]) {
    throw new ApiError(400, "Title and video file are required");
  }

  const videoLocalPath = req.files?.videoFile?.[0]?.path;
  if (!videoLocalPath) {
    throw new ApiError(400, "Video file upload failed");
  }

  const videoFile = await uploadOnCloudinary(videoLocalPath);
  if(!videoFile){
    throw new ApiError(400, "Video file upload failed");
  };

  const snip = await Snip.create({
    title,
    description,
    visibility : visibility || "public",
    videoFile: videoFile.url,
    owner: req.user?._id || null,
  });

  res.status(201).json(new ApiResponse(201, "Snip uploaded successfully", snip));
});