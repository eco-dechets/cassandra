import React from 'react';
import {getBrands} from "@/src/actions/brand";
import Brand from "@/app/(protected)/taxonomy/brand/brand";
import {BrandDataTable} from "@/components/brand-table/brand-data-table";
import {brandColumns} from "@/components/brand-table/brand-columns";
import {Card} from "@/components/ui/card";


async function Page() {

    const brands = await getBrands()


    return (
        <Card>
            <Brand/>
            <div className="p-5">
                <BrandDataTable columns={brandColumns} data={brands}/>
            </div>

        </Card>
    );
}

export default Page;