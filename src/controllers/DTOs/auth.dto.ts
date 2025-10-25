import z from "zod";

export const signInDTO = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
})

export const signUpDTO = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
});

export const validateTokenDTO = z.object({
    token: z.string().min(1),
});