import express from "express";
import { DeleteMovie, getMovies, PostMovie, UpdateMovie } from "../controllers/movieController.js";

const router = express.Router();


router.get("/",getMovies)

router.post("/",PostMovie)

router.put("/",UpdateMovie)

router.delete("/",DeleteMovie)



export default router;