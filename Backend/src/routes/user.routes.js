import {
  registerUser,
  loginUser,
  logoutUser,
  editUserdetails,
  getUserDetails,
} from "../controllers/user.controllers.js";
import { Router } from "express"
import {authMiddleware} from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authMiddleware,logoutUser);
router.route("/getuser").get(authMiddleware, getUserDetails);
router.route("/edituser").post(authMiddleware, editUserdetails);

export default router;

