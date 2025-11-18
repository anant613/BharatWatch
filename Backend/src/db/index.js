import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('MONGODB_URI:', process.env.MONGODB_URI); // debug line
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
