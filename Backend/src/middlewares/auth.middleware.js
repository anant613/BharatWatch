import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
const authMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Access denied. No token provided.");
    }
    console.log(token);
    const decoded_AccessToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!decoded_AccessToken) {
      throw new ApiError(401, "Access denied. Token Expired or Invalid");
    }
    const userId = decoded_AccessToken._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(401, "User not found.");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);

    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
export { authMiddleware };
