import { connectDB } from "@/src/lib/db"
import { resetPasswordSchema } from "@/src/lib/validators/auth"
import { User } from "@/src/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const {token,password}=await req.json()

    if(!password || !token){
        return NextResponse.json({error:"invalid Request"},{status:400})
    }

    const validators=resetPasswordSchema.safeParse({password})

    if(!validators.success){
        return NextResponse.json({error:validators.error?.issues[0]?.message},{status:400})
    }
    await connectDB()

    const user=await User.findOne({
        resetPasswordToken:token,
        resetPasswordTokenExpiry:{$gt:new Date()}
    })
    
    if(!user){
        return NextResponse.json({error:"invalid or Expired Token"},{status:400})
    }

    user.password=await bcrypt.hash(password,10)
    user.resetPasswordToken=undefined
    user.resetPasswordTokenExpiry=undefined
    await user.save()

    return NextResponse.json({messsage:'Password Reset Successfully'},{status:200})


}