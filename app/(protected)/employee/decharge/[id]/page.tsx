
import GenerateDecharge from "@/app/(protected)/employee/decharge/generate-decharge";
import {auth} from "@/auth";
import {format} from "@formkit/tempo";

const date = new Date()


async function Page({params}: { params: { id: string } }) {

    const session = await auth()

    console.log(session)

    return (

            <GenerateDecharge id={params.id} name={session?.user.name as string} />


    );
}

export default Page;