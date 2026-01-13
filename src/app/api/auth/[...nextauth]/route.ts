import { connectDB } from "@/src/lib/db";
import { User } from "@/src/models/User";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null


                await connectDB()

                const user = await User.findOne({ email: credentials.email })
                if (!user) return null

                const ispasswordvalid = await bcrypt.compare(credentials.password, user.password)
                if (!ispasswordvalid) return null

                return {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }

            }
        })
    ], session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET
}

const handler=NextAuth(authOptions)
export {handler as GET,handler as POST}