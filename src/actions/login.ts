"use server"
import * as z from "zod";
import {LoginSchema} from "../schemas";
import {signIn} from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {AuthError} from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const payload = LoginSchema.safeParse(values)

    if (!payload.success) {
        return {
            error: "Invalid fields",
        }
    }

    const {email, password} = payload.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credential. Please log in again.",
                    }
                default:
                    return {
                        error: "An error occurred",
                    }
            }
        }
        throw error
    }
}