"use server"
import * as z from "zod";
import {RegisterSchema} from "../schemas";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import {getUserByEmail} from "@/src/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const payload = RegisterSchema.safeParse(values)

    if (!payload.success) {
        return {
            error: true,
        }
    }

    const {name, email, password} = payload.data
    const hashedPassword = await bcrypt.hash(password, 10)

    // check if user exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {
            error: "Email already exists",
        }
    }

    await prisma?.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return {
        success: "User created successfully",
    }
}