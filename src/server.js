import express from "express"
import { config } from "dotenv";
import movieRoutes from "./routes/movieRoutes.js"
import { connectDB,prisma } from "./db.js";
import authRoutes from "./routes/authRoutes.js"


config();
connectDB();


const app = express()
const PORT = process.env.PORT
app.use("/movie", movieRoutes);
app.use("/auth",authRoutes)


const server = app.listen(PORT, () => {
    console.log(`server Running on port ${PORT}`);
}) 
 