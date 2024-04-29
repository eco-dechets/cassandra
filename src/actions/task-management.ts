"use server"
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";
import {z} from "zod";
import {TaskManagementSchema} from "@/src/schemas";
import {TaskPriority, TaskState, TaskType} from "@prisma/client";
import CreateTicketEmail from "@/emails/create-ticket";
import {resend} from "@/lib/resend";

export const createTaskManagement = async (values: z.infer<typeof TaskManagementSchema>) => {
    const payload = TaskManagementSchema.safeParse(values);
    if (!payload.success) {
        return {
            error: true,
        };
    }

    try {
        const task = await prisma.taskManagement.create({
            data: {
                date: payload.data.date,
                dueDate: payload.data.dueDate,
                type: payload.data.type as TaskType,
                description: payload.data.description,
                state: payload.data.state as TaskState,
                priority: payload.data.priority as TaskPriority,
                from: payload.data.from,
                assignedTo: payload.data.assignedTo,
                duration: payload.data.duration ? parseInt(payload.data.duration) : null,
                who: payload.data.who,

            },
        });

        if (payload.data.who === "utilisateur") {
            await sendCreateTaskManagementEmail(task.id);
        }


        revalidatePath("/task-management");

        return {
            success: "Task created successfully",
        };
    } catch (e) {
        console.log(e);
        return {
            error: "An error occurred while creating the task",
        };

    }
}

export const getTaskManagement = (id: string) => {
    return prisma.taskManagement.findUnique({
        where: {
            id,
        },
        include: {
            employee: true,
        }
    });
}


export const getTaskManagements = () => {
    return prisma.taskManagement.findMany();
}

export const updateTaskManagement = async (id: string, values: z.infer<typeof TaskManagementSchema>) => {
    const payload = TaskManagementSchema.safeParse(values);
    if (!payload.success) {
        return {
            error: true,
        };
    }

    try {
        await prisma.taskManagement.update({
            where: {
                id,
            },
            data: {
                date: payload.data.date,
                dueDate: payload.data.dueDate,
                type: payload.data.type as TaskType,
                description: payload.data.description,
                state: payload.data.state as TaskState,
                priority: payload.data.priority as TaskPriority,
                from: payload.data.from,
                assignedTo: payload.data.assignedTo,
                duration: payload.data.duration ? parseInt(payload.data.duration) : null,
                who: payload.data.who,
            },
        });

        revalidatePath("/task-management");

        return {
            success: "Task updated successfully",
        };
    } catch (e) {
        console.log(e);
        return {
            error: "An error occurred while updating the task",
        };

    }
}


export const sendCreateTaskManagementEmail = async (id: string) => {

    const task = await getTaskManagement(id);

    const {data, error} = await resend.emails.send({
        from: 'Support Eco Déchets <onboarding@resend.dev>',
        to: process.env.NODE_ENV === "production" ? task?.employee.email as string : "delivered@resend.dev",
        subject: 'Votre demande a été prise en compte',
        react: CreateTicketEmail({lastName: task?.employee.lastName, description: task?.description}),
    });

    if (error) {
        console.log("error", error);
    }

}


export const deleteTaskManagement = async (id: string) => {
    try {
        await prisma.taskManagement.delete({
            where: {
                id,
            },
        });

        revalidatePath("/task-management");

    } catch (e) {
        console.log(e);
        return {
            error: "An error occurred while deleting the task",
        };

    }
}