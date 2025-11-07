import mongoose from "mongoose";

const playlistVideosSchema = new mongoose.schema({
    Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    PlaylistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
    },
    position:{
        type: Number,
        default: 0
    },
    addedAt:{
        default: Date.now(),
        type: Date
    },
    Owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{
    timestamps: true
})

export const PlaylistVideos = mongoose.model("PlaylistVideos",playlistVideosSchema)