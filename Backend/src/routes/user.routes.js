import {
  registerUser,
  loginUser,
  logoutUser,
  editUserdetails,
  getUserDetails,
} from "../controllers/user.controllers.js";
import { testRegister } from "../controllers/test.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateUserRegistration, validateUserLogin } from "../middlewares/validation.middleware.js";
import { authLimiter } from "../middlewares/security.middleware.js";

const router = Router();

// Authentication routes with rate limiting and validation
router.route("/register").post(registerUser);
router.route("/register-with-validation").post(authLimiter, validateUserRegistration, registerUser);
router.route("/test-register").post(testRegister);

// Minimal test route
router.route("/minimal-register").post(async (req, res) => {
  try {
    console.log('Minimal register called');
    res.json({ success: true, message: 'Minimal endpoint works', data: req.body });
  } catch (error) {
    console.error('Minimal register error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});
router.route("/login").post(authLimiter, validateUserLogin, loginUser);
router.route("/logout").post(authMiddleware, logoutUser);

// User management routes
router.route("/profile").get(authMiddleware, getUserDetails);
router.route("/profile").patch(authMiddleware, editUserdetails);

// Legacy routes for backward compatibility
router.route("/getuser").get(authMiddleware, getUserDetails);
router.route("/edituser").post(authMiddleware, editUserdetails);

export default router;
