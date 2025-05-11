import express from "express";
import { loginUser, registerUser, verifyEmail } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyEmail);
export default router;
