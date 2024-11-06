import { registerUser, logIn } from "../controllers/user.controllers.js";
import express from "express";
import auth from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login",logIn);


export default router;