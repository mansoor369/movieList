import { prisma } from "../db.js";



const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;


    const movieExists = await prisma.movie.findUnique({
        where: { id: movieId }
    })

    if (!movieExists) {
        return res.status(404).json({ message: "This Movie Does not Exist in the Database" });
    }

    //check if movie is already added
    const existingWatchList = await prisma.watchListitem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId,
            }
        }
    })

    if (existingWatchList) {
        return res.status(400).json({ message: "Movie Already in the Watchlist" });
    }

    const watchlistItem = await prisma.watchListitem.create({
        data: {
            userId:req.user.id,
            movieId,
            status: status || "PLAMNNING",
            rating,
            notes
        },
    })
    return res.status(201).json({
        message: "Movie Added Successfully",
        status: "success",
        data: {
            watchlistItem
        }

    });

}



export { addToWatchList };