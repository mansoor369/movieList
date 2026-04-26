import express from "express"
import { config } from "dotenv";
import movieRoutes from "./routes/movieRoutes.js"
import { connectDB, prisma } from "./db.js";
import authRoutes from "./routes/authRoutes.js"
import addtoWatchlist from "./routes/addtoWatchList.js"

config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true})); // will be used if we sent data from frontend
app.use("/movie", movieRoutes);
app.use("/auth", authRoutes)
app.use("/addtolist",addtoWatchlist)


const server = app.listen(PORT, () => {
    console.log(`server Running on port ${PORT}`);
})
