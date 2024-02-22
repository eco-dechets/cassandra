"use client"

import {ColumnDef} from "@tanstack/react-table"

import {DataTableRowActions} from "./data-table-row-actions"
import {Checkbox} from "@/components/ui/checkbox";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/fr'
import {DataTableColumnHeader} from "@/components/data-table-column-header";
dayjs.extend(LocalizedFormat)
dayjs.locale("fr")

export const fonctionColumns: ColumnDef<any>[] = [
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
                <div className="w-24">
                    <div className="font-bold"> {row.getValue("id")?? "--"}</div>
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
                <div className="w-48">
                    <div className="font-bold"> {row.getValue("name")?? "--"}</div>

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