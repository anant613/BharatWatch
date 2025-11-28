import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    user: String,
    text: String,
    profile: String,
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    user: String,
    text: String,
    profile: String,
    likes: { type: Number, default: 0 },
    replies: [replySchema], // yahan number nahi, array
  },
  { timestamps: true }
);

const snipSchema = new mongoose.Schema({
  videoFile: String,
  title: String,
  caption: String,
  songTitle: String,
  artist: String,
  comments: [commentSchema],
  likeCount: { type: Number, default: 0 },
  isDraft: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Snip", snipSchema);
