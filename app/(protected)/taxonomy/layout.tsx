"use client"
import React from 'react';
import {Keyboard, MapPin, UserIcon, Users2} from "lucide-react";
import {Nav} from "@/components/nav";

function Layout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="pt-20 flex gap-10">
            <div className="w-48">
                <Nav links={[
                            {
                                title: "Fournisseurs",
                                label: "",
                                icon: Users2,
                                href: "/taxonomy/vendor"
                            },
                            {
                                title: "Fonctions",
                                label: "",
                                icon: UserIcon,
                                href: "/taxonomy/fonction"
                            },
                            {
                                title: "Site d'exploitaion",
                                label: "",
                                icon: MapPin,
                                href: "/taxonomy/operating-site"
                            },
                            {
                                title: "Type de materiel",
                                label: "",
                                icon: Keyboard,
                                href: "/taxonomy/material-category"
                            },
                            {
                                title: "Marques",
                                label: "",
                                icon: UserIcon,
                                href: "/taxonomy/brand"
                            }
                        ]}/>
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}

export default Layout;