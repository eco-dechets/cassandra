import React, {startTransition} from 'react';
import {getBrands} from "@/src/actions/brand";
import Brand from "@/app/(taxonomy)/brand/brand";
import {BrandDataTable} from "@/components/brand-table/brand-data-table";
import {brandColumns} from "@/components/brand-table/brand-columns";


async function Page() {

    const brands = await getBrands()


    return (
        <div className="max-w-7xl mx-auto">
            <Brand/>
            <BrandDataTable columns={brandColumns} data={brands}/>

        </div>
    );
}

export default Page;