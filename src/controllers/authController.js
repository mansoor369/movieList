import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
/** 
*The Api function to Register the User in the Database */
const register = async (req, res) => {
    const { email, password, name } = req.body;

    const userExists = await prisma.user.findUnique({
        where: { email: email }
    })

    if (userExists) {
        return res.status(400).json({ message: "The user is already Registered" });
    }


    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);




    // Create User
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }

    });
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            }
        },
        token: token
    })


}

const Login = async (req, res) => {

    const { email, password } = req.body;


    const registeredUser = await prisma.user.findUnique({
        where: { email: email }
    })


    if (!registeredUser) {
        return res.status(401).json({ error: "Invalid Email or Password" });
    }

    const isPasswordValid = await bcrypt.compare(password, registeredUser.password)

    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Email or Password" });
    }

    const token = generateToken(registeredUser.id, res);

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: registeredUser.id,
                email: registeredUser.email
            },
            token: token
        }
    })




}


const Logout = async (req, res) => {
    res.cookie("JWT_COOKIER", "", {
        expires: new Date(0),
        httpOnly: true
    })
    return res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    });
};

export { register, Login,Logout };