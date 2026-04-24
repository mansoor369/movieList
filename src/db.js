const { prismaClient } = require("@prisma/client");


const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["errors"]
})

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database Connected via prisma")
    } catch (error) {
        console.log(`Database Connection error : ${error.message}`)
        process.exit(1);
    }
}

const disconnectDB = () => {
    await prisma.$connect();
}


module.export = { prisma, connectDB, disconnectDB };