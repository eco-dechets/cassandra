"use client"
import React, {useEffect, useState} from 'react';
import {getTaskManagements} from "@/src/actions/task-management";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {taskColumns} from "@/components/taskmanagement-table/task-columns";
import {TaskDataTable} from "@/components/taskmanagement-table/task-data-table";
import {Separator} from "@/components/ui/separator";

function Page() {
    const [tasks, setTasks] = useState<any>([])

    useEffect(() => {
        getTaskManagements().then((res) => {
            setTasks(res)
        })
    }, []);
    return (
        <div>
            <div className="flex items-center py-4 px-5">
                <h1 className="text-3xl">Taches</h1>
                <div className="ml-auto">
                    <Link href={"/task-management/new"}>
                        <Button variant="outline">Ajouter une tache</Button>
                    </Link>
                </div>
            </div>
            <Separator/>
           <div className="p-5">
                <TaskDataTable columns={taskColumns} data={tasks}/>
           </div>
        </div>
    );
}

export default Page;