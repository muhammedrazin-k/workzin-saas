import mongoose, { models } from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:false},
    emailVerified:{type:Date},
    resetPasswordToken:{type:String},
    resetPasswordTokenExpiry:{type:Date}
},{timestamps:true})

export const User=models.User || mongoose.model("User",userSchema)