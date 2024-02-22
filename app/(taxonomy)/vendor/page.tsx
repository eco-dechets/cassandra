import React from 'react';
import Vendor from "@/app/(taxonomy)/vendor/vendor";
import {getVendors} from "@/src/actions/vendor";
import {VendorDataTable} from "@/components/vendor-table/vendor-data-table";
import {vendorColumns} from "@/components/vendor-table/vendor-columns";


async function Page() {

    const vendors = await getVendors()


    return (
        <div className="max-w-7xl mx-auto">
            <Vendor/>
            <VendorDataTable columns={vendorColumns} data={vendors}/>

        </div>
    );
}

export default Page;