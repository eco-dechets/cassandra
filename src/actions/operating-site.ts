"use server"
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const createOperatingSite = async (name: string) => {
    try {
        await prisma.operatingSite.create({
            data: {
                name
            }
        })
        revalidatePath("/operating-site")

        return {
            success: "Site d'exploitation créé avec succès"
        }
    } catch (e: any) {

        console.log(e)

        if (e.code === "P2002") {
            return {
                error: "Le site d'exploitation existe déjà"
            }
        }

        return {
            error: e?.message
        }
    }
}

export const getOperatingSite = async () => {
    return prisma.operatingSite.findMany({
        orderBy: {
            name: "desc"
        }
    });
}

export const updateOperatingSite = async (id: string, name: string) => {
    console.log("Updating brand ", id, name)
    try {
       await prisma.operatingSite.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        revalidatePath("/operating-site")
    } catch (e) {
        console.log(e)

    }
}

export const deleteOperatingSite = async (id: string) => {
    try {
        await prisma.operatingSite.delete({
            where: {
                id
            }
        })
        revalidatePath("/operating-site")
    } catch (e) {
        console.log(e)
    }
}