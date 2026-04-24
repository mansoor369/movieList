const express = require("express")

require("dotenv").config();

const app = express()
const PORT = process.env.PORT
const movieRoutes = require("./routes/movieRoutes.js");

app.use("/movie", movieRoutes);


const server = app.listen(PORT, () => {
    console.log(`server Running on port ${PORT}`);
}) 
