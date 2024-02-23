"use server"
import prisma from "@/lib/prisma";

export const getUsers = async () => {
    try {
        return await prisma?.user.findMany()
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma?.user.findUnique({
            where: {
                email
            }
        })
    } catch (e) {
        return null
    }
}

export const getUserById = async (id: string) => {
    try {
        return await prisma?.user.findUnique({
            where: {
                id
            }
        })
    } catch (e) {
        return null
    }
}

export const updateUser = async (id: string, data: any) => {
    try {
        return await prisma?.user.update({
            where: {
                id
            },
            data
        })
    } catch (e) {
        return null
    }
}

export const deleteUser = async (id: string) => {
    try {
        return await prisma?.user.delete({
            where: {
                id
            }
        })
    } catch (e) {
        return null
    }
}
