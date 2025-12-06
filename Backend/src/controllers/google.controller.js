import { User } from "../models/user.model.js";
import { getAccessAndRefreshTokens } from "../utils/generateTokens.js";

export const googleAuth = async (req, res, next) => {
  try {
    const { email, fullName, avatar, googleId } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const username = email.split("@")[0];

      user = await User.create({
        email,
        fullName: fullName || username,
        username,
        avatar,
        password: googleId || Math.random().toString(36).slice(-12), // dummy
        isEmailverified: true,
      });
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
      .json({
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
        },
        accessToken,
      });
  } catch (err) {
    next(err);
  }
};
