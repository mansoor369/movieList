import express from "express"
const app = express()
const PORT = 3001;
import movieRoutes from "./routes/movieRoutes.js"

app.use("/movie", movieRoutes);


const server = app.listen(PORT, () => {
    console.log(`server Running on port ${PORT}`);
}) 
