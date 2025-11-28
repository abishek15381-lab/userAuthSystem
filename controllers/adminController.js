import User from '../models/User.js';

export const getAllUsers = async (req,res) =>{

   try {
     const users = await User.find().select("-password");
     res.json (users);
    
   } catch (error) {
     res.status (500).json({error:error.message});
   }
   
}   

//delete user
export const deleteUser = async (req,res) =>{

    try {
       const userId = req.params.id ;

    await User.findByIdAndDelete(userId) ;
    res.json({message:"user deleted successfully"});

    } catch (error) {
        res.status(500).json({error : error.message}); 
    }
    
}

//promote user to Admin
export const makeAdmin = async(req,res ) => {
try {

    const userId = req.params.id ;

    await User.findByIdAndUpdate(userId , {role : "Admin"});

    res.json({message:"user promoted to admin"});
    
} catch (error) {
    res.status(500).json({error: error.message});
}
}