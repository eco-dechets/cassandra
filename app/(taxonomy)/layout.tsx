"use client"
import React from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {
    Keyboard, Laptop, LogOut, MapPin,
    UserIcon,
    Users2,
} from "lucide-react"
import {Nav} from "@/components/nav";
import {Button} from "@/components/ui/button";
import {signOut} from "next-auth/react";
import Image from "next/image";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {


    return (

        <TooltipProvider delayDuration={0}>
            <main className="grid grid-cols-[200px_minmax(300px,_1fr)]">

                <div className="flex flex-col justify-between">
                    <div>

                        <div className="pt-10">
                            <Nav
                                isCollapsed={false}
                                links={[
                                    {
                                        title: "Fournisseur",
                                        label: "",
                                        icon: Users2,
                                        href: "/vendor"
                                    },
                                    {
                                        title: "Fonction",
                                        label: "",
                                        icon: UserIcon,
                                        href: "/fonction"
                                    },
                                    {
                                        title: "Site d'exploitaion",
                                        label: "",
                                        icon: MapPin,
                                        href: "/operating-site"
                                    },
                                    {
                                        title: "Type de materiel",
                                        label: "",
                                        icon: Keyboard,
                                        href: "/material-category"
                                    },
                                    {
                                        title: "Marques",
                                        label: "",
                                        icon: UserIcon,
                                        href: "/brand"
                                    }
                                ]}
                            />
                        </div>
                    </div>

                </div>
                <div className="px-10">
                    {children}
                </div>


            </main>
        </TooltipProvider>


    )
}
