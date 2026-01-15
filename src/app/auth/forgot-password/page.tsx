'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const res = await fetch('/api/forgot-password', {
            method: "POST",
            body: JSON.stringify({ email: formData.get('email') })
        })

        if (!res.ok) {
            const data = await res.json()
            toast.warning(data.error)
            setLoading(false)
            return
        }

        setMessage("If an account exists, a reset link was sent to your email.");
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Split Wavy Background - Using the brand red here for the 'reversed' look */}
            <div className="absolute top-0 right-0 w-full leading-[0] z-0 rotate-180">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-64 md:h-96">
                    <path d="M-10.44,45.88 C181.43,158.38 316.31,-44.89 514.95,45.88 L500.00,150.00 L0.00,150.00 Z" className="fill-[#db1a44] opacity-20"></path>
                </svg>
            </div>
            <div className="absolute top-0 right-0 w-full leading-[0] z-0 rotate-180">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-48 md:h-72">
                    <path d="M-5.36,81.40 C149.83,163.31 349.20,20.22 516.64,88.31 L500.00,150.00 L0.00,150.00 Z" className="fill-[#db1a44] opacity-40"></path>
                </svg>
            </div>

            {/* Main Form Card */}
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 md:p-12 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-[#1a1a1a] text-3xl font-extrabold mb-3 tracking-tight">Recovery</h1>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest px-4">Enter your email and we'll send you a reset link</p>
                    <div className="w-12 h-1 bg-[#db1a44] mx-auto rounded-full mt-6"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            required
                            className="w-full bg-[#f1f3f5] border-none rounded-full px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-[#db1a44]/50 outline-none transition-all placeholder:text-gray-400 text-black"
                        />
                    </div>

                    {message && (
                        <div className="bg-green-50 border-2 border-green-500/20 text-green-600 text-[10px] font-black p-4 rounded-2xl text-center uppercase tracking-widest leading-relaxed">
                            {message}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-[#1a1a1a] hover:bg-black text-white font-black py-4 rounded-full shadow-lg shadow-black/20 transition-all active:scale-[0.98] disabled:opacity-50 text-sm tracking-[0.2em] uppercase mt-2"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <div className="text-center mt-8">
                        <Link href="/auth/login" className="text-[10px] items-center text-gray-400 font-black uppercase tracking-[0.2em] hover:text-[#db1a44] flex justify-center gap-2 group transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 group-hover:-translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            Back to Log In
                        </Link>
                    </div>
                </form>
            </div>

            {/* Top Logo Badge */}
            <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#db1a44] flex items-center justify-center rounded-full shadow-xl">
                    <span className="text-white font-black text-xs">WZ</span>
                </div>
                <span className="text-[#db1a44] font-black uppercase tracking-[0.3em] text-xs">Workzin</span>
            </div>
        </div>
    )
}
