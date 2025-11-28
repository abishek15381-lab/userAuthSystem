import jwt from "jsonwebtoken";

const authMiddleware = async() => {
    try {
        const token = req.header("Authorization")?.replace("Bearer", "");
        if (!token){
            return res.status(401).json({message:"no token provided"});
        }

        //verify the token 
        const decoded = jwt.verify(token, process.env.SECRECTKEY);
        
        //attach user info to the request
        req.user =decoded;

        next();

    } catch (error) {
        res.status(401).json({message:"invalid token or expired token"});
    }
};

export default authMiddleware ;