import React from 'react';
import OperatingSite from "@/app/(protected)/operating-site/operating-site";
import {getOperatingSite} from "@/src/actions/operating-site";
import {OperatingSiteDataTable} from "@/components/operating-site-table/operating-site-data-table";
import {operatingColumns} from "@/components/operating-site-table/operating-columns";


async function Page() {

    const operatingSites = await getOperatingSite()


    return (
        <div >
            <OperatingSite/>
            <div className="p-5">
                <OperatingSiteDataTable columns={operatingColumns} data={operatingSites}/>
            </div>

        </div>
    );
}

export default Page;