import mongoose from "mongoose";

const watchlaterModal = new mongoose.Schema({
    Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    videoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    position:{
        type:Number,
        default:0
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
        timestamps:true
    })

export const WatchLater = mongoose.model("WatchLater",watchlaterModal)