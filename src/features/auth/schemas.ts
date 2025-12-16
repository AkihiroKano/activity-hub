import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
})

export const registerSchema = z.object({
    email: z.string().email('Некорректный email'),
    username: z.string().min(3, 'Имя пользователя должно быть не менее 3 символов'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
})
