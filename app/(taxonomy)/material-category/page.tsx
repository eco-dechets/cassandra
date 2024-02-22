import React, {startTransition} from 'react';
import Material from "@/app/(taxonomy)/material-category/material";
import {MaterialCategoryDataTable} from "@/components/material-category-table/material-category-data-table";
import {getMaterialCategory} from "@/src/actions/material-category";
import {materialCategoryColumns} from "@/components/material-category-table/material-category-columns";


async function Page() {

    const materialsCategory = await getMaterialCategory()


    return (
        <div className="max-w-7xl mx-auto">
            <Material/>
            <MaterialCategoryDataTable columns={materialCategoryColumns} data={materialsCategory}/>

        </div>
    );
}

export default Page;