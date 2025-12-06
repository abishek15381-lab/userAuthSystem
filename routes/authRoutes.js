import express from "express";
import { signup , login , getProfile , forgotPassword , resetPassword } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import { loginvalidation, signupvalidation ,forgotPasswordValidation , resetPasswordValidation } from "../validation/authValidation.js";
import validate from "../middlewares/validation.js";
const router = express.Router();

router.post("/signup", validate(signupvalidation), signup);
router.post("/login", validate(loginvalidation), login);
router.post("/forgotpassword",validate(forgotPasswordValidation), forgotPassword);
router.post("/reset-password/:token",validate(resetPasswordValidation), resetPassword);

//PROTECTED
router.get("/profile", authMiddleware, getProfile);

export default router;
