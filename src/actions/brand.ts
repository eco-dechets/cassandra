"use server"
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const createBrand = async (name: string) => {
    try {
        await prisma.brand.create({
            data: {
                name
            }
        })
        revalidatePath("/brand")

        return {
            success: "Brand created successfully"
        }
    } catch (e: any) {

        console.log(e)

        if (e.code === "P2002") {
            return {
                error: "La marque existe déjà"
            }
        }

        return {
            error: e?.message
        }
    }
}

export const getBrands = async () => {
    return prisma.brand.findMany({
        orderBy: {
            name: "desc"
        }
    });
}

export const getBrandById = async (id: string) => {
    return prisma.brand.findUnique({
        where: {
            id
        }
    })
}

export const updateBrand = async (id: string, name: string) => {
    console.log("Updating brand ", id, name)
    try {
       await prisma.brand.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        revalidatePath("/brand")
        console.log("Brand updated successfully")
    } catch (e) {
        console.log(e)

    }
}

export const deleteBrand = async (id: string) => {
    try {
        await prisma.brand.delete({
            where: {
                id
            }
        })
        revalidatePath("/brand")
    } catch (e) {
        console.log(e)
    }
}