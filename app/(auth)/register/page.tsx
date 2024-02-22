"use client"
import * as z from "zod";
import React, {useState, useTransition} from 'react';
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import AutoForm from "@/components/ui/auto-form";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Icons} from "@/components/icons";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {RegisterSchema} from "@/src/schemas";
import {register} from "@/src/actions/register";
import {toast} from "sonner";


function Page() {

    const [isError, setIsError] = useState<boolean>(false)
    const router = useRouter()

    const [isPending, startTransition] = useTransition()

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setIsError(false)
        startTransition(() => {
            register(values).then((res) => {
                if (res?.error) {
                    toast.error(res.error)
                }

                if (res.success) {
                    toast.success(res.success)
                }
            })
        })
    }

    return (
        <div className={cn("mt-20 ")}>
            <div className="lg:p-8">
                <div className="mx-auto flex w-1/3 flex-col justify-center space-y-6 ">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col space-y-2">
                                <h1 className="text-2xl font-semibold tracking-tight">
                                    Login to your account
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Keep abreast of developments in your professional world
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent>
                            {isError && (
                                <div className={"pb-5"}>
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4"/>
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            Invalid credential. Please log in again.
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}

                            <AutoForm formSchema={RegisterSchema}
                                      onSubmit={onSubmit}
                                      fieldConfig={{
                                          password: {
                                              inputProps: {
                                                  type: "password",
                                              }
                                          }
                                      }}
                            >


                                <div>
                                    <Button className="w-full" disabled={isPending}>
                                        {isPending ? (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                        ) : (<span>Creer mon compte</span>)}

                                    </Button>
                                </div>

                            </AutoForm>
                        </CardContent>
                        <CardFooter>
                            <p className="text-gray-500 text-sm">
                                By submitting this form, you agree to our{" "}
                                <a href="#" className="text-primary underline">
                                    terms and conditions
                                </a>
                                .
                            </p>
                        </CardFooter>
                    </Card>
                </div>

            </div>


        </div>
    );
}

export default Page;