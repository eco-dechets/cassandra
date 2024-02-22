"use client";
import React, {useEffect, useState} from 'react';
import * as z from "zod";
import {MaterialSchema} from "@/src/schemas";
import {getMaterialBySerialNumber, updateMaterial} from "@/src/actions/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {getBrands} from "@/src/actions/brand";
import {getMaterialCategory} from "@/src/actions/material-category";
import {getVendors} from "@/src/actions/vendor";

function Page({params}: { params: { id: string } }) {

    const [material, setMaterial] = useState<z.infer<typeof MaterialSchema>>()
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

    useEffect(() => {
        getMaterialBySerialNumber(params.id).then((data) => {
            setMaterial(data as any)
        })
    }, [params.id, material]);

    const form = useForm<z.infer<typeof MaterialSchema>>({
        resolver: zodResolver(MaterialSchema),
        values :{
            deliveryDate: material?.deliveryDate,
            tva: material?.tva.toString() as string,
            amountHT: material?.amountHT.toString() as string,
            amountTTC: material?.amountTTC.toString() as string,
            brandId: material?.brandId as string,
            categoryId: material?.categoryId as string,
            commandDate: material?.commandDate as string,
            commandNumber: material?.commandNumber as string,
            comment: material?.comment ?? "",
            inventoryNumber: material?.inventoryNumber as string,
            nature: material?.nature as string,
            serialNumber: material?.serialNumber as string,
            vendorId: material?.vendorId as string,
            billNumber: material?.billNumber as string
        }
    })


    const onSubmit = async (values: z.infer<typeof MaterialSchema>) => {

        values.commandDate = dayjs(values.commandDate).format("YYYY-MM-DD")
        values.deliveryDate = dayjs(values.deliveryDate).format("YYYY-MM-DD")


        updateMaterial(material?.id as string, values).then((res) => {
            if (res?.success) {
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
                            <span className="text-3xl">Modifier un materiel</span>
                        </div>
                        <Button type="submit">Modifier le materiel</Button>
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
                                                <Select onValueChange={field.onChange} value={field.value}>
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
                                                <Select onValueChange={field.onChange} value={field.value}>
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
                                                <Select onValueChange={field.onChange} value={field.value} >
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
                                                <Select onValueChange={field.onChange} value={field.value}>
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