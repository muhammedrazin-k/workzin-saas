import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email('invalid email').toLowerCase().trim(),
    password: z.string().min(6, 'password must be at least 6 characters long')
})

export const registerSchema = z.object({
    name: z.string().min(3, 'name must be at least 3 characters long'),
    email: z.string().email('invalid email').toLowerCase().trim(),
    password: z.string().min(6, 'password must be at least 6 characters long')
})