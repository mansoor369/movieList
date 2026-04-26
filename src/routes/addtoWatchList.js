import express from "express"
import { addToWatchList } from "../controllers/addtoWatchListController.js";
import { authMiddleware } from "../middleware.js";



const router = express.Router();

router.use(authMiddleware)

router.post("/",addToWatchList);

export default router;