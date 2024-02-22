import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getBrands} from "@/src/actions/brand";
import {getMaterialCategory} from "@/src/actions/material-category";
import {getVendors} from "@/src/actions/vendor";
import {getMaterial} from "@/src/actions/material";
import {MaterialDataTable} from "@/components/material-table/material-data-table";
import {materialColumns} from "@/components/material-table/material-columns";

async function Page() {

    const materials = await getMaterial()

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center py-10">
                <h1 className="text-3xl">Materiel</h1>
                <div className="ml-auto">
                    <Link href={"/material/create"}>
                        <Button variant="outline">Ajouter un materiel</Button>
                    </Link>
                </div>
            </div>
            <MaterialDataTable columns={materialColumns} data={materials as any}/>
        </div>
    );
}

export default Page;