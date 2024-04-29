'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

import React from "react";
import {cn} from "@/lib/utils";

const pages = [
    {title: 'Employee', path: '/'},
    {title: 'Materiel', path: '/material',},
    {title: 'Taxonomy', path: '/taxonomy/vendor',},
    {title: 'Taches', path: '/task-management'},
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className=" flex items-center justify-between ">
            <div className="flex  gap-5">
                {pages.map((link, index) => (
                    <Link key={index} href={link.path}>
                        <p className={cn(
                            "flex items-center py-1 font-medium",
                            pathname === link.path && "text-indigo-600"
                        )}>
                            <span>{link.title}</span>
                        </p>
                    </Link>
                ))}
            </div>

        </nav>
    );
}