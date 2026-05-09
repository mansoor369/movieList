import express from "express"
import { addToWatchList, deleteFromWatchlist, GetWatchlistItem } from "../controllers/addtoWatchListController.js";
import { authMiddleware } from "../middleware.js";



const router = express.Router();

router.use(authMiddleware)
router.get("/",GetWatchlistItem);

router.post("/",addToWatchList);
router.delete("/:id",deleteFromWatchlist)

export default router;