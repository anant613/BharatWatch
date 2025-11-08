import mongoose from "mongoose";

const subscribedchannelSchema = new mongoose.Schema({
  Id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const SubscribedChannel = mongoose.model("SubscribedChannel", subscribedchannelSchema);