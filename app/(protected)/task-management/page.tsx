"use client"
import React, {useEffect, useState} from 'react';
import {getTaskManagements} from "@/src/actions/task-management";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {taskColumns} from "@/components/taskmanagement-table/task-columns";
import {TaskDataTable} from "@/components/taskmanagement-table/task-data-table";

function Page() {
    const [tasks, setTasks] = useState<any>([])

    useEffect(() => {
        getTaskManagements().then((res) => {
            setTasks(res)
        })
    }, []);
    return (
        <div>
            <div className="flex items-center py-10">
                <h1 className="text-3xl">Taches</h1>
                <div className="ml-auto">
                    <Link href={"/task-management/new"}>
                        <Button variant="outline">Ajouter une tache</Button>
                    </Link>
                </div>
            </div>
            <TaskDataTable columns={taskColumns} data={tasks}/>
        </div>
    );
}

export default Page;