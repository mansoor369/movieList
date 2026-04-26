import express from "express";
import { Login, register,Logout } from "../controllers/authController.js";

const router  = express.Router();


/** 
  * Route to Register a new User in the Database */
router.post("/register",register);
router.post("/login",Login)
router.post("/Logout",Logout)

export default router;
