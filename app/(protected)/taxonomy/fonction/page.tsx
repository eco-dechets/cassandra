import React from 'react';
import Fonction from "@/app/(protected)/taxonomy/fonction/fonction";
import {getFonctions} from "@/src/actions/fonction";
import {FonctionDataTable} from "@/components/fonction-table/fonction-data-table";
import {fonctionColumns} from "@/components/fonction-table/fonction-columns";
import {Card} from "@/components/ui/card";


async function Page() {

    const fonctions = await getFonctions()


    return (
        <Card>
            <Fonction/>
           <div className="p-5">
                <FonctionDataTable columns={fonctionColumns} data={fonctions}/>
           </div>

        </Card>
    );
}

export default Page;