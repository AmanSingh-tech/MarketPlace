import * as z from 'zod'


export const registerSchema = z.object({
    name: z.string().min(2,{
        message: "First name is required"
    }),
    username: z.string().min(4,{
        message: "Last name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message:"Password should be atleast of 6 characters"
    })
})