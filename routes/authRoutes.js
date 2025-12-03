import express from "express";
import { signup , login , getProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import { loginvalidation, signupvalidation } from "../validation/authValidation.js";
import validate from "../middlewares/validation.js";
const router = express.Router();

router.post("/signup", validate(signupvalidation), signup);
router.post("/login", validate(loginvalidation), login);

//PROTECTED
router.get("/profile", authMiddleware, getProfile);

export default router;
