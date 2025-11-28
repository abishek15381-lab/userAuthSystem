import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req,res) => {
    try {
        const {name , email , password} = req.body;
        
        const exists = await User.findOne({email});
        if (exists){
            return res.status(400).json({message:"email already exists"});
        }

        const hashedPassword =await bcrypt.hash(password,10);

        const user =await User.create({
            name,
            email,
            password:hashedPassword,
        })

          res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            });


    } catch (error) {
        return res.status(500).json({error:error.message});
    }
    
}

export const login = async(req , res) => {

    try {
        const {email, password } = req.body;

        //checks user?
        const user = await User.findOne({email});
            if(!user){
            res.status(400).json({message:"enter valid crentials"});
            }

        //checks password matches
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
            res.status(400).json({message:"enter valid crentials"});
        }
        
        //generate token
        const token =await jwt.sign({id: user.id , role:user.role} , process.env.SECRECTKEY , {expiresIn:"7d"});

        res.json({
            message:"login sucessful",
            token
        
            });

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//-------Profile

export const getProfile = async (req,res) => {
   
   try {
    const user = User.findById(req.user.id).select("-password");
    res.json(user);
   } catch (error) {
    res.status(500).json({error:error.message})
   }
}