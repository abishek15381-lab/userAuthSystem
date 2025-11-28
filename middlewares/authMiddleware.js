// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res ,next) => {
//     try {
//         const token = req.header("Authorization")?.replace("Bearer", "");
//         if (!token){
//             return res.status(401).json({message:"no token provided"});
//         }

//         //verify the token 
//         const decoded = jwt.verify(token, process.env.SECRECTKEY);
        
//         //attach user info to the request
//         req.user =decoded;
//         console.log(req.user);

//         next();

//     } catch (error) {
//         res.status(401).json({message:"invalid token or expired token"});
//     }
// };

// export default authMiddleware ;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  
    // get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRECTKEY);

    // attach user info to request
    req.user = decoded;

    next();
  
   // res.status(401).json({ message: "Invalid or expired token" });
  
};

export default authMiddleware;
