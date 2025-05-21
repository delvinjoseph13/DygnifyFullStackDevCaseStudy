import express from "express";
import { generateHazard, getHazardData } from "../controllers/hazardController.js";
const router=express.Router();

router.post('/generate-hazards',generateHazard);
router.post('/hazards',getHazardData)

export default router;