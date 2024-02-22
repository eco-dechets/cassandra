import prisma from "@/lib/prisma";

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