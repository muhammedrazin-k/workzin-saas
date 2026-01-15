import { connectDB } from "@/src/lib/db"
import { sendMail } from "@/src/lib/mailer"
import { emailSchema } from "@/src/lib/validators/auth"
import { User } from "@/src/models/User"
import crypto from "crypto"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { email } = await req.json()

    const validators = emailSchema.safeParse({ email })

    if (!validators.success) {
        return NextResponse.json({ error: validators.error?.issues[0]?.message }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
        return NextResponse.json({ error: "user not found..!" }, { status: 404 })
    }

    if (!user.password) {
        return NextResponse.json({ error: "your logined with google? so you can't reset password..!" }, { status: 404 })
    }

    const token = await crypto.randomBytes(32).toString('hex')

    user.resetPasswordToken = token
    user.resetPasswordTokenExpiry = new Date(Date.now() + 1000 * 60 * 15); //15 minutes
    await user.save()

    const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}`

    await sendMail({
        to: user.email,
        subject: user.email,
        html: `
    <p>You requested a password reset.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
    <p>This link expires in 15 minutes.</p>
  `,
    })
    return NextResponse.json({ success: true })
}