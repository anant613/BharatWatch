import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Simple test registration without email/OTP
const testRegister = asyncHandler(async (req, res) => {
  console.log('Test register called with:', req.body);
  
  try {
    const { fullName, email, password, confirmpassword } = req.body;
    
    // Basic validation
    if (!fullName || !email || !password || !confirmpassword) {
      return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
    }
    
    if (password !== confirmpassword) {
      return res.status(400).json(new ApiResponse(400, null, "Passwords do not match"));
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json(new ApiResponse(409, null, "User already exists"));
    }
    
    // Create user
    const newUser = await User.create({
      fullName,
      email,
      password,
      username: email.split('@')[0] + Math.floor(Math.random() * 1000)
    });
    
    // Remove password from response
    const userResponse = await User.findById(newUser._id).select("-password -refreshToken");
    
    return res.status(201).json(new ApiResponse(201, userResponse, "User registered successfully"));
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json(new ApiResponse(500, null, "Registration failed: " + error.message));
  }
});

export { testRegister };
