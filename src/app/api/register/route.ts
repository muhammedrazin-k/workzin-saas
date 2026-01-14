import { connectDB } from "@/src/lib/db"
import { registerSchema } from "@/src/lib/validators/auth"
import { User } from "@/src/models/User"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"



export async function POST(req: Request) {
    const body = await req.json()

    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error?.issues[0]?.message }, { status: 400 })
    }

    const { name, email, password } = parsed.data

    if (!email || !password) {
        return NextResponse.json({ error: 'invalid data' }, { status: 400 })
    }

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return NextResponse.json({ error: 'user already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        email,
        password: hashedPassword,
    })
    await user.save()

    return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 })
}