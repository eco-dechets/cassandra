"use client"
import React, {useEffect, useState} from 'react';
import {getEmployees} from "@/src/actions/employee";
import {EmployeeDataTable} from "@/components/employee-table/employee-data-table";
import {employeeColumns} from "@/components/employee-table/employee-columns";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Separator} from '@/components/ui/separator';
import {Card, CardContent, CardHeader} from "@/components/ui/card";

function Page() {

    const [employee, setEmployee] = useState<any>()

    useEffect(() => {
        getEmployees().then((res) => {
            setEmployee(res)
        })
    }, []);

    return (
        <div className="pt-20">
            <Card>
                <CardHeader>
                    <div className="flex items-center">
                        <h1 className="text-3xl">Employé.e</h1>
                        <div className="ml-auto">
                            <Link href={"/employee/new"}>
                                <Button>Ajouter un.e employé.e</Button>
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <EmployeeDataTable columns={employeeColumns} data={employee ?? []}/>
                </CardContent>
            </Card>
        </div>
    );
}

export default Page;