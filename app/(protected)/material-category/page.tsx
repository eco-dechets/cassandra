import React, {startTransition} from 'react';
import Material from "@/app/(protected)/material-category/material";
import {MaterialCategoryDataTable} from "@/components/material-category-table/material-category-data-table";
import {getMaterialCategory} from "@/src/actions/material-category";
import {materialCategoryColumns} from "@/components/material-category-table/material-category-columns";


async function Page() {

    const materialsCategory = await getMaterialCategory()


    return (
        <div>
            <Material/>
            <div className="p-5">
                <MaterialCategoryDataTable columns={materialCategoryColumns} data={materialsCategory}/>
            </div>

        </div>
    );
}

export default Page;