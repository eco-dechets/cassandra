import React from 'react';
import Fonction from "@/app/(protected)/fonction/fonction";
import {getFonctions} from "@/src/actions/fonction";
import {FonctionDataTable} from "@/components/fonction-table/fonction-data-table";
import {fonctionColumns} from "@/components/fonction-table/fonction-columns";


async function Page() {

    const fonctions = await getFonctions()


    return (
        <div>
            <Fonction/>
           <div className="p-5">
                <FonctionDataTable columns={fonctionColumns} data={fonctions}/>
           </div>

        </div>
    );
}

export default Page;