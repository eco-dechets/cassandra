"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"


import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {DataTableFacetedFilter} from "@/components/data-table-faceted-filter";
import {states} from "@/lib/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function ProductDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("firstName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("state") && (
          <DataTableFacetedFilter
            column={table.getColumn("state")}
            title="Status"
            options={states}
          />
        )}
        {/*
        {table.getColumn("payout_status") && (
          <DataTableFacetedFilter
            column={table.getColumn("payout_status")}
            title="Payout"
            options={payouts}
          />
        )}*/}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/*<DataTableViewOptions table={table} />*/}
    </div>
  )
}