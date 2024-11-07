import express from "express";
import { addCategory } from "../controllers/categroy.controllers.js";
const router = express.Router();
router.post("/newcategory", addCategory);

export default router;