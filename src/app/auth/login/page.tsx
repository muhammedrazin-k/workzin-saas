'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)

        const res = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        })

        if (res?.error) {
            setError("Invalid email or password")
            setLoading(false)
            return
        }
        setLoading(false)
        router.push('/dashboard')
    }

    const handleGoogleSignIn = async () => {
        setLoading(true)
        setError("")

        const res = await signIn('google', { redirect: false, callbackUrl: '/dashboard' })
        if (res?.error) {
            setError('Google login failed. Please try again.')
            setLoading(false);
            return
        }
        setLoading(false)
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-[#db1a44] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Full Screen Wavy Background Decorations */}
            <div className="absolute bottom-0 left-0 w-full leading-[0] z-0">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-64 md:h-96">
                    <path d="M-10.44,45.88 C181.43,158.38 316.31,-44.89 514.95,45.88 L500.00,150.00 L0.00,150.00 Z" className="fill-[#1a1a1a] opacity-30"></path>
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full leading-[0] z-0">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-48 md:h-72">
                    <path d="M-5.36,81.40 C149.83,163.31 349.20,20.22 516.64,88.31 L500.00,150.00 L0.00,150.00 Z" className="fill-[#1a1a1a]"></path>
                </svg>
            </div>

            {/* Main Form Card */}
            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-8 md:p-12 relative z-10 transition-transform duration-500 hover:scale-[1.01]">
                <div className="text-center mb-8">
                    <h1 className="text-[#db1a44] text-3xl font-extrabold mb-2 tracking-tight">Welcome Back</h1>
                    <div className="w-12 h-1 bg-[#db1a44] mx-auto rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            required
                            className="w-full bg-[#f1f3f5] border-none rounded-full px-6 py-4 text-sm font-semibold focus:ring-2 focus:ring-[#db1a44]/50 outline-none transition-all placeholder:text-gray-400 text-black"
                        />
                    </div>
                    <div className="space-y-1 relative group/pass">
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
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

                    {error && (
                        <p className="text-[#db1a44] text-xs font-black text-center uppercase tracking-widest">{error}</p>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-[#db1a44] hover:bg-[#b01536] text-white font-black py-4 rounded-full shadow-lg shadow-[#db1a44]/20 transition-all active:scale-[0.98] disabled:opacity-50 text-sm tracking-[0.2em] uppercase mt-2"
                    >
                        {loading ? 'Entering...' : 'Log In'}
                    </button>

                    <div className="text-right">
                        <Link href="/auth/forgot-password" className="text-[10px] items-center text-gray-400 font-black uppercase tracking-[0.2em] hover:text-[#db1a44]">
                            Forgot Password?
                        </Link>
                    </div>
                </form>

                <div className="mt-8 text-center flex flex-col items-center gap-6">
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-[10px] items-center text-gray-400 font-black uppercase tracking-[0.2em]">Or Sign In With</span>
                        </div>
                    </div>

                    {/* Dynamic Google Button: Logo only -> Text on Hover */}
                    <div className="group flex justify-center">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="flex items-center gap-0 w-12 group-hover:w-56 group-hover:gap-3 px-3 h-12 bg-white border border-gray-100 rounded-full shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden"
                        >
                            <div className="min-w-[24px]">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="#db1a44" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#1a1a1a" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#db1a44" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="#1a1a1a" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                Sign in with Google
                            </span>
                        </button>
                    </div>

                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        New to Workzin?{' '}
                        <Link href="/auth/register" className="text-[#db1a44] hover:underline hover:text-[#b01536]">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>

            {/* Top Logo Badge */}
            <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-xl">
                    <span className="text-[#db1a44] font-black text-xs">WZ</span>
                </div>
                <span className="text-white font-black uppercase tracking-[0.3em] text-xs">Workzin</span>
            </div>
        </div>
    )
}
