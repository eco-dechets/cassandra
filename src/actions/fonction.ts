"use server"
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const createFonction = async (name: string) => {
    try {
        await prisma.fonction.create({
            data: {
                name
            }
        })
        revalidatePath("/fonction")

        return {
            success: "Fonction created successfully"
        }
    } catch (e: any) {

        console.log(e)

        if (e.code === "P2002") {
            return {
                error: "La fonction existe déjà"
            }
        }

        return {
            error: e?.message
        }
    }
}

export const getFonctions = async () => {
    return prisma.fonction.findMany({
        orderBy: {
            name: "desc"
        }
    });
}

export const getFonctionById = async (id: string) => {
    return prisma.fonction.findUnique({
        where: {
            id
        }
    })
}

export const updateFonction = async (id: string, name: string) => {
    console.log("Updating fonction ", id, name)
    try {
       await prisma.fonction.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        revalidatePath("/fonction")
    } catch (e) {
        console.log(e)
    }
}

export const deleteFonction = async (id: string) => {
    try {
        await prisma.fonction.delete({
            where: {
                id
            }
        })
        revalidatePath("/fonction")
    } catch (e) {
        console.log(e)
    }
}