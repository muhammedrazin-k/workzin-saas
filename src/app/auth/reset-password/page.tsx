'use client';

import { resetPasswordSchema } from "@/src/lib/validators/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ResetPasswordPage() {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const parms = useSearchParams()
    const token = parms.get('token')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const validators = resetPasswordSchema.safeParse({ password: formData.get('password') })
        if (!validators.success) {
            setMessage(validators.error?.issues[0]?.message)
            setLoading(false)
            return
        }

        const res = await fetch('/api/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, password: validators.data.password })
        })

        if (res.ok) {
            toast.success('Password Reset Successfully')
            router.push('/auth/login')
            setLoading(false)
        } else {
            const data = await res.json()
            toast.warning('Failed to reset password ' + data.error + ' try again')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Split Wavy Background */}
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
                    <h1 className="text-[#1a1a1a] text-3xl font-extrabold mb-3 tracking-tight">New Password</h1>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest px-4">Set a secure password to regain access</p>
                    <div className="w-12 h-1 bg-[#db1a44] mx-auto rounded-full mt-6"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1 relative group/pass">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            required
                            className="w-full bg-[#f1f3f5] border-none rounded-full px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-[#db1a44]/50 outline-none transition-all placeholder:text-gray-400 text-black pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#db1a44] transition-colors"
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {message && (
                        <p className="text-[#db1a44] text-[10px] font-black text-center uppercase tracking-widest leading-relaxed">{message}</p>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-[#1a1a1a] hover:bg-black text-white font-black py-4 rounded-full shadow-lg shadow-black/20 transition-all active:scale-[0.98] disabled:opacity-50 text-sm tracking-[0.2em] uppercase mt-2"
                    >
                        {loading ? 'Updating...' : 'Reset Password'}
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
