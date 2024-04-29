import React from 'react';
import Vendor from "@/app/(protected)/taxonomy/vendor/vendor";
import {getVendors} from "@/src/actions/vendor";
import {VendorDataTable} from "@/components/vendor-table/vendor-data-table";
import {vendorColumns} from "@/components/vendor-table/vendor-columns";
import {Card} from "@/components/ui/card";


async function Page() {

    const vendors = await getVendors()


    return (
        <Card>
            <Vendor/>
            <div className="p-5">
                <VendorDataTable columns={vendorColumns} data={vendors}/>
            </div>

        </Card>
    );
}

export default Page;