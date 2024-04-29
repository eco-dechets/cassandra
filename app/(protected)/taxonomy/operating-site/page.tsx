import React from 'react';
import OperatingSite from "@/app/(protected)/taxonomy/operating-site/operating-site";
import {getOperatingSite} from "@/src/actions/operating-site";
import {OperatingSiteDataTable} from "@/components/operating-site-table/operating-site-data-table";
import {operatingColumns} from "@/components/operating-site-table/operating-columns";
import {Card} from "@/components/ui/card";


async function Page() {

    const operatingSites = await getOperatingSite()


    return (
        <Card>
            <OperatingSite/>
            <div className="p-5">
                <OperatingSiteDataTable columns={operatingColumns} data={operatingSites}/>
            </div>

        </Card>
    );
}

export default Page;