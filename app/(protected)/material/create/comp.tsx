import {getVendors} from '@/src/actions/vendor';
import React from 'react';
import {getBrands} from "@/src/actions/brand";
import {getMaterialCategory} from "@/src/actions/material-category";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {Textarea} from "@/components/ui/textarea";
import {createMaterial} from "@/src/actions/material";

async function Comp() {

    const brands = await getBrands()
    const categories = await getMaterialCategory()
    const vendors = await getVendors()

    const onSubmit = async (values: FormData) => {
        const payload = {
            commandDate: values.get("commandDate"),
            deliveryDate: values.get("deliveryDate"),
            inventoryNumber: values.get("inventoryNumber"),
            amountHT: values.get("amountHT"),
            amountTTC: values.get("amountTTC"),
            tva: values.get("tva"),
            commandNumber: values.get("commandNumber"),
            billNumber: values.get("billNumber"),
            serialNumber: values.get("serialNumber"),
            brandId: values.get("brandId"),
            categoryId: values.get("categoryId"),
            vendorId: values.get("vendorId"),
            nature: values.get("nature"),
        }

        createMaterial(payload as any).then((res) => {
            if (res?.success) {
                console.log(res.success)

            }

            if (res?.error) {
                console.log(res.error)
            }
        })

    }



    return (
        <div className="flex h-full flex-col max-w-7xl mx-auto pt-10">
            <form action={onSubmit} className="h-full">
                <div className="flex justify-between items-center">
                    <div className={"flex items-center gap-5"}>
                        <span className="text-3xl">Ajouter un materiel</span>
                    </div>
                    <Button type="submit">Créer le materiel</Button>
                </div>

                <div className="mx-auto  pt-10">
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl text-primary">Materiel</CardTitle>
                            <CardDescription>
                                Informations générales
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="pt-2 gap-6 grid grid-cols-3">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="commandDate">Date de commande</Label>
                                    <Input required type="date" name="commandDate"/>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="deliveryDate">Date de livraison</Label>
                                    <Input required type="date" name="deliveryDate"/>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="inventoryNumber">N° d&apos;inventaire</Label>
                                    <Input required type="text" name="inventoryNumber"/>
                                </div>
                            </div>
                            <div className="pt-10 gap-6 grid grid-cols-3">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="amountHT">Prix HT</Label>
                                    <Input required type="number" name="amountHT"/>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="amountTTC">Prix TTC</Label>
                                    <Input required type="number" name="amountTTC"/>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="tva">TVA</Label>
                                    <Input min={1} required type="number" name="tva"/>
                                </div>
                            </div>

                            <div className="pt-10 gap-6 grid grid-cols-3">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="commandNumber">N° de commande</Label>
                                    <Input required type="text" name="commandNumber"/>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="billNumber">N° de facture</Label>
                                    <Input required type="text" name="billNumber"/>
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="serialNumber">N° de série</Label>
                                    <Input required type="text" name="serialNumber"/>
                                </div>
                            </div>

                            <div className="pt-10 gap-6 grid grid-cols-3">
                                <div>
                                    <Label>Marque</Label>
                                    <Select required name={"brandId"}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Selectionner une marque"/>
                                        </SelectTrigger>

                                        <SelectContent>
                                            {brands?.map((brand: any) => (
                                                <SelectItem key={brand.id} value={brand.id.toString()}>
                                                    {brand.name}
                                                </SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Type de materiel</Label>
                                    <Select required name={"categoryId"}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Selectionner un type de materiel"/>
                                        </SelectTrigger>

                                        <SelectContent>
                                            {categories?.map((brand: any) => (
                                                <SelectItem key={brand.id} value={brand.id.toString()}>
                                                    {brand.name}
                                                </SelectItem>
                                            ))}

                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Fournisseur</Label>
                                    <Select required name={"vendorId"}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Selectionner un fournisseur"/>
                                        </SelectTrigger>

                                        <SelectContent>
                                            {vendors?.map((brand: any) => (
                                                <SelectItem key={brand.id} value={brand.id.toString()}>
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="pt-10">
                                <Label>Nature</Label>
                                <Select required name={"nature"}>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder="Selectioner l'etat"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NEW">Nouveau</SelectItem>
                                        <SelectItem value="OLD">Ancien</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Separator className={"my-5"}/>

                            <div>
                                <Label>Commentaire</Label>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    name={"comment"}
                                />
                            </div>


                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}

export default Comp;