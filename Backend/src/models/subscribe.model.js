import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// A user cannot subscribe to the same creator twice
subscriptionSchema.index({ subscriber: 1, creator: 1 }, { unique: true });

// Useful indexes for analytics
subscriptionSchema.index({ creator: 1 }); // Get list of subscribers fast
subscriptionSchema.index({ subscriber: 1 }); // Get user’s subscriptions fast

export default mongoose.model("Subscription", subscriptionSchema);
