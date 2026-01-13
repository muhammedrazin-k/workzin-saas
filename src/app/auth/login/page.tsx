'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage(){
    const [loading,setLoading]=useState(false)
    const router=useRouter()
    const [error,setError]=useState('')


    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData=new FormData(e.currentTarget)

        const res=await signIn('credentials',{
            email:formData.get('email'),
            password:formData.get('password'),
            redirect:false
        })

        console.log(res)
        if(res?.error){
            setError("invalid email or password")
            setLoading(false)
            return
        }
        setLoading(false)
        router.push('/dashboard')
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
             <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button disabled={loading} className="w-full bg-black text-white p-2 rounded">
          {loading?'Logging in...':'Login'}
        </button>
        <p className="text-center cursor-pointer">don't have an account? <Link href="/auth/register" className="text-blue-500">Register</Link></p>

      </form>
        </div>
    )
}