import React from 'react';
import {Separator} from "@/components/ui/separator";
import {UserNav} from "@/components/user-nav";
import Image from "next/image";
import Link from 'next/link';
import Navigation from "@/components/navigation";

function NavBar() {
    return (
        <div>
            <div className="h-16 px-10 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex gap-5 items-center">
                        <Link href={"/"}>
                            <Image className={"-m-7"} src={"logo.svg"} height={10} width={230} alt={"logo"}/>
                        </Link>
                    </div>
                </div>
                <Navigation/>
                <UserNav/>
            </div>

            <Separator/>

        </div>
    );
}

export default NavBar;