"use client"
import React, {useRef, useState, useTransition} from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {PutBlobResult} from "@vercel/blob";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {setEmployeeDecharge} from "@/src/actions/employee";
import {Icons} from "@/components/icons";

function UploadDecharge({employeeId, url}: { employeeId: string, url: string | null }) {

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async () => {
        if (!inputFileRef.current?.files) {
            toast.error("Veuillez sélectionner un fichier");
            return;
        }

        const file = inputFileRef.current.files[0];
        const formData = new FormData();
        formData.append("file", file);


        startTransition(() => {
            setEmployeeDecharge(employeeId, formData).then((res) => {
                console.log(res)
                if (res?.error) {
                    toast.error(res.error)
                } else {
                    toast.success("Décharge envoyée avec succès")
                }
            })
        })


    }
    return (
        <Card>

            <CardHeader>
                <CardTitle>Décharge</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    url ? (
                        <div className="flex items-center space-x-2">
                            Une décharge a déjà été envoyée
                        </div>
                    ) : (
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Décharge</Label>
                            <Input ref={inputFileRef} id="picture" type="file"/>
                        </div>
                    )
                }
            </CardContent>
            <CardFooter>
                {
                    url ? (
                        <Button variant="outline" size="sm">
                            <a href={url} target={"_blank"}
                               className="text-primary hover:underline">
                                Télécharger
                            </a>
                        </Button>
                    ) : (
                        <Button disabled={isPending} onClick={handleSubmit} type={"button"}>
                            {isPending ? <Icons.spinner/> : "Envoyer"}
                        </Button>
                    )
                }
            </CardFooter>

        </Card>
    );
}

export default UploadDecharge;