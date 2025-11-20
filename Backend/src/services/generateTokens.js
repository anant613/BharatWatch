import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ms from "ms";

const generateToken = async (uid) => {
    try {
        if (!uid) {
            throw new ApiError(400, "User ID is required");
        }

        const user = await User.findById(uid);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Check if environment variables exist
        if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
            throw new ApiError(500, "Token secrets not configured");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        if (!accessToken || !refreshToken) {
            throw new ApiError(500, "Failed to generate tokens");
        }
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        
        // Use default values if ms parsing fails
        let accessTokenExpiry, refreshTokenExpiry;
        try {
            accessTokenExpiry = ms(process.env.ACCESS_TOKEN_EXPIRY || '5d');
            refreshTokenExpiry = ms(process.env.REFRESH_TOKEN_EXPIRY || '20d');
        } catch (msError) {
            accessTokenExpiry = 5 * 24 * 60 * 60 * 1000; // 5 days in ms
            refreshTokenExpiry = 20 * 24 * 60 * 60 * 1000; // 20 days in ms
        }
    
        return {
          accessToken,
          refreshToken,
          accessTokenExpiry,
          refreshTokenExpiry,
        };
    } catch (error) {
        console.error("Token generation error:", error);
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(
          500,
          "Something went wrong while generating refresh and access token"
        );
    }
};

export { generateToken };
