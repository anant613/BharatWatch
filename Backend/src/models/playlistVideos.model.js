import mongoose from "mongoose";

const playlistVideosSchema = new mongoose.schema({
    playlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
        required: true
    },
    videoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    addedAt:{
        default: Date.now(),
        type: Date,
        required: true
    },
    Owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},{
    timestamps: true
})

export const PlaylistVideos = mongoose.model("PlaylistVideos",playlistVideosSchema)