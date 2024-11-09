"use server"

import { registerSchema } from "@/Schema/registerSchema"
import bcrypt from "bcryptjs";
import { db } from "@/utils/db";
import { getUserByEmail } from "@/utils/user";
import FormValues from "@/utils/formValue";


export const register = async (formData: FormValues) => {
    const validatedFields = await registerSchema.safeParseAsync(formData);

    if (!validatedFields.success) {
        return {error: "Invalid fields"};
    }

    const {name, email, username,  password} = formData;

    const existingUser = await getUserByEmail(email);

    if (existingUser){
        return  {error: "An account already exists with this Email"};
    }

    try {
        const newUser = await db.user.create({
            data: {
                name: name,
                email: email,
                username: username,
                password: await bcrypt.hash(password, 10),
                createdAt: new Date(),
            }
        })
        console.log("User created");
        return {success: "User created successfully"};
    }
    catch (error) {
        return {error: "Error creating account"};
    }
}   