import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import React from "react";
import NavBar from "@/components/nav-bar";
import {auth} from "@/auth";
import ReactQueryProviders from "@/providers/react-query-provider";
import Navigation from "@/components/navigation";
import {UserNav} from "@/components/user-nav";
import Sidebar from "@/components/sidebar";

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
            <div
                className="blob w-[800px] h-[50px] rounded-[999px] absolute -z-10 top-0 right-0 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
            <main className="h-screen grid grid-cols-[250px_minmax(300px,_1fr)]">
                {
                    session && <div><Sidebar/></div>
                }
                <div
                    className="blob w-[230px] h-screen absolute -z-10 top-0 blur-3xl bg-opacity-60 bg-gradient-to-b from-indigo-50 via-purple-100 to-pink-200"></div>


                <div>
                    {children}
                </div>
            </main>
        </ReactQueryProviders>
        </body>
        </html>
    );
}
