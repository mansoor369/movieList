import jwt from "jsonwebtoken"
import { prisma } from "./db.js"


export const authMiddleware = async (req, res, next) => {
    console.log("auth Middlewware Reached");
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1] // ["Bearer", "Token"]
    }

    else if (req?.cookie?.JWT_COOKIE) {
        token = req?.cookies?.JWT_COOKIE;
    }

    if (!token) {
        return res.status(401).json({ message: "not Authorized and no token provided" });
    }

    try {
        // Verify token and extract the userId
        const decoded = jwt?.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        })
        if (!user) {
            return res.status(401).json({ message: "User no longer Exists" });
        }

        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Not Authorized" });

    }
}