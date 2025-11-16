import mongoose from "mongoose";

const LikedSchema = new mongoose.Schema(
    {
        likedBy: {
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

export const Liked = mongoose.model("Liked",LikedSchema)