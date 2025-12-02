import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/user.model.js";
import { genrateOtp } from "../services/generateOtp.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {sendVerificationMail} from "../services/sendMail.js"
import {generateToken} from "../services/generateTokens.js"

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

//register user
const registerUser = asyncHandler(async (req, res) => {
  console.log('Registration request received:', req.body);
  
  try {
    const { fullName, email, password, confirmpassword } = req.body; 
    
    // Basic validation
    if (password != confirmpassword) {
      throw new ApiError(400, "Passwords do not match");
    }
    if (
        [fullName, email, password, confirmpassword].some(
          (field) => field?.trim() === ""
        )
      ) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user exists
    const existedUser = await User.findOne({email});
    if(existedUser){
      throw new ApiError(409, "User already exists");
    }
    
    // Generate OTP
    const otp = genrateOtp();
    console.log('Generated OTP:', otp);

    // Create user
    const newUser = await User.create({
      fullName,
      email,
      password,
      username: email.split('@')[0] + Math.floor(Math.random() * 1000)
    });
    
    console.log('User created:', newUser._id);
    
    if (!newUser) {
      throw new ApiError(500, "User registration failed. Please try again later.");
    }

    // Try to send email (don't fail if this fails)
    try {
      await sendVerificationMail(otp, newUser);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.log('Email sending failed (continuing anyway):', error.message);
    }

    // Update user with OTP
    const createduser = await User.findByIdAndUpdate(newUser._id, {
      $set: {
        emailVerificationOtp: otp,
        emailOtpExpiry: Date.now() + 30 * 60 * 1000,
      },
    }, { new: true }).select("-password -emailVerificationOtp");

    if (!createduser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
    
    console.log("User successfully created", createduser._id);
    
    return res
      .status(201)
      .json(new ApiResponse(201, createduser, "User registered successfully"));
      
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Registration failed: " + error.message);
  }
})


//login user

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Account does not exist. Please sign up first.");
  }
  const isPasswordcorrect = await user.isPasswordCorrect(password);
  if (!isPasswordcorrect) {
    throw new ApiError(401, "Invalid user credentials");
  }
  const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } =
    await generateToken(user._id);

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!loggedinUser) {
    throw new ApiError(500, "Unable to log in. Please try again later.");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: accessTokenExpiry,
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: refreshTokenExpiry,
    })
    .json(
      new ApiResponse(
        200,
        { user: loggedinUser, accessToken, refreshToken },
        "User logged in sucessfully"
      )
    );
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log("user log ", user._id);

  const loggesoutUser = await User.findByIdAndUpdate(
    user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );
  if (!loggesoutUser) {
    throw new ApiError(401, "Anauthorized request");
  }
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out sucessfully"));
});

//edit user details, add description,
const editUserdetails = asyncHandler(async (req, res) => {
  const user = req.user;
  const { fullName, email, description, username } = req.body;
  if (!fullName && !email && !description && !username) {
    throw new ApiError(400, "At least one field should be filled.");
  }
  const updates = {};
  if (fullName) updates.fullName = fullName;
  if (email) updates.email = email;
  if (description) updates.description = description;
  if (username) updates.username = username;
  const editedUser = await User.findByIdAndUpdate(user._id, updates, {
    new: true,
  }).select("-password -refreshToken");
  if (!editedUser) {
    throw new ApiError(404, "Username not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, editedUser, "user created successfully"));
});

//get user details

const getUserDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Anauthorized request");
  }

  const getUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  res.status(200).json(new ApiResponse(200, getUser, "User details sent"));
});

export { registerUser, loginUser, logoutUser, editUserdetails, getUserDetails };

//deit details
