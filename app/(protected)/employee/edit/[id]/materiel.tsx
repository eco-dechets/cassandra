import React, {useEffect, useState} from 'react';
import {useFieldArray, UseFormReturn} from "react-hook-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Input} from "@/components/ui/input";
import {getMaterial} from "@/src/actions/material";

function Materiel({form, employeeId}: { form: UseFormReturn<any>, employeeId: string }) {

    const [open, setOpen] = React.useState(false)

    const [data, setData] = useState<any>([])

    const [searchType, setSearchType] = useState<string>('');

    useEffect(() => {
        getMaterial().then((res) => {
            setData(res)
        })
    }, []);

    const selectedMateriels = form.watch("materiels")
    const alphabeticalList = ({data}: any) => {
        // Trier les données par ordre alphabétique basé sur materiel.type.name
        const sortedData = data.sort((a: { category: { name: string; }; }, b: {
            category: { name: any; };
        }) => a.category.name.localeCompare(b.category.name));


        // Grouper les données par la première lettre de materiel.type.name
        /*const groupedData = sortedData.reduce((groups: { [x: string]: any[]; }, materiel: {
            type: { name: string[]; };
        }) => {
            const letter = materiel.type.name[0].toUpperCase();
            if (!groups[letter]) {
                groups[letter] = [];
            }
            groups[letter].push(materiel);
            return groups;
        }, {});*/

        // Filtrer les données en fonction de la valeur de recherche
        const filteredData = sortedData.filter((materiel: {
                category: { name: string },
                inventoryNumber: any,
                serialNumber: string
            }) =>
                materiel.category.name.toLowerCase().includes(searchType.toLowerCase()) || materiel?.inventoryNumber?.toLowerCase().includes(searchType.toLowerCase()) || materiel?.serialNumber?.toLowerCase().includes(searchType.toLowerCase())
        );

        const groupedData = filteredData.reduce((groups: { [x: string]: any[] }, materiel: {
            category: { name: string }
        }) => {
            const letter = materiel.category.name[0].toUpperCase();
            if (!groups[letter]) {
                groups[letter] = [];
            }
            groups[letter].push(materiel);
            return groups;
        }, {});


        return (
            <div className="p-2">
                <div className="pb-3">
                    <span className="text-xl">Liste des materiels</span>
                </div>
                <div>
                    <Input type="text" placeholder="Rechercher un materiel"
                           onChange={(e) => setSearchType(e.target.value)}/>
                </div>
                {Object.keys(groupedData).map((letter) => (
                    <div className="pt-2" key={letter}>
                        <h2 className="font-bold text-primary">{letter}</h2>
                        <Separator className={"my-2"}/>
                        {groupedData[letter].map((materiel: any) => (
                            <div key={materiel.id} className={"py-0.5"}>
                                <SelectItem className="cursor-pointer" value={materiel.id.toString()}>
                                    {materiel.category.name} - <Badge
                                    variant={"outline"}>{materiel.inventoryNumber ?? materiel.serialNumber}</Badge>
                                </SelectItem>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };


    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "materiels",
    })

    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-2xl text-primary">Matériel</CardTitle>
                <CardDescription>
                    Informations sur le matériel
                </CardDescription>
            </CardHeader>
            <Separator/>
            <ScrollArea className="h-[400px]">
                <CardContent className="pt-5">
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="flex gap-3 items-center">
                                <FormField
                                    control={form.control}
                                    name={`materiels.${index}` as const}
                                    render={({field}) => (
                                        <FormItem className={"w-full mb-4"}>
                                            <FormLabel>Materiel</FormLabel>
                                            <Select onValueChange={(e) => {
                                                field.onChange(e)
                                                console.log("event ", e)
                                            }}

                                                    defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder="Selectionner un materiel"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {alphabeticalList({data: data ?? []})}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <div className="pt-3.5">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size={"icon"}
                                        onClick={() => {
                                            const id = form.getValues("materiels")[index]
                                            //remove(index)
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </CardContent>
            </ScrollArea>
            <Separator className="mb-5"/>
            <CardFooter>
                <div className="w-full">
                    <div className="pb-5">
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({field}) => (
                                <FormItem>
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
                    </div>
                    <Button
                        variant="outline"
                        type={"button"}
                        className={"w-full"}
                        onClick={() => append({name: ""})}
                    >
                        Ajouter un matériel
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
        ;
}

export default Materiel;