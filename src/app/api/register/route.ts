import { connectDB } from "@/src/lib/db"
import { User } from "@/src/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const body=await req.json()
    const {name, email,password}=body

    if(!email || !password){
        return NextResponse.json({error:'invalid data'},{status:400})
    }

    await connectDB()
    
    const existingUser=await User.findOne({email})
    if(existingUser){
        return NextResponse.json({error:'user already exists'},{status:400})
    }

    const hashedPassword=await bcrypt.hash(password,10)
    const user=new User({
        name,
        email,
        password:hashedPassword,
    })
    await user.save()

    return NextResponse.json({success:true,message:'User registered successfully'},{status:201})
}