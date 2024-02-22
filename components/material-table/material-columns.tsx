"use client"

import {ColumnDef} from "@tanstack/react-table"

import {DataTableRowActions} from "./data-table-row-actions"
import {Checkbox} from "@/components/ui/checkbox";
import {Badge} from "@/components/ui/badge";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import 'dayjs/locale/fr'
import {DataTableColumnHeader} from "@/components/data-table-column-header";
import {numberFormat} from "@/lib/utils";
import {MaterialSchema} from "@/src/schemas";
import { z } from "zod"
import {materialStates, natures} from "@/lib/data";
dayjs.extend(LocalizedFormat)
dayjs.locale("fr")

export const materialColumns: ColumnDef<z.infer<typeof MaterialSchema>>[] = [
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
        accessorKey: "category",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Type"/>
        ),
        cell: ({row}) => {
            const type: any = row.getValue("category")
            return (
                <div>
                    <div className="font-bold"> {type.name ?? "--"}</div>

                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "brand",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Marque"/>
        ),
        cell: ({row}) => {
            const brand: any = row.getValue("brand")
            return (
                <div>
                    <div className="font-bold"> {brand.name ?? "--"}</div>

                </div>
            )
        },
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "commandDate",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Date de commande"/>
        ),
        cell: ({row}) => {
            return (
                <div className="font-bold"> {dayjs(row.getValue("commandDate")).format("DD/MM/YYYY") ?? "--"}</div>

            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "serialNumber",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="N° de série"/>
        ),
        cell: ({row}) => {
            return (
                <div className="font-bold"> {row.getValue("serialNumber") ?? "--"}</div>

            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "commandNumber",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="N° de commande"/>
        ),
        cell: ({row}) => {
            return (
                <div className="font-bold"> {row.getValue("commandNumber") ?? "--"}</div>

            )
        },
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "billNumber",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="N° de facture"/>
        ),
        cell: ({row}) => {
            return (
                <div className="font-bold"> {row.getValue("billNumber") ?? "--"}</div>

            )
        },
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "amountHT",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Montant HT"/>
        ),
        cell: ({row}) => {
            return (
                <div className="font-bold"> {numberFormat(row.getValue("amountHT")) ?? "--"}</div>

            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "amountTTC",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Montant TTC"/>
        ),
        cell: ({row}) => {
            return (
                <div className="font-bold"> {numberFormat(row.getValue("amountTTC")) ?? "--"}</div>

            )
        },
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "tva",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="TVA"/>
        ),
        cell: ({row}) => {
            return (
                <div className="font-bold"> {row.getValue("tva") ?? "--"}%</div>

            )
        },
        enableSorting: false,
        enableHiding: false,
    },


    {
        accessorKey: "nature",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Nature"/>
        ),
        cell: ({row}) => {

            const nature = natures.find(
                (status: any) => status.value === row.getValue("nature")
            )

            if (!nature) {
                return null
            }

            return (
                <Badge variant="outline">
                    <span className="font-bold"> {nature.label}</span>
                </Badge>

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

            const state = materialStates.find(
                (status: any) => status.value === row.getValue("state")
            )
            return (
                <Badge variant={state?.value == "AVAILABLE" ? "success" : "destructive"}>
                    <div className="font-bold"> {state?.label ?? "--"}</div>
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