"use client"

import {DotsHorizontalIcon} from "@radix-ui/react-icons"
import {Row} from "@tanstack/react-table"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuRadioGroup,
    DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {deleteMaterial} from "@/src/actions/material";
import {useRouter} from "next/navigation";


interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({
                                               row,
                                           }: DataTableRowActionsProps<TData>) {

    const router = useRouter()


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4"/>
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
                <span className="font-medium pl-2 text-xs text-gray-600">Actions</span>
                <DropdownMenuItem className="cursor-pointer" onClick={() => {

                }}>
                    <span className="text-indigo-600 font-medium">Copy Reference</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <span className="font-medium pl-2 text-xs text-gray-500">Connections</span>


                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    const serialNumber = row.getValue("serialNumber") as string
                    router.push(`/material/edit/${serialNumber}`)

                }}>Edit</DropdownMenuItem>
                <form action={async () => {
                    const id = row.getValue("serialNumber") as string
                    await deleteMaterial(id)
                }}>

                    <button className={"w-full"} type="submit">
                        <DropdownMenuItem className="cursor-pointer">
                            <span className="text-red-600 font-medium">Supprimer</span>
                        </DropdownMenuItem>
                    </button>
                </form>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}