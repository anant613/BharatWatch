import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      index: true,
    },

    watchDuration: {
      type: Number, // seconds user watched
      default: 0,
    },

    videoDuration: {
      type: Number, // cached total duration
      default: 0,
    },

    watchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
