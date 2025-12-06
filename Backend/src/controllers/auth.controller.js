import { User } from "../models/user.model.js";
import axios from "axios";   
import { getAccessAndRefreshTokens } from "../utils/generateTokens.js";

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);



//ZOHO AUTH CONTROLLER
export const zohoAuth = async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: "Authorization code missing" });
    }

    // Step 1: code -> access token
    const tokenRes = await axios.post(
      `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        redirect_uri: process.env.ZOHO_REDIRECT_URI,
        code,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenRes.data.access_token;

    // Step 2: Zoho se current user info (email, name) lao
    const meRes = await axios.get(
      "https://accounts.zoho.in/oauth/user/info",
      {
        headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      }
    );

    const zohoUser = meRes.data;
    const email = zohoUser.Email;
    const fullName = zohoUser.Display_Name || zohoUser.first_name;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Could not get email from Zoho account" });
    }

    // Step 3: apne DB me user find/create
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        fullName,
        username: email.split("@")[0],
        password: Math.random().toString(36).slice(-12),
        isEmailverified: true,
      });
    }

    // Step 4: Google jaisa JWT + refresh token generate
    const { accessToken: jwtAccess, refreshToken } =
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
        user,
        accessToken: jwtAccess,
      });
  } catch (err) {
    next(err);
  }
};


// SIGNUP
export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Email already registered" });
    }

    const username = email.split("@")[0];

    const user = await User.create({
      fullName,
      email,
      password,
      username,
    });

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
      .status(201)
      .json({
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          isEmailverified: user.isEmailverified,
        },
        accessToken,
      });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ message: "Invalid email or password" });

    const ok = await user.isPasswordCorrect(password);
    if (!ok)
      return res
        .status(401)
        .json({ message: "Invalid email or password" });

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
          isEmailverified: user.isEmailverified,
        },
        accessToken,
      });
  } catch (err) {
    next(err);
  }
};

// LOGOUT
export const logoutUser = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (userId) {
      await User.findByIdAndUpdate(
        userId,
        { $unset: { refreshToken: 1 } },
        { new: true }
      );
    }

    const isProd = process.env.NODE_ENV === "production";

    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
      })
      .json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};
