import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleWare from "../middlewares/adminMiddleware.js"
import {getAllUsers, deleteUser, makeAdmin} from "../controllers/adminController.js"
const router = express.Router();

router.get("/users", authMiddleware , adminMiddleWare,  getAllUsers);
router.delete("/users/:id", authMiddleware , adminMiddleWare, deleteUser);
router.put("/makeAdmin/:id",authMiddleware, adminMiddleWare,  makeAdmin);

export default router;
