import React from 'react';
import {Separator} from "@/components/ui/separator";
import {UserNav} from "@/components/user-nav";
import Image from "next/image";
import Link from 'next/link';
import Navigation from "@/components/navigation";
import {Package2} from "lucide-react";
import {cn} from "@/lib/utils";
import logo from "@/public/logo.svg"

function NavBar() {
    return (
        <div className="fixed w-full z-50">
            <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
                <div className="flex items-center">
                    <div>
                        <Image src={logo} height={20} width={270} alt={"logo"}/>
                    </div>
                    <Navigation/>
                </div>
                <UserNav/>

            </header>
            {/*<div className="h-16 px-10 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex gap-5 items-center">
                        <Link href={"/"}>
                            <Image className={"-m-7"} src={"logo.svg"} height={10} width={230} alt={"logo"}/>
                        </Link>
                    </div>
                </div>
                <Navigation/>
                <UserNav/>
            </div>*/}



        </div>
    );
}

export default NavBar;