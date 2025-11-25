import mongoose from "mongoose";

const CommentlikeSchema = new mongoose.Schema(
    {
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    },
    {
        timestamps: true
    }
)

export const commentLike = mongoose.model("commentLike",CommentlikeSchema)