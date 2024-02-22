"use client"
import React from 'react';
import * as z from "zod";
import {Separator} from "@/components/ui/separator";
import {zodResolver} from "@hookform/resolvers/zod"

import {
    Form
} from "@/components/ui/form"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button";
import Profile from "@/app/dashboard/employee/profile";
import Materiel from "@/app/dashboard/employee/materiel";
import AccessGranted from "@/app/dashboard/employee/access-granted";
import Formation from "@/app/dashboard/employee/formation";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {X} from "lucide-react";
import {useEmployeePanelAtom} from "@/atoms/employee-atom";


const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(20),
    email: z.string().email(),
    phoneNumber: z.string().length(10),
    enteredAt: z.date(),
    fonction: z.string(),
    comment: z.string().optional(),
    operatingSite: z.string(),
    files: z.array(z.object({
        file: z.any().optional(),
        description: z.string(),
    })).optional(),
    groupCloud: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    groupDistribution: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    licences: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    softwares: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    accessComment: z.string().optional(),
    materiels: z
        .array(
            z.object({
                name: z.string(),
            }),
        ),
    formations: z
        .array(
            z.object({
                name: z.string(),
                date: z.date(),
            }),
        ),
})


function NewEmployee() {

    const {setEmployeePanel} = useEmployeePanelAtom()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            materiels: [{name: ""}],
            formations: [{name: "", date: new Date()}],
            files: [],
            groupCloud: [],
            groupDistribution: [],
            licences: [],
            softwares: []
        },
    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div className="flex h-full flex-col">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                    <div className="flex justify-between items-center p-2">
                        <div className={"flex items-center gap-5"}>
                            <Button onClick={() => {
                                setEmployeePanel(null)
                            }} variant={"ghost"} size={"icon"}>
                                <X/>
                            </Button>
                            <Separator orientation="vertical" className="mx-1 h-6"/>
                            <span className="font-bold text-xl">Ajouter un.e employé.e</span>
                        </div>
                        <Button disabled={!form.formState.isValid} type="submit">Créer</Button>
                    </div>
                    <Separator/>

                    <Tabs defaultValue="profile">
                        <TabsList className="grid w-60 grid-cols-3 mx-5 my-3">
                            <TabsTrigger value="profile">Profil</TabsTrigger>
                            <TabsTrigger value="materiel">Materiel</TabsTrigger>
                            <TabsTrigger value="access">Accès</TabsTrigger>
                        </TabsList>
                        <Separator/>
                        <div className="mx-auto w-1/2">
                            <TabsContent className="pt-2" value="profile">
                                <Profile form={form}/>
                            </TabsContent>
                            <TabsContent className="pt-2" value="materiel">
                                <Materiel form={form}/>
                            </TabsContent>
                            <TabsContent className="pb-5 pt-2" value="access">
                                <div className="grid grid-cols-2 gap-6">
                                    <Formation form={form}/>
                                    <AccessGranted form={form}/>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>

                </form>
            </Form>


        </div>

    );
}

export default NewEmployee;