"use client"
import React, {useEffect, useState} from 'react';
import {getEmployees} from "@/src/actions/employee";

function Page() {

    const [employee, setEmployee] = useState<any>()

    useEffect(() => {
        getEmployees().then((res) => {
            setEmployee(res)
        })
    }, []);

    console.log(employee)

    return (
        <div></div>
    );
}

export default Page;