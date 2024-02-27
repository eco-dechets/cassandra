"use client"
import React, {useEffect, useState} from 'react';
import * as z from "zod";
import {Separator} from "@/components/ui/separator";
import {zodResolver} from "@hookform/resolvers/zod"

import {
    Form
} from "@/components/ui/form"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {X} from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import {useRouter} from 'next/navigation';
import {EmployeeSchema} from "@/src/schemas";
import Profile from "./profile";
import Materiel from "./materiel";
import AccessGranted from "./access-granted";
import {createEmployee, getEmployeeById, updateEmployee} from "@/src/actions/employee";
import {toast} from "sonner";


function Page({params}: { params: { id: string } }) {

    const [employee, setEmployee] = useState<any>()

    useEffect(() => {
        getEmployeeById(params.id).then((res) => {
            setEmployee(res)
        })
    }, [params.id]);

    console.log(employee)


    const router = useRouter()

    const arrayOfStringToArrOfObject = (array: string[]) => {
        return array?.map((item) => {
            return {label: item, value: item}
        })
    }

    const arrayOfObjectToArrOfString = (array: any[]) => {
        return array?.map((item) => {
            return item?.materialId
        })
    }



    const form = useForm<z.infer<typeof EmployeeSchema>>({
        resolver: zodResolver(EmployeeSchema),
        values: {
            firstName: employee?.firstName,
            lastName: employee?.lastName,
            email: employee?.email,
            phone: employee?.phone,
            enteredAt: employee?.enteredAt,
            fonctionId: employee?.fonctionId,
            siteId: employee?.siteId,
            materiels: arrayOfObjectToArrOfString(employee?.history),
            formations: [],
            groupCloud: arrayOfStringToArrOfObject(employee?.groupCloud),
            groupDistribution: arrayOfStringToArrOfObject(employee?.groupDistribution),
            licences: arrayOfStringToArrOfObject(employee?.licenses),
            softwares: arrayOfStringToArrOfObject(employee?.softwares),
            comment: employee?.comment,
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

        updateEmployee(params.id,values).then((res) => {
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
        <div className="flex h-full flex-col pt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                    <div className="flex justify-between items-center p-2 pb-10">
                        <div className={"flex items-center gap-5"}>

                            <span className="text-3xl">Modifier un.e employé.e</span>
                        </div>
                        <Button //disabled={!form.formState.isValid}
                            type="submit">Modifier</Button>
                    </div>


                    <Tabs defaultValue="profile">
                        <TabsList className="grid w-60 grid-cols-3 my-3">
                            <TabsTrigger value="profile">Profil</TabsTrigger>
                            <TabsTrigger value="materiel">Materiel</TabsTrigger>
                            <TabsTrigger value="access">Accès</TabsTrigger>
                        </TabsList>
                        <div className="mx-auto ">

                            <TabsContent className="pt-2" value="profile">
                                <Profile form={form}/>
                            </TabsContent>
                            <TabsContent className="pt-2" value="materiel">
                                <Materiel form={form} employeeId={params.id}/>
                            </TabsContent>
                            <TabsContent className="pb-5 pt-2" value="access">
                                <div className="grid grid-cols-2 gap-6">
                                    {/*<Formation form={form}/>*/}
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

export default Page;