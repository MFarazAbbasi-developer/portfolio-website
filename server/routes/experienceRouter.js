import express from "express";
import {
  deleteExperience,
  getAllExperiences,
  postExperience,
  // updateExperience,
} from "../controller/experienceController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add",  postExperience);
router.delete("/delete/:id", isAuthenticated, deleteExperience);
router.get("/getall", getAllExperiences);

export default router;