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
            status: status || "PLANNED",
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

const deleteFromWatchlist = async (req,res) =>{

    const watchlistItem = await prisma.watchListitem.findUnique({
        where :{id : req.params.id}
    })

    if(!watchlistItem){
        return res.status(404).json({message:"Item not Found"});
    }
    if(watchlistItem.userId !== req.user.id){
        return res
                .status(403)
                .json({message:"Not Authorized to Delete this "})
    }


    await prisma.watchListitem.delete({
        where : {id:req.params.id},
    });

    res.status(200).json({message:"Item Deleted"});

}

const GetWatchlistItem = async (req, res) => {
  try {

    const watchlist = await prisma.watchListitem.findMany({
      where: {
        userId: req.params.id,
      },
    });

    if (!watchlist || watchlist.length === 0) {
      return res.status(404).json({ message: "No watchlist items found for this user." });
    }

    return res.status(200).json(watchlist);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export { addToWatchList,deleteFromWatchlist,GetWatchlistItem };