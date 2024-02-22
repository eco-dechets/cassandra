"use server"
import * as z from "zod";
import prisma from "@/lib/prisma";
import {MaterialSchema} from "@/src/schemas";
import {revalidatePath} from "next/cache";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

export const createMaterial = async (values: z.infer<typeof MaterialSchema>) => {
    const payload = MaterialSchema.safeParse(values)

    if (!payload.success) {
        console.log(payload.error.errors)
        return {
            error: true,
        }
    }


    try {
        await prisma.material.create({
            data: {
                commandDate: payload.data.commandDate,
                commandNumber: payload.data.commandNumber,
                billNumber: payload.data.billNumber,
                serialNumber: payload.data.serialNumber,
                inventoryNumber: payload.data.inventoryNumber,
                deliveryDate: payload.data.deliveryDate,
                amountHT: parseFloat(payload.data.amountHT),
                amountTTC: parseFloat(payload.data.amountTTC),
                tva: parseInt(payload.data.tva),
                brandId: payload.data.brandId,
                categoryId: payload.data.categoryId,
                nature: payload.data.nature as any,
                comment: payload.data.comment,
                vendorId: payload.data.vendorId,
            }
        })

        revalidatePath("/material")

        return {
            success: "Materiel créé avec succès"
        }

    } catch (e) {
        console.log(e)

        if (e instanceof PrismaClientKnownRequestError) {
            console.log(e.code)
            // @ts-ignore
            if (e.code === "P2002" && e.meta?.target?.includes("serialNumber")) {
                return {
                    error: "Le numéro de série existe déjà"
                }
            }


            // @ts-ignore
            if (e.code === "P2002" && e.meta?.target?.includes("inventoryNumber")) {
                return {
                    error: "Le numéro d'inventaire existe déjà"
                }
            }

            return {
                error: e?.message
            }
        }

        return {
            error: "Une erreur s'est produite"
        }

    }
}

export const getMaterial = async () => {
    return prisma.material.findMany({
        orderBy: {
            commandDate: "desc"
        },
        include: {
            brand: true,
            category: true,
            vendor: true,
            history: {
                include: {
                    employee: true
                }

            }
        }
    });
}

export const getUnavailableMaterial = async (materials: Array<string>) => {
    return prisma.material.findMany({
        where: {
            state: "UNAVAILABLE",
            id: {
                in: materials
            }
        },
        orderBy: {
            commandDate: "desc"
        }
    });
}

export const updateMaterial = async (id: string, values: z.infer<typeof MaterialSchema>) => {
    const payload = MaterialSchema.safeParse(values)

    if (!payload.success) {
        console.log(payload.error.errors)
        return {
            error: true,
        }
    }

    try {
        await prisma.material.update({
            where: {
                id
            },
            data: {
                commandDate: payload.data.commandDate,
                commandNumber: payload.data.commandNumber,
                billNumber: payload.data.billNumber,
                serialNumber: payload.data.serialNumber,
                inventoryNumber: payload.data.inventoryNumber,
                deliveryDate: payload.data.deliveryDate,
                amountHT: parseFloat(payload.data.amountHT),
                amountTTC: parseFloat(payload.data.amountTTC),
                tva: parseInt(payload.data.tva),
                brandId: payload.data.brandId,
                categoryId: payload.data.categoryId,
                nature: payload.data.nature as any,
                comment: payload.data.comment,
                vendorId: payload.data.vendorId,
            }
        })
        revalidatePath("/material")
        return {
            success: "Materiel mis à jour avec succès"
        }
    } catch (e) {
        console.log(e)

        if (e instanceof PrismaClientKnownRequestError) {
            console.log(e.code)
            // @ts-ignore
            if (e.code === "P2002" && e.meta?.target?.includes("serialNumber")) {
                return {
                    error: "Le numéro de série existe déjà"
                }
            }


            // @ts-ignore
            if (e.code === "P2002" && e.meta?.target?.includes("inventoryNumber")) {
                return {
                    error: "Le numéro d'inventaire existe déjà"
                }
            }

            return {
                error: e?.message
            }
        }

        return {
            error: "Une erreur s'est produite"
        }
    }
}

export const deleteMaterial = async (serialNumber: string) => {
    try {
        await prisma.material.delete({
            where: {
                serialNumber
            }
        })
        revalidatePath("/material")
    } catch (e) {
        console.log(e)
    }
}

export const getMaterialBySerialNumber = async (serialNumber: string) => {
    return prisma.material.findUnique({
        where: {
            serialNumber
        }
    })
}