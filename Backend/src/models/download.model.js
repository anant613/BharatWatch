import mongoose from "mongoose";

const downloadSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    quality:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export const Download = mongoose.model("Download",downloadSchema)   