"use client"
import React from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Nav} from "@/components/nav";
import {Keyboard, Laptop, LogOut, MapPin, UserIcon, Users2} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";

function Sidebar() {
    return (
        <div className="h-full border-r flex flex-col justify-between overflow-hidden">
            <div>
                <div
                    className={cn("flex h-[52px] items-center font-bold text-xl m-0")}>
                    <Image className={"-m-5 mt-0.5"} src={"/logo.svg"} height={20} width={270} alt={"logo"}/>
                </div>
                <div className="py-5">
                    <Nav
                        links={[
                            {
                                title: "Employees",
                                label: "",
                                icon: Users2,
                                href: "/"
                            },
                            {
                                title: "Materiels",
                                label: "",
                                icon: Laptop,
                                href: "/material"
                            },
                            {
                                title: "Tâches",
                                label: "",
                                icon: Laptop,
                                href: "/task-management"
                            }
                        ]}
                    />
                </div>
                <Separator/>
                <div className="pt-10">
                    <p className="px-5 pb-3 uppercase text-xs">Taxonomies</p>
                    <Nav
                        links={[
                            {
                                title: "Fournisseurs",
                                label: "",
                                icon: Users2,
                                href: "/vendor"
                            },
                            {
                                title: "Fonctions",
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
                <div className="pt-20">
                    <p className="px-5 pb-3 uppercase text-xs">Administration</p>
                            <Nav
                                links={[
                                    {
                                        title: "Utilisateurs",
                                        label: "",
                                        icon: Users2,
                                        href: "/user"
                                    }
                                ]}
                            />
                </div>
                <div className="pt-20">
                    {/* <Nav
                                isCollapsed={isCollapsed}
                                links={[
                                    {
                                        title: "Settings",
                                        label: "",
                                        icon: SettingsIcon,
                                        href: "/dashboard/social"
                                    }
                                ]}
                            />*/}
                </div>
            </div>
            <div className="pb-10">


                <Button className="mx-2 px-3 justify-start" variant={"ghost"}
                        onClick={async () => {
                            localStorage.clear()
                        }}
                >
                    <LogOut className="mr-2 h-4 w-4"/> se déconnecter
                </Button>


            </div>
        </div>
    );
}

export default Sidebar;