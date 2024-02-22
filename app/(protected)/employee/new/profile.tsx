"use client"

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import dayjs from "dayjs";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UseFormReturn} from "react-hook-form";
import {getFonctions} from "@/src/actions/fonction";
import {getOperatingSite} from "@/src/actions/operating-site";

function Profile({form}: { form: UseFormReturn<any> }) {


    const [fonctions, setFonctions] = useState<any>([])
    const [operatingSites, setOperatingSites] = useState<any>([])

    useEffect(() => {
        getFonctions().then((res) => {
            setFonctions(res)
        })
        getOperatingSite().then((res) => {
            setOperatingSites(res)
        })
    }, []);

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-2xl text-primary">Profil</CardTitle>
                <CardDescription>
                    Informations générales sur l&apos;employé.e
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-3 pt-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Numéro de téléphone</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-3 pt-5">
                    <FormField
                        control={form.control}
                        name="enteredAt"
                        render={({field}) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>Date d&apos;entrée</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    dayjs(field.value).format("DD/MM/YYYY")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="pt-5 gap-6 flex w-full">


                    <FormField
                        control={form.control}
                        name="siteId"
                        render={({field}) => (
                            <FormItem className={"w-full"}>
                                <FormLabel>Site d&apos;affectation</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Selectionner un site"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {operatingSites?.map((operatingSite: any) => (
                                            <SelectItem key={operatingSite.id}
                                                        value={operatingSite.id.toString()}>{operatingSite.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fonctionId"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Fonction</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Selectionner une fonction"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {fonctions?.map((fonction: any) => (
                                            <SelectItem key={fonction.id}
                                                        value={fonction.id.toString()}>{fonction.name}</SelectItem>
                                        ))}

                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                </div>
            </CardContent>
        </Card>
    );
}

export default Profile;