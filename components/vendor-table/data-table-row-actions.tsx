import {DotsHorizontalIcon} from "@radix-ui/react-icons"
import {Row} from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {deleteOperatingSite, updateOperatingSite} from "@/src/actions/operating-site";
import {deleteVendor, updateVendor} from "@/src/actions/vendor";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({row}: DataTableRowActionsProps<TData>) {


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
            <DropdownMenuContent align="end" className="w-[280px]">


                <span className="font-medium pl-2 text-xs text-gray-500">Edit</span>
                <form  action={async (formaData) => {
                    const id = row.getValue("id") as string
                    const name = formaData.get("name") as string
                    await updateVendor(id, name)
                }}>

                    <div className="py-2 px-2">
                        <Label htmlFor="name" className="text-right">
                            Nom
                        </Label>
                        <Input id="name" name="name" defaultValue={row.getValue("name")} className="col-span-3"/>
                    </div>
                    <div className="p-2 ">


                        <Button variant={"default"} className={"w-full"} type="submit">
                            Modifier
                        </Button>
                    </div>
                </form>
                <DropdownMenuSeparator/>


                <span className="font-medium pl-2 text-xs text-gray-600">Actions</span>


                <form action={async () => {
                    const id = row.getValue("id") as string
                    await deleteVendor(id)
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