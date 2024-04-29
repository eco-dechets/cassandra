import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getBrands} from "@/src/actions/brand";
import {getMaterialCategory} from "@/src/actions/material-category";
import {getVendors} from "@/src/actions/vendor";
import {getMaterial} from "@/src/actions/material";
import {MaterialDataTable} from "@/components/material-table/material-data-table";
import {materialColumns} from "@/components/material-table/material-columns";
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardHeader} from "@/components/ui/card";

async function Page() {

    const materials = await getMaterial()

    return (
        <Card className="mt-20">
            <CardHeader>
                <div className="flex items-center">
                    <h1 className="text-3xl">Materiel</h1>
                    <div className="ml-auto">
                        <Link href={"/material/create"}>
                            <Button variant="outline">Ajouter un materiel</Button>
                        </Link>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-5">
                <MaterialDataTable columns={materialColumns} data={materials as any}/>
            </CardContent>
        </Card>
    );
}

export default Page;