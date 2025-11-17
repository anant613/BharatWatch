import mongoose from "mongoose";

const watchLaterSchema = new mongoose.Schema(
    {
        Owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const WatchLater = mongoose.model("WatchLater", watchLaterSchema);