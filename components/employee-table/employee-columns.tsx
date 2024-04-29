"use client"

import {ColumnDef} from "@tanstack/react-table"

import {DataTableRowActions} from "./data-table-row-actions"
import {Checkbox} from "@/components/ui/checkbox";
import {Badge} from "@/components/ui/badge";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/fr'
import {DataTableColumnHeader} from "@/components/data-table-column-header";
import * as z from "zod";
import {EmployeeSchema} from "@/src/schemas";
import {AlertDialog, AlertDialogTrigger} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import UploadDecharge from "@/components/upload-decharge";

dayjs.extend(LocalizedFormat)
dayjs.locale("fr")

export const employeeColumns: ColumnDef<z.infer<typeof EmployeeSchema>>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "email",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Email"/>
        ),
        cell: ({row}) => {
            return (
                <div>
                    <div className="font-bold"> {row.getValue("email") ?? "--"}</div>
                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "firstName",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Nom"/>
        ),
        cell: ({row}) => {
            return (
                <div>
                    <div className="font-bold"> {row.getValue("firstName") ?? "--"}</div>
                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "lastName",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Prénom"/>
        ),
        cell: ({row}) => {
            return (
                <div>
                    <div className="font-bold"> {row.getValue("lastName") ?? "--"}</div>
                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "phone",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Tel"/>
        ),
        cell: ({row}) => {
            return (
                <div>
                    <div className="font-bold"> {row.getValue("phone") ?? "--"}</div>
                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "fonction",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Fonction"/>
        ),
        cell: ({row}) => {
            const fonction: any = row.getValue("fonction")
            return (
                <div>
                    <Badge variant="outline">
                        <div className="font-bold"> {fonction.name ?? "--"}</div>
                    </Badge>

                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "site",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Site"/>
        ),
        cell: ({row}) => {
            const site: any = row.getValue("site")
            return (
                <div>
                    <div className="font-bold"> {site.name ?? "--"}</div>

                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "state",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Statut"/>
        ),
        cell: ({row}) => {

            const state: string = row.getValue("state")
            return (
                <Badge variant={state == "ACTIVE" ? "success" : "destructive"}>
                    <div className="font-bold text-xs"> {state ?? "--"}</div>
                </Badge>

            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "actions",
        cell: ({row}) => <DataTableRowActions row={row}/>,
    },
]