import React from 'react';
import OperatingSite from "@/app/(taxonomy)/operating-site/operating-site";
import {getOperatingSite} from "@/src/actions/operating-site";
import {OperatingSiteDataTable} from "@/components/operating-site-table/operating-site-data-table";
import {operatingColumns} from "@/components/operating-site-table/operating-columns";


async function Page() {

    const operatingSites = await getOperatingSite()


    return (
        <div className="max-w-7xl mx-auto">
            <OperatingSite/>
            <OperatingSiteDataTable columns={operatingColumns} data={operatingSites}/>

        </div>
    );
}

export default Page;