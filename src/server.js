import express from "express"
import { config } from "dotenv";
import movieRoutes from "./routes/movieRoutes.js"
import { connectDB,prisma } from "./db.js";



config();
connectDB();
const app = expre4ss()
const PORT = process.env.PORT
app.use("/movie", movieRoutes);


const server = app.listen(PORT, () => {
    console.log(`server Running on port ${PORT}`);
}) 
 