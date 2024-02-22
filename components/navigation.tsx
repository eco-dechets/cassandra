'use client';
import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {usePathname} from 'next/navigation';

import React from "react";
import {UserNav} from "@/components/user-nav";
import {cn} from "@/lib/utils";
import {Users2Icon} from "lucide-react";

const pages = [
    {title: 'Employee', path: '/', icon: <Users2Icon className="h-4 w-4"/>},
    {title: 'Materiel', path: '/material', icon: <Users2Icon className="h-4 w-4"/>},
    {title: 'Taxonomy', path: '/taxonomy', icon: <Users2Icon className="h-4 w-4"/>},
    {title: 'Taches', path: '/task-management', icon: <Users2Icon className="h-4 w-4"/>},
];

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="-mb-pb flex items-center justify-between  space-x-5 text-sm leading-5">
            <div className="flex space-x-5 text-sm leading-5">
                {pages.map((link, index) => (
                    <Link key={index} href={link.path}>
                        <p className={cn(
                            "flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md",
                            pathname === link.path && "bg-indigo-600 text-white rounded-full"
                        )}>
                            {link.icon}
                            <span className="ml-2">{link.title}</span>
                        </p>
                    </Link>
                ))}
            </div>

        </nav>
    );
}