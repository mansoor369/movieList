import jwt from "jsonwebtoken"



const generateToken = (userId,res) =>{

    const payload = {id:userId};

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN || "7d"
    })


    res.cookie("JWT_COOKIE",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        maxAge:1000 * 60 * 60 * 24 * 7,
        sameSite:"strict"
    })

    return token;
}

export default generateToken;