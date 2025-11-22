import { ApiError, ApiResponse, asyncHandler } from "../utils/utils.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { Liked } from "../models/videoLike.model.js";
import { Comment } from "../models/comment.model.js";
import { WatchLater } from "../models/watchLater.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/uploadoncloudinary.js";

// Upload video
const uploadVideo = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      visibility = "public",
      isDraft = false,
      videoUrl, // <-    JSON body se link bhi aayega
    } = req.body;

    if (!title?.trim() || !description?.trim()) {
      throw new ApiError(400, "Title and description are required");
    }

    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    // Pehle yeh check karo: ya file ya URL mandatory hai
    if (!videoLocalPath && !videoUrl) {
      throw new ApiError(
        400,
        "Video file (upload) ya videoUrl (link) required"
      );
    }

    let videoFileURL = "";
    let videoDuration = 0;

    if (videoLocalPath) {
      // Agar file bheji hai toh — upload to Cloudinary
      const videoFile = await uploadOnCloudinary(videoLocalPath);
      if (!videoFile) throw new ApiError(400, "Failed to upload video");
      videoFileURL = videoFile.url;
      videoDuration = videoFile.duration || 0;
    } else if (videoUrl) {
      // Agar direct link di hai toh (bina file ke)
      videoFileURL = videoUrl.trim();
      // duration ke liye parse kar sakte ho (custom logic), ya 0 by default.
    }

    // Thumbnail logic same rakho
    const thumbnail = thumbnailLocalPath
      ? await uploadOnCloudinary(thumbnailLocalPath)
      : null;

    const video = await Video.create({
      title,
      description,
      videoFile: videoFileURL,
      thumbnail: thumbnail?.url || "",
      duration: videoDuration,
      owner: req.user?._id || new mongoose.Types.ObjectId(),
      visibility,
      isDraft: isDraft === "true" || isDraft === true,
      isPublished: !isDraft,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, video, "Video uploaded successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to upload video");
  }
});

// Get all videos
const getAllVideos = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10, query } = req.query;

    const pipeline = [];

    if (query) {
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
      });
    }

    const { drafts = "false" } = req.query;
    const isDraftOnly = drafts === "true";

    pipeline.push({
      $match: isDraftOnly
        ? { isDraft: true }
        : {
            $and: [
              {
                $or: [
                  { isPublished: true },
                  { isPublished: { $exists: false } },
                ],
              },
              { $or: [{ isDraft: false }, { isDraft: { $exists: false } }] },
              { visibility: "public" },
            ],
          },
    });

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [{ $project: { username: 1, fullName: 1, avatar: 1 } }],
      },
    });
    pipeline.push({ $addFields: { owner: { $first: "$owner" } } });
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: (parseInt(page) - 1) * parseInt(limit) });
    pipeline.push({ $limit: parseInt(limit) });

    const videos = await Video.aggregate(pipeline);

    return res
      .status(200)
      .json(new ApiResponse(200, videos, "Videos fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to fetch videos");
  }
});

// Get video by ID
const getVideoById = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(videoId),
          isPublished: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [{ $project: { username: 1, fullName: 1, avatar: 1 } }],
        },
      },
      { $addFields: { owner: { $first: "$owner" } } },
    ]);

    if (!video?.length) {
      throw new ApiError(404, "Video not found");
    }

    await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

    return res
      .status(200)
      .json(new ApiResponse(200, video[0], "Video fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to fetch video");
  }
});

// Toggle like video
const toggleVideoLike = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(404, "Video not found");
    }

    const existingLike = await Liked.findOne({
      video: videoId,
      likedBy: req.user._id,
    });

    if (existingLike) {
      await Liked.findByIdAndDelete(existingLike._id);
      await Video.findByIdAndUpdate(videoId, { $inc: { likes: -1 } });
      return res
        .status(200)
        .json(
          new ApiResponse(200, { isLiked: false }, "Video unliked successfully")
        );
    } else {
      await Liked.create({
        video: videoId,
        likedBy: req.user._id,
        Id: req.user._id,
      });
      await Video.findByIdAndUpdate(videoId, { $inc: { likes: 1 } });
      return res
        .status(200)
        .json(
          new ApiResponse(200, { isLiked: true }, "Video liked successfully")
        );
    }
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to toggle like");
  }
});

// Add to watch later
const addToWatchLater = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!mongoose.isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(404, "Video not found");
    }

    const existingWatchLater = await WatchLater.findOne({
      videoId: videoId,
      Owner: req.user._id,
    });

    if (existingWatchLater) {
      throw new ApiError(400, "Video already in watch later");
    }

    await WatchLater.create({
      Id: req.user._id,
      videoId: videoId,
      Owner: req.user._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Video added to watch later"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to add to watch later");
  }
});

// Get trending videos
const getTrendingVideos = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pipeline = [
      { $match: { isPublished: true, visibility: "public" } },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [{ $project: { username: 1, fullName: 1, avatar: 1 } }],
        },
      },
      {
        $addFields: {
          owner: { $first: "$owner" },
          trendingScore: {
            $add: [
              { $multiply: ["$views", 0.7] },
              { $multiply: ["$likes", 0.3] },
            ],
          },
        },
      },
      { $sort: { trendingScore: -1, createdAt: -1 } },
      { $skip: (parseInt(page) - 1) * parseInt(limit) },
      { $limit: parseInt(limit) },
    ];

    const videos = await Video.aggregate(pipeline);

    return res
      .status(200)
      .json(
        new ApiResponse(200, videos, "Trending videos fetched successfully")
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to fetch trending videos");
  }
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const updateData = req.body;
  const video = await Video.findByIdAndUpdate(videoId, updateData, {
    new: true,
  });
  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  res.status(200).json(new ApiResponse(200, video, "Video updated"));
});

export {
  uploadVideo,
  getAllVideos,
  getVideoById,
  toggleVideoLike,
  addToWatchLater,
  getTrendingVideos,
  updateVideo,
};
