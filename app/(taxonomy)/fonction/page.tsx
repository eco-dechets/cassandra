import React from 'react';
import Fonction from "@/app/(taxonomy)/fonction/fonction";
import {getFonctions} from "@/src/actions/fonction";
import {FonctionDataTable} from "@/components/fonction-table/fonction-data-table";
import {fonctionColumns} from "@/components/fonction-table/fonction-columns";


async function Page() {

    const fonctions = await getFonctions()


    return (
        <div className="max-w-7xl mx-auto">
            <Fonction/>
            <FonctionDataTable columns={fonctionColumns} data={fonctions}/>

        </div>
    );
}

export default Page;