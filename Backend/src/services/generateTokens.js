import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import ms from "ms";
const generateToken = async (uid) => {
    try {
        const user =await User.findById(uid);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        const accessTokenExpiry = ms(process.env.ACCESS_TOKEN_EXPIRY);
        const refreshTokenExpiry = ms(process.env.REFRESH_TOKEN_EXPIRY);
    
        return {
          accessToken,
          refreshToken,
          accessTokenExpiry,
          refreshTokenExpiry,
        };
    } catch (error) {
        throw new ApiError(
          500,
          "Something wrong while generating referesh and access token"
        );
    }
}
export {generateToken}