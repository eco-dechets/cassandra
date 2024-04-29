"use client"
import React, {useEffect, useState} from 'react';
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

import {Form} from "@/components/ui/form"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button";
import dayjs from "dayjs";
import {useRouter} from 'next/navigation';
import {EmployeeSchema} from "@/src/schemas";
import Profile from "./profile";
import Materiel from "./materiel";
import AccessGranted from "./access-granted";
import {getEmployeeById, updateEmployee} from "@/src/actions/employee";
import {toast} from "sonner";
import UploadDecharge from "@/components/upload-decharge";
import {ChevronLeft} from "lucide-react";
import {Badge} from "@/components/ui/badge";


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

        updateEmployee(params.id, values).then((res) => {
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
        <div className="flex h-full flex-col pt-10 mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                    <div className="flex items-center gap-4 pb-10">

                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {employee?.firstName} {employee?.lastName}
                        </h1>
                        <Badge variant={employee?.state == "ACTIVE" ? "success" : "destructive"} className="ml-auto sm:ml-0">
                            {employee?.state}
                        </Badge>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button type={"submit"} size="sm">Modifier</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="flex flex-col gap-6">
                            <Profile form={form}/>
                            <AccessGranted form={form}/>
                        </div>
                        <div className="flex flex-col gap-6">
                            <UploadDecharge employeeId={params.id} url={employee?.dechargeUrl}/>
                            <Materiel form={form} employeeId={params.id}/>
                        </div>
                    </div>

                </form>
            </Form>
        </div>

    );
}

export default Page;