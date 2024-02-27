import { TaskType } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})


export const RegisterSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export const MaterialSchema = z.object({
    id: z.string().optional(),
    commandDate: z.any(),
    commandNumber: z.string(),
    billNumber: z.string(),
    serialNumber: z.string(),
    inventoryNumber: z.any(),
    deliveryDate: z.any(),
    amountHT: z.string(),
    amountTTC: z.string(),
    tva: z.string(),
    brandId: z.string(),
    categoryId: z.string(),
    nature: z.string(),
    comment: z.string().optional(),
    vendorId: z.string(),

})

export const EmployeeSchema = z.object({
    id: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    siteId: z.string(),
    enteredAt: z.any().optional(),
    fonctionId: z.string(),
    phone: z.string(),
    materiels: z.array(z.string()).optional(),
    formations: z.array(z.object({
        name: z.string(),
        date: z.any().optional(),
    })).optional(),
    groupCloud: z.array(z.any()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    groupDistribution: z.array(z.any()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    licences: z.array(z.any()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    softwares: z.array(z.any()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    comment: z.string().optional(),
})

export const TaskManagementSchema = z.object({
    id: z.string().optional(),
    date: z.any(),
    dueDate: z.any(),
    type: z.string(),
    description: z.string(),
    state: z.string().optional(),
    priority: z.string(),
    from: z.string(),
    assignedTo: z.string(),
    who: z.string(),
    duration: z.any(),
})
