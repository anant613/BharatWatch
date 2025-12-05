import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { getAccessAndRefreshTokens } from "../utils/generateTokens.js";

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingToken)
      return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(
      incomingToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== incomingToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken } =
      await getAccessAndRefreshTokens(user);

    const isProd = process.env.NODE_ENV === "production";

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
