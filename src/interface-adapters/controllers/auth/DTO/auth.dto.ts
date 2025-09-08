import z from "zod";

export const signInDTO = z.object({
    username: z.string().nonoptional(),
    password: z.string().min(6).nonoptional(),
});

export const signUpDTO = z.object({
    email: z.email().nonoptional(),
    username: z.string().min(3).nonoptional(),
    password: z.string().min(6).nonoptional(),
    confirmPassword: z.string().min(6).nonoptional(),
});

export const validateTokenDTO = z.object({
    token: z.string().nonoptional(),
});