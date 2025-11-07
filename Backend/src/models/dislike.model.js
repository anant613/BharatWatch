import mongoose from "mongoose";

const dislikeSchema = new mongoose.Schema(
    {
        Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        dislikedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        },
    },
    {
        timestamps: true
    }
)

export const DisLike = mongoose.model("DisLike",dislikeSchema)