import React, {startTransition} from 'react';
import Material from "@/app/(protected)/taxonomy/material-category/material";
import {MaterialCategoryDataTable} from "@/components/material-category-table/material-category-data-table";
import {getMaterialCategory} from "@/src/actions/material-category";
import {materialCategoryColumns} from "@/components/material-category-table/material-category-columns";
import {Card} from "@/components/ui/card";


async function Page() {

    const materialsCategory = await getMaterialCategory()


    return (
        <Card>
            <Material/>
            <div className="p-5">
                <MaterialCategoryDataTable columns={materialCategoryColumns} data={materialsCategory}/>
            </div>

        </Card>
    );
}

export default Page;