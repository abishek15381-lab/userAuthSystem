import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { error } from "console";
import jwt from "jsonwebtoken"
import crypto from "crypto";

export const signup = async (req,res,next) => {
    try {
        const {name , email , password} = req.body;
        
        const exists = await User.findOne({email});
        if (exists){
            return next(new Error("user already exists"));
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
            return res.status(400).json({message:"enter valid crentials"});
            }

        //checks password matches
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
           return res.status(400).json({message:"enter valid crentials"});
        }
        
        //generate token
        const token =jwt.sign(
                                { id: user._id, role: user.role },
                                process.env.SECRECTKEY,
                                { expiresIn: "7d" }   // or your value
                            )

        res.json({
            message:"login sucessful",
            token
        
            });

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//-------Profile

export const getProfile = async (req,res,next) => {
   
   try {
    const user = User.findById(req.user.id).select("-password");
    res.json(req.user);
   } catch (error) {
    res.status(500).json({error:error.message})
   }
}

export const forgotPassword = async (req,res ,next) => {

   try {
     const {email} = req.body;
     console.log(req.body);

    const user = await User.findOne({email});

    if (!user){
        return next(new Error("enter valid email address"));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const  resetUrl = `${req.protocol} :// ${req.get("host")}/api/auth/reset-password/${resetToken}`;

    

    // for now we just return it 
    res.json({
        message:"reset link generated",
        resetUrl
    });
   } catch (error) {
    //res.status(error.status).json({error:error.message});
    next(error);
   }

}

export const resetPassword = async (req,res , next) => {
    try {
        const resetToken = req.params.token;

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    const user = await User.findOne({
        resetPasswordToken:hashedToken ,
        resetPasswordExpire: {$gt : Date.now()}, //not expired
    });

    if(!user){
        return next(new Error ("provide valid token or token expired"))
    }

   // user.password = req.body.password;
   
    user.password = await bcrypt.hash(req.body.password, 10);;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    
    res.json("password reset successfull");

    
    } catch (error) {
        next(error)
    }
    
}