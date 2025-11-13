import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ChannelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    channelName:{
        type: String,
        required: true
    },
   
})

export default  mongoose.model("Subscriber",subscriberSchema)