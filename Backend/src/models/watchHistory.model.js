import mongoose from "mongoose";

const WarchhistorySchema = new mongoose.Schema({
    Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    WatchedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    },
    lastPosition:{
        type: Number,
        default: 0
    },
    duration:{
        type: Number,
        default: 0
    },
    WatchedAt:{
      default: Date.now(),
      type: Date  
    }
},{
    timestamps:true
})