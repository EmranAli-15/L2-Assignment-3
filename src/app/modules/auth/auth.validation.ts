import { z } from "zod";

const loginValidation = z.object({
    body: z.object({
        id: z.string({ required_error: 'ID is required' }),
        password: z.string({ required_error: 'PASSWORD is required' })
    })
});


export const authValidations = {
    loginValidation
}