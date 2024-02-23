import React, {startTransition} from 'react';
import {getBrands} from "@/src/actions/brand";
import Brand from "@/app/(protected)/brand/brand";
import {BrandDataTable} from "@/components/brand-table/brand-data-table";
import {brandColumns} from "@/components/brand-table/brand-columns";


async function Page() {

    const brands = await getBrands()


    return (
        <div className="">
            <Brand/>
           <div className="p-5">
                <BrandDataTable columns={brandColumns} data={brands}/>
           </div>

        </div>
    );
}

export default Page;