import  mongoose from "mongoose";
import crypto from "crypto";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user", "Admin"],
        default:"user"
    }
    ,
   resetPasswordToken:String,
   resetPasswordExpire:Date,
},
   {timestamps : true}
);

userSchema.methods.getResetPasswordToken = function(){

    // generate token
   // const resetToken = crypto.randomBytes(32).toString("hex");
   const resetToken = crypto.randomBytes(32).toString("hex");


    // hash reset token in db for later use 
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    //set expiry 
    this.resetPasswordExpire = Date.now() + 15* 60 * 1000;
    
    return resetToken ;
    
}

export default mongoose.model("User" , userSchema);