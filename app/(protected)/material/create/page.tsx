"use client"
import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getBrands} from "@/src/actions/brand";
import {getMaterialCategory} from '@/src/actions/material-category';
import {getVendors} from '@/src/actions/vendor';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {createMaterial} from "@/src/actions/material";
import {useForm} from "react-hook-form";
import {MaterialSchema} from "@/src/schemas";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {CalendarIcon, X} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import dayjs from "dayjs";
import {Calendar} from "@/components/ui/calendar";
import {toast} from "sonner";
import {redirect, useRouter} from "next/navigation";


function Page() {

    const [brands, setBrands] = useState<any>([])
    const [categories, setCategories] = useState<any>([])
    const [vendors, setVendors] = useState<any>([])

    const router = useRouter()

    useEffect(() => {
        getBrands().then((res) => {
            setBrands(res);
        })

        getMaterialCategory().then((res) => {
            setCategories(res);
        })

        getVendors().then((res) => {
            setVendors(res);
        })

    }, [])

    const form = useForm<z.infer<typeof MaterialSchema>>({
        resolver: zodResolver(MaterialSchema),
        defaultValues: {
        },
    })

    const onSubmit = async (values: z.infer<typeof MaterialSchema>) => {

        values.commandDate = dayjs(values.commandDate).format("YYYY-MM-DD")
        values.deliveryDate = dayjs(values.deliveryDate).format("YYYY-MM-DD")


        createMaterial(values).then((res) => {
            if (res?.success) {
                console.log(res.success)
                toast.success(res.success)
                router.push("/material")

            }

            if (res?.error) {
                console.log(res.error)
                toast.error(res.error)
            }
        })

    }
    return (
        <div className="flex h-full flex-col max-w-7xl mx-auto pt-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                    <div className="flex justify-between items-center">
                        <div className={"flex items-center gap-5"}>
                            <span className="text-3xl">Ajouter un materiel</span>
                        </div>
                        <Button type="submit">Créer le materiel</Button>
                    </div>

                    <div className="mx-auto pt-10">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl text-primary">Materiel</CardTitle>
                                <CardDescription>
                                    Informations générales
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-3">
                                    <FormField
                                        control={form.control}
                                        name="billNumber"
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>N° de facture</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="serialNumber"
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>N° de série</FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-3 pt-10">
                                    <FormField
                                        control={form.control}
                                        name="commandNumber"
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>N° de commande</FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={"inventoryNumber"}
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>N° d&apos;inventaire</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={"tva"}
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>TVA</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min={1} {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-3 pt-10">
                                    <FormField
                                        control={form.control}
                                        name="commandDate"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col w-full">
                                                <FormLabel>Date de commande</FormLabel>
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
                                    <FormField
                                        control={form.control}
                                        name="deliveryDate"
                                        render={({field}) => (
                                            <FormItem className="flex flex-col w-full">
                                                <FormLabel>Date de livraison</FormLabel>
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

                                <div className="pt-10 gap-6 grid grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name={"amountHT"}
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Prix HT</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min={1} {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={"amountTTC"}
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Prix TTC</FormLabel>
                                                <FormControl>
                                                    <Input type="number" min={1} {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>


                                <div className="pt-10 gap-6 grid grid-cols-2">

                                    <FormField
                                        control={form.control}
                                        name="brandId"
                                        render={({field}) => (
                                            <FormItem className={"w-full"}>
                                                <FormLabel>Marque</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Selectionner une marque"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {brands?.map((brand: any) => (
                                                            <SelectItem key={brand.id} value={brand.id.toString()}>
                                                                {brand.name}
                                                            </SelectItem>
                                                        ))}

                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Type de materiel</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Selectionner un type de materiel"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories?.map((materialType: any) => (
                                                            <SelectItem key={materialType.id}
                                                                        value={materialType.id.toString()}>
                                                                {materialType.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="pt-10 gap-6 grid grid-cols-2">

                                    <FormField
                                        control={form.control}
                                        name="nature"
                                        render={({field}) => (
                                            <FormItem className={"w-full"}>
                                                <FormLabel>Nature</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Selectioner l'etat"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="NEW">Nouveau</SelectItem>
                                                        <SelectItem value="OLD">Occasion</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="vendorId"
                                        render={({field}) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Fournisseur</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue
                                                                placeholder="Selctionner un founisseur"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {vendors?.map((vendor: any) => (
                                                            <SelectItem key={vendor.id} value={vendor.id.toString()}>
                                                                {vendor.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <Separator className={"my-5"}/>

                                <FormField
                                    control={form.control}
                                    name="comment"
                                    render={({field}) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Commentaire</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a little bit about yourself"
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default Page;