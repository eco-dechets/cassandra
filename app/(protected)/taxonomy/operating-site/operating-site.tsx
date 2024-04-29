"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import AutoForm from "@/components/ui/auto-form";
import React, {startTransition} from "react";
import {toast} from "sonner";
import * as z from "zod";
import {createOperatingSite} from "@/src/actions/operating-site";
import {Separator} from "@/components/ui/separator";

const formSchema = z.object({
    name: z.string(),
})

export default function OperatingSite() {
    return (
        <div>
            <div className="flex items-center py-4 px-5">
                <h1 className="text-3xl">Site d&apos;exploitation</h1>
                <div className="ml-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Ajouter un site d&apos;exploitation</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Ajouter un site d&apos;exploitation</DialogTitle>
                                <DialogDescription>
                                    Entrez le nom du site
                                </DialogDescription>
                            </DialogHeader>
                            <AutoForm formSchema={formSchema} onSubmit={async (values) => {
                                startTransition(() => {
                                    createOperatingSite(values.name).then((res) => {
                                        if (res.success) {
                                            toast.success(res.success)
                                        }

                                        if (res.error) {
                                            toast.error(res.error)
                                        }
                                    })
                                })
                            }}>
                                <DialogFooter>
                                    <Button type="submit">Ajouter</Button>
                                </DialogFooter>
                            </AutoForm>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
}

