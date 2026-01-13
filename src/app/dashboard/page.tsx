import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function DashboardPage(){

    const session=await getServerSession(authOptions)
    if(!session){
        redirect('/auth/login')
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-2xl font-bold text-red-800 ">{session.user?.name}</h1>
        </div>
    )
}   