import express from "express";
import { register } from "../controllers/authController.js";

const router  = express.Router();


/** 
  * Route to Register a new User in the Database */
router.post("/register",register);

export default router;
