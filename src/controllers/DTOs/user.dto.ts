import z from "zod";

export const getUserByIdDTO = z.object({
    _id: z.string().nonoptional(),
});

export const getUserByEmailDTO = z.object({
    email: z.email().nonoptional(),
});

export const getUserByUsernameDTO = z.object({
    username: z.string().nonoptional(),
});

export const updateUserDTO = z.object({
    _id: z.string().nonoptional(),
    data: z.object({
        email: z.email().nonoptional(),
        username: z.string().nonoptional(),
    })
});

export const updatePasswordDTO = z.object({
    _id: z.string().nonoptional(),
    password: z.string().nonoptional(),
    newPassword: z.string().nonoptional(),
    confirmNewPassword: z.string().nonoptional(),
})

export const deleteUserDTO = z.object({
    _id: z.string().nonoptional(),
})