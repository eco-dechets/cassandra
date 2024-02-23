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
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import dayjs from "dayjs";
import {useRouter} from 'next/navigation';
import {EmployeeSchema} from "@/src/schemas";
import Profile from "@/app/(protected)/employee/new/profile";
import Materiel from "@/app/(protected)/employee/new/materiel";
import AccessGranted from "@/app/(protected)/employee/new/access-granted";
import {createEmployee} from "@/src/actions/employee";
import {toast} from "sonner";


function Page() {


    const router = useRouter()


    const form = useForm<z.infer<typeof EmployeeSchema>>({
        resolver: zodResolver(EmployeeSchema),
        defaultValues: {
            materiels: [],
            formations: [],
            groupCloud: [],
            groupDistribution: [],
            licences: [],
            softwares: []
        },
    })


    const onSubmit = (values: z.infer<typeof EmployeeSchema>) => {

        values.enteredAt = dayjs(values.enteredAt).format("YYYY-MM-DD")
        values.formations?.map((contract) => {
            contract.date = dayjs(contract.date).format("YYYY-MM-DD")
        })

        // transform array of object to array of string
        values.licences = values.licences.map((materiel) => materiel?.label)
        values.softwares = values.softwares.map((materiel) => materiel?.label)
        values.groupCloud = values.groupCloud.map((materiel) => materiel?.label)
        values.groupDistribution = values.groupDistribution.map((materiel) => materiel?.label)

        console.log(values)

        createEmployee(values).then((res) => {
            if (res.success) {
                toast.success(res.success)
                router.push("/")
            }

            if (res.error) {
                toast.error(res.error)
            }

        })

    }

    return (
        <div className="flex h-full flex-col">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                    <div className="flex justify-between items-center py-4 px-5">
                        <div className={"flex items-center gap-5"}>

                            <span className="text-3xl">Ajouter un.e employé.e</span>
                        </div>
                        <Button //disabled={!form.formState.isValid}
                            type="submit">Créer</Button>
                    </div>
                    <Separator/>

                    <Tabs defaultValue="profile" className="px-5">
                        <TabsList className="grid w-60 grid-cols-3 my-3">
                            <TabsTrigger value="profile">Profil</TabsTrigger>
                            <TabsTrigger value="materiel">Materiel</TabsTrigger>
                            <TabsTrigger value="access">Accès</TabsTrigger>
                        </TabsList>

                        <TabsContent className="pt-2" value="profile">
                            <Profile form={form}/>
                        </TabsContent>
                        <TabsContent className="pt-2" value="materiel">
                            <Materiel form={form}/>
                        </TabsContent>
                        <TabsContent className="pb-5 pt-2" value="access">
                            <div className="grid grid-cols-2 gap-6">
                                {/*<Formation form={form}/>*/}
                                <AccessGranted form={form}/>
                            </div>
                        </TabsContent>
                    </Tabs>

                </form>
            </Form>


        </div>

    );
}

export default Page;