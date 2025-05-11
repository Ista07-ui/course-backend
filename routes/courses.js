import express from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", authenticateToken, createCourse);
router.put("/:id", authenticateToken, updateCourse);
router.delete("/:id", authenticateToken, deleteCourse);

export default router;
