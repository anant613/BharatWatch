import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ChannelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    channel:{
        type: String,
        required: true
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export default  mongoose.model("Subscriber",subscriberSchema)