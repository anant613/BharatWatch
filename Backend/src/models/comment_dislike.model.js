import mongoose from "mongoose";

const CommentDislikeSchema = new mongoose.Schema(
    {
        dislikedBy: {
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

export const commentDislike = mongoose.model("commentDislike",CommentDislikeSchema)