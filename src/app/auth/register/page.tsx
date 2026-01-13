"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterPage() {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError("")


        const formData = new FormData(e.currentTarget)
        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            }),
        });
        if (!res.ok) {
            const data = await res.json()
            setError(data.error)
            setLoading(false)
            return;
        }

        router.push("/auth/login")

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold">Create account</h1>

                <input
                    name="name"
                    placeholder="Name"
                    required
                    className="w-full border p-2 rounded"
                />
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
                <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{loading ? 'creating...' : 'Sign up'}</button>

                <p className="text-center cursor-pointer">already have an account? <Link href="/auth/login">Login</Link></p>

            </form>

        </div>
    )
}