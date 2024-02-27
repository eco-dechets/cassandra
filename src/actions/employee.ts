"use server"
import * as z from "zod";
import prisma from "@/lib/prisma";
import {EmployeeSchema} from "@/src/schemas";
import {revalidatePath} from "next/cache";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {getUnavailableMaterial} from "@/src/actions/material";
import dayjs from "dayjs";

export const createEmployee = async (values: z.infer<typeof EmployeeSchema>) => {
    const payload = EmployeeSchema.safeParse(values)
    if (!payload.success) {
        return {
            error: true,
        }
    }

    const unavailableMaterial = await getUnavailableMaterial(payload.data.materiels as string[]);

    if (unavailableMaterial.length > 0) {
        return {
            error: "Some materiels are unavailable",
        }
    }

    try {
        const employee = await prisma.employee.create({
            data: {
                firstName: payload.data.firstName,
                lastName: payload.data.lastName,
                email: payload.data.email,
                phone: payload.data.phone,
                fonctionId: payload.data.fonctionId,
                siteId: payload.data.siteId,
                groupCloud: payload.data.groupCloud,
                groupDistribution: payload.data.groupDistribution,
                softwares: payload.data.softwares,
                licenses: payload.data.licences,
                enteredAt: payload.data.enteredAt,
                comment: payload.data.comment ?? ""
            }
        });

        await prisma.materialHistory.createMany({
            data: payload.data.materiels!.map((materiel) => {
                return {
                    employeeId: employee.id,
                    materialId: materiel
                }
            })
        });

        // change state of materiels to unavailable
        await prisma.material.updateMany({
            where: {
                id: {
                    in: payload.data.materiels
                }
            },
            data: {
                state: "UNAVAILABLE"
            }
        });

        revalidatePath("/");

        return {
            success: "Employee created successfully",
        }
    } catch (e) {

        console.log(e)

        if (e instanceof PrismaClientKnownRequestError) {
            return {
                error: e.message
            }
        }

        return {
            error: "Une erreur s'est produite"
        }

    }
}


export const getEmployees = async () => {
    return prisma.employee.findMany({
        include: {
            site: true,
            fonction: true
        }
    });
}

export const getEmployeeById = async (id: string) => {
    return prisma.employee.findUnique({
        where: {
            id
        },
        include: {
            site: true,
            fonction: true,
            history: true
        }
    });

}

export const updateEmployee = async (id: string, values: z.infer<typeof EmployeeSchema>) => {
    const payload = EmployeeSchema.safeParse(values)

    if (!payload.success) {
        return {
            error: true,
        }
    }

    try {
        await prisma.employee.update({
            where: {
                id
            },
            data: {
                firstName: payload.data.firstName,
                lastName: payload.data.lastName,
                email: payload.data.email,
                phone: payload.data.phone,
                fonctionId: payload.data.fonctionId,
                siteId: payload.data.siteId,
                groupCloud: payload.data.groupCloud,
                groupDistribution: payload.data.groupDistribution,
                softwares: payload.data.softwares,
                licenses: payload.data.licences,
                enteredAt: payload.data.enteredAt,
                comment: payload.data.comment ?? ""
            }
        });

        revalidatePath("/");

        return {
            success: "Employee updated successfully",
        }
    } catch (e) {

        console.log(e)

        if (e instanceof PrismaClientKnownRequestError) {
            return {
                error: e.message
            }
        }

        return {
            error: "Une erreur s'est produite"
        }

    }
}

export const restituteMaterial = async (employeeId: string, materialId: string) => {
    try {
        await prisma.materialHistory.updateMany({
            where: {
                employeeId,
                materialId
            },
            data: {
                restitutionDate: dayjs().toDate()
            }
        });

        await prisma.material.update({
            where: {
                id: materialId
            },
            data: {
                state: "AVAILABLE"
            }
        });

        revalidatePath("/");

        return {
            success: "Materiel restitué avec succès",
        }
    } catch (e) {
        console.log(e)
        return {
            error: "Une erreur s'est produite"
        }
    }
}

export const attributeMaterial = async (employeeId: string, materialId: string) => {
    try {
        await prisma.materialHistory.create({
            data: {
                employeeId,
                materialId,
            }
        });

        await prisma.material.update({
            where: {
                id: materialId
            },
            data: {
                state: "UNAVAILABLE"
            }
        });

        revalidatePath("/");

        return {
            success: "Materiel attribué avec succès",
        }
    } catch (e) {
        console.log(e)
        return {
            error: "Une erreur s'est produite"
        }
    }

}

export const archiveEmployee = async (id: string) => {
    try {
        await prisma.employee.update({
            where: {
                id
            },
            data: {
                state: "INACTIVE"
            }
        });


        await prisma.materialHistory.updateMany({
            where: {
                employeeId: id
            },
            data: {
                restitutionDate: dayjs().toDate()
            }
        });

        const employeeMateriels = await prisma.materialHistory.findMany({
            where: {
                employeeId: id
            }
        });

        await prisma.material.updateMany({
            where: {
                id: {
                    in: employeeMateriels.map((materiel) => materiel.materialId)
                }
            },
            data: {
                state: "AVAILABLE"
            }
        });


        revalidatePath("/");

        return {
            success: "Employee archivé avec succès",
        }
    } catch (e) {
        console.log(e)
        return {
            error: "Une erreur s'est produite"
        }
    }
}