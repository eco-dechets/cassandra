"use client"

import {ColumnDef} from "@tanstack/react-table"

import {DataTableRowActions} from "./data-table-row-actions"
import {Checkbox} from "@/components/ui/checkbox";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/fr'
import {DataTableColumnHeader} from "@/components/data-table-column-header";
import {z} from "zod";
import {RegisterSchema} from "@/src/schemas";
dayjs.extend(LocalizedFormat)
dayjs.locale("fr")

export const userColumns: ColumnDef<z.infer<typeof RegisterSchema>>[] = [
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
         accessorKey: "id",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="ID"/>
        ),
        cell: ({row}) => {
            return (
                <div className="w-16">
                    <div className="font-bold truncate"> {row.getValue("id")?? "--"}</div>
                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Nom"/>
        ),
        cell: ({row}) => {
            return (
                <div className="w-36">
                    <div className="font-bold"> {row.getValue("name")?? "--"}</div>

                </div>
            )
        },
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
                <div className="w-36">
                    <div className="font-bold"> {row.getValue("email")?? "--"}</div>

                </div>
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