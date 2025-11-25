import mongoose from "mongoose";

const ReplyLikeSchema = new mongoose.Schema(
    {
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reply: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CommentReply"
        }
    },
    {
        timestamps: true
    }
)

export const replyLike = mongoose.model("replyLike", ReplyLikeSchema)
