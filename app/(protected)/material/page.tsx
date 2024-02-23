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

async function Page() {

    const materials = await getMaterial()

    return (
        <div>
            <div className="flex items-center py-4 px-5">
                <h1 className="text-3xl">Materiel</h1>
                <div className="ml-auto">
                    <Link href={"/material/create"}>
                        <Button variant="outline">Ajouter un materiel</Button>
                    </Link>
                </div>
            </div>
            <Separator/>
            <div className="p-5">
                <MaterialDataTable columns={materialColumns} data={materials as any}/>
            </div>
        </div>
    );
}

export default Page;