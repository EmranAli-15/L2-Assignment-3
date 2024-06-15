import { z } from "zod";

const createUserValidation = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().optional(),
        phone: z.string(),
        role: z.enum(['admin', 'user']),
        address: z.string()
    })
});


export const userValidations = {
    createUserValidation
};