"use client"
import React, {useEffect, useState} from 'react';
import {getUsers} from "@/src/actions/user";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {EmployeeDataTable} from "@/components/employee-table/employee-data-table";
import {employeeColumns} from "@/components/employee-table/employee-columns";
import {UserDataTable} from "@/components/user-table/user-data-table";
import {userColumns} from "@/components/user-table/user-columns";
import {Separator} from "@/components/ui/separator";

function Page() {
    const [users, setUsers] = useState<any>([])

    useEffect(() => {
        getUsers().then((res) => {
            console.log(res)
            setUsers(res)
        })
    }, []);

    return (
        <div className="">
            <div className="flex items-center py-4 px-5">
                <h1 className="text-3xl">Utilisateur</h1>
                <div className="ml-auto">
                    <Link href={"/register"}>
                        <Button variant="outline">Ajouter un utilisateur</Button>
                    </Link>
                </div>
            </div>
            <Separator/>
           <div className="p-5">
                <UserDataTable columns={userColumns} data={users ?? []}/>
           </div>
        </div>
    );
}

export default Page;