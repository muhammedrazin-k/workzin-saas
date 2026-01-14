import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { connectDB } from "./db"
import { User } from "../models/User"
import bcrypt from "bcryptjs"
import { loginSchema } from "./validators/auth"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {


                const parsed = loginSchema.safeParse(credentials)
                if (!parsed.success) {
                    return null
                }
                const { email, password } = parsed.data

                if (!email || !password) return null


                await connectDB()

                const user = await User.findOne({ email: email })
                if (!user) return null

                const ispasswordvalid = await bcrypt.compare(password, user.password)
                if (!ispasswordvalid) return null

                return {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }

            }
        })
    ], session: { strategy: "jwt" },

    callbacks: {
        async signIn({ user, account }) {
            await connectDB();

            if (account?.provider === 'google') {
                const existingUser = await User.findOne({ email: user.email })

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        emailVerified: new Date()
                    })
                }
            }

            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}