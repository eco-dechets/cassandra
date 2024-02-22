"use server"
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const createMaterialCategory = async (name: string) => {
    try {
        await prisma.materialCategory.create({
            data: {
                name
            }
        })
        revalidatePath("/material-category")

        return {
            success: "Type de materiel créé avec succès"
        }
    } catch (e: any) {

        console.log(e)

        if (e.code === "P2002") {
            return {
                error: "Le type de materiel existe déjà"
            }
        }

        return {
            error: e?.message
        }
    }
}

export const getMaterialCategory = async () => {
    return prisma.materialCategory.findMany({
        orderBy: {
            name: "desc"
        }
    });
}

export const updateMaterialCategory = async (id: string, name: string) => {
    console.log("Updating brand ", id, name)
    try {
       await prisma.materialCategory.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        revalidatePath("/material-category")
        console.log("Brand updated successfully")
    } catch (e) {
        console.log(e)

    }
}

export const deleteMaterialCategory = async (id: string) => {
    try {
        await prisma.materialCategory.delete({
            where: {
                id
            }
        })
        revalidatePath("/material-category")
    } catch (e) {
        console.log(e)
    }
}