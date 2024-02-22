"use server"
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const createVendor = async (name: string) => {
    try {
        await prisma.vendor.create({
            data: {
                name
            }
        })
        revalidatePath("/vendor")

        return {
            success: "Vendor created successfully"
        }
    } catch (e: any) {

        console.log(e)

        if (e.code === "P2002") {
            return {
                error: "Le fournisseur existe déjà"
            }
        }

        return {
            error: e?.message
        }
    }
}

export const getVendors = async () => {
    return prisma.vendor.findMany({
        orderBy: {
            name: "desc"
        }
    });
}

export const getVendorById = async (id: string) => {
    return prisma.vendor.findUnique({
        where: {
            id
        }
    })
}

export const updateVendor = async (id: string, name: string) => {
    try {
       await prisma.vendor.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        revalidatePath("/vendor")
    } catch (e) {
        console.log(e)
    }
}

export const deleteVendor = async (id: string) => {
    try {
        await prisma.vendor.delete({
            where: {
                id
            }
        })
        revalidatePath("/vendor")
    } catch (e) {
        console.log(e)
    }
}