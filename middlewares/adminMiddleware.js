 const authMiddleware = (req,res,next) => {
    const role = req.user.role ;

    if(role !== "Admin"){
        res.status(401).json({message:"Acess denied ,Admin only"})
    }
    next();
}

export default authMiddleware ;