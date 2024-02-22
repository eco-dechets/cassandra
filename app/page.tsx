"use client"
import React, {useEffect, useState} from 'react';
import {getEmployees} from "@/src/actions/employee";
import {EmployeeDataTable} from "@/components/employee-table/employee-data-table";
import {employeeColumns} from "@/components/employee-table/employee-columns";
import Link from "next/link";
import {Button} from "@/components/ui/button";

function Page() {

    const [employee, setEmployee] = useState<any>()

    useEffect(() => {
        getEmployees().then((res) => {
            setEmployee(res)
        })
    }, []);

    console.log(employee)

    return (
        <div className="">
            <div className="flex items-center py-10">
                <h1 className="text-3xl">Employé.e</h1>
                <div className="ml-auto">
                    <Link href={"/employee/new"}>
                        <Button variant="outline">Ajouter un.e employé.e</Button>
                    </Link>
                </div>
            </div>
            <EmployeeDataTable columns={employeeColumns} data={employee ?? []}/>
        </div>
    );
}

export default Page;