import { asyncHandler} from  "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Video } from "../models/video.model.js"
import Subscription from "../models/subscribe.model.js"
import mongoose from "mongoose";


// Get channel profile by username
const getChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is required");
  }

  const channel = await User.findOne({ username: username.toLowerCase() }).select(
    "-password -refreshToken -emailVerificationOtp -emailOtpExpiry"
  );

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const subscriberCount = await Subscription.countDocuments({ creator: channel._id });
  const videoCount = await Video.countDocuments({ 
    owner: channel._id, 
    isPublished: true, 
    visibility: "public" 
  });

  const isSubscribed = req.user
    ? await Subscription.findOne({
        subscriber: req.user._id,
        creator: channel._id,
      })
    : null;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: channel._id,
        username: channel.username,
        fullName: channel.fullName,
        email: channel.email,
        avatar: channel.avatar,
        Banner: channel.Banner,
        description: channel.description,
        subscriberCount,
        videoCount,
        isSubscribed: !!isSubscribed,
        createdAt: channel.createdAt,
      },
      "Channel profile fetched successfully"
    )
  );
});

// Get channel videos
const getChannelVideos = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is required");
  }

  const channel = await User.findOne({ username: username.toLowerCase() });
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const videos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(channel._id),
        isPublished: true,
        visibility: "public",
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
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        thumbnail: 1,
        videoFile: 1,
        duration: 1,
        views: 1,
        likes: 1,
        owner: 1,
        createdAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: (parseInt(page) - 1) * parseInt(limit) },
    { $limit: parseInt(limit) },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

// Subscribe to channel
const subscribeChannel = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
  }

  const channel = await User.findById(channelId);
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  if (channelId === req.user._id.toString()) {
    throw new ApiError(400, "Cannot subscribe to your own channel");
  }

  const existingSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    creator: channelId,
  });

  if (existingSubscription) {
    throw new ApiError(400, "Already subscribed to this channel");
  }

  await Subscription.create({
    subscriber: req.user._id,
    creator: channelId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Subscribed to channel successfully"));
});

// Unsubscribe from channel
const unsubscribeChannel = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
  }

  const subscription = await Subscription.findOneAndDelete({
    subscriber: req.user._id,
    creator: channelId,
  });

  if (!subscription) {
    throw new ApiError(404, "Subscription not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Unsubscribed from channel successfully"));
});

// Get subscriber count
const getSubscriberCount = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!mongoose.isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
  }

  const count = await Subscription.countDocuments({ creator: channelId });

  return res
    .status(200)
    .json(new ApiResponse(200, { subscriberCount: count }, "Subscriber count fetched"));
});

// Get user subscriptions
const getUserSubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find({
    subscriber: req.user._id,
  }).populate("creator", "username fullName avatar");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscriptions,
        "User subscriptions fetched successfully"
      )
    );
});

export {
  getChannelProfile,
  getChannelVideos,
  subscribeChannel,
  unsubscribeChannel,
  getSubscriberCount,
  getUserSubscriptions,
};
