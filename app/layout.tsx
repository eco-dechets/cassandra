import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import React from "react";
import {auth} from "@/auth";
import ReactQueryProviders from "@/providers/react-query-provider";
import {cn} from "@/lib/utils";
import NavBar from "@/components/nav-bar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Cassandra",
    description: "Cassandra",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth()
    return (
        <html lang="en">
        <body className={inter.className}>
        <ReactQueryProviders>
            <Toaster position="top-right"/>
            <main className={cn(
                'h-screen',
            )}>
                {session &&
                    <NavBar/>
                }
                <main className="bg-muted/40 h-full">

                <div className="pt-10 mx-auto max-w-7xl">

                    {children}
                </div>
                </main>
            </main>
        </ReactQueryProviders>
        </body>
        </html>
    );
}
