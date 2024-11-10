"use server"

import { loginSchema } from "@/Schema/loginSchema"
import bcrypt from "bcryptjs";
import { getUserByUsername } from "@/utils/user";
import {LoginFormValues} from "@/utils/formValue";


export const login = async (formData: LoginFormValues) => {
    const validatedFields = await loginSchema.safeParseAsync(formData);

    if (!validatedFields.success) {
        return {error: "Invalid fields"};
    }

    const {username, password} = formData;

    const existingUser = await getUserByUsername(username);

    if (!existingUser){
        return  {error: "No account exists with this username"};
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch){
        return {error: "Invalid password"};
    }

    console.log("User logged in");
    return {success: "User logged in successfully"};


}