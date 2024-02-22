import React from 'react';
import {UseFormReturn} from "react-hook-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import CustomSelect from "@/components/ui/custom-select";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Separator} from "@/components/ui/separator";
import {groupClouds, groupDistribution, licences, softwares} from "@/lib/data";


function AccessGranted({form}: { form: UseFormReturn<any> }) {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-2xl text-primary">Acces</CardTitle>
                <CardDescription>
                    Informations sur le matériel
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CustomSelect form={form} options={groupClouds} name={"groupCloud"} label={"Groupes cloud"}/>
                <CustomSelect form={form} options={groupDistribution} name={"groupDistribution"} label={"Groupes de distribution"}/>

                <CustomSelect form={form} options={softwares} name={"softwares"} label={"Logiciels installés sur le poste"}/>
                <CustomSelect form={form} options={licences} name={"licences"} label={"Type de licence"}/>

                <Separator className="my-2"/>

                <FormField
                    control={form.control}
                    name="accessComment"
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
            </CardContent>
        </Card>
    );
}

export default AccessGranted;