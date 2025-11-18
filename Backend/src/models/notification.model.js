import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content: {type: String,
        required: true
    },
    
    isRead: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["video", "comment", "reply", "like", "subscription", "message"],
        required: true
    }
},
{
    timestamps: true
});

export const Notification = mongoose.model("Notification",notificationSchema)   