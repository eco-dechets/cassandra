"use client";
import {createBrand} from "@/src/actions/brand";
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

const formSchema = z.object({
    name: z.string(),
})

export default function Brand() {
    return (
        <div>
            <div className="flex items-center py-10">
                <h1 className="text-3xl">Marques</h1>
                <div className="ml-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Ajouter une marque</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Ajouter une marque</DialogTitle>
                                <DialogDescription>
                                    Entrez le nom de la marque
                                </DialogDescription>
                            </DialogHeader>
                            <AutoForm formSchema={formSchema} onSubmit={async (values) => {
                                startTransition(() => {
                                    createBrand(values.name).then((res) => {
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

