import express from "express";
import {
  addNewCertification,
  deleteCertification,
  getAllCertifications,
  updateCertification,
} from "../controller/certificationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewCertification);
router.delete("/delete/:id", isAuthenticated, deleteCertification);
router.put("/update/:id", isAuthenticated, updateCertification);
router.get("/getall", getAllCertifications);

export default router;