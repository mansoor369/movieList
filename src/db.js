import "dotenv/config";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
    log: 
    process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] 
     : ["error"]
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database Connected via prisma")
    } catch (error) {
        console.log(`Database Connection error : ${error.message}`)
        process.exit(1);
    }
}

const disconnectDB = async () => {
 await prisma.$disconnect();
}

export {connectDB,prisma};
