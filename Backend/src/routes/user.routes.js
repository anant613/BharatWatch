import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  editUserdetails,
  getUserDetails,
  getProfile,
  updateProfilePhoto,
  deleteProfilePhoto,
} from "../controllers/user.controller.js";
import { testRegister } from "../controllers/test.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middlewares/validation.middleware.js";
import { authLimiter } from "../middlewares/security.middleware.js";

const router = Router();

// ---------- Auth routes ----------
router
  .route("/register")
  .post(authLimiter, validateUserRegistration, registerUser);

router.route("/test-register").post(testRegister);

router.route("/minimal-register").post(async (req, res) => {
  try {
    console.log("Minimal register called");
    res.json({
      success: true,
      message: "Minimal endpoint works",
      data: req.body,
    });
  } catch (error) {
    console.error("Minimal register error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.route("/login").post(authLimiter, validateUserLogin, loginUser);
router.route("/logout").post(authMiddleware, logoutUser);

// ---------- User management ----------
router.route("/profile").get(authMiddleware, getUserDetails);
router.route("/profile").patch(authMiddleware, editUserdetails);


//Profile photo updates 
router.route("/profile/photo").get(authMiddleware,getProfile);
router.route("/profile/photo").put(authMiddleware,updateProfilePhoto);
router.route("/profile/photo").delete(authMiddleware,deleteProfilePhoto)

// Legacy routes for backward compatibility
router.route("/getuser").get(authMiddleware, getUserDetails);
router.route("/edituser").post(authMiddleware, editUserdetails);

export default router;
