import React from 'react';
import Vendor from "@/app/(protected)/vendor/vendor";
import {getVendors} from "@/src/actions/vendor";
import {VendorDataTable} from "@/components/vendor-table/vendor-data-table";
import {vendorColumns} from "@/components/vendor-table/vendor-columns";


async function Page() {

    const vendors = await getVendors()


    return (
        <div>
            <Vendor/>
            <div className="p-5">
                <VendorDataTable columns={vendorColumns} data={vendors}/>
            </div>

        </div>
    );
}

export default Page;