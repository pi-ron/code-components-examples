"use client"

import * as React from "react";
import { useEffect, useRef } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCMSDataTableItems, CMSDataItem } from "./useCMSDataTableItems";

export interface CMSDataTableProps {
  cmsCollectionSlot: React.ReactNode;
  showCMSCollection: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
  col1Header?: string;
  col2Header?: string;
  col3Header?: string;
  col4Header?: string;
}

const CMSDataTable = (props: CMSDataTableProps) => {
  const {
    cmsCollectionSlot,
    showCMSCollection,
    enableSorting = true,
    enableFiltering = true,
    enablePagination = true,
    enableColumnVisibility = true,
    searchPlaceholder = "Filter...",
    searchColumn = "col1",
    col1Header = "Column 1",
    col2Header = "Column 2",
    col3Header = "Column 3",
    col4Header = "Column 4",
  } = props;

  // Reference to parent div
  const parentRef = useRef<HTMLDivElement>(null);

  // Extract CMS collection items from Webflow slot
  const { cmsCollectionSlotRef, items } = useCMSDataTableItems("cmsCollectionSlot");

  // Table state
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // Dynamic columns based on headers
  const columns: ColumnDef<CMSDataItem>[] = React.useMemo(() => [
    {
      accessorKey: "col1",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {col1Header}
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("col1")}</div>,
    },
    {
      accessorKey: "col2",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {col2Header}
        </Button>
      ),
    },
    {
      accessorKey: "col3",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {col3Header}
        </Button>
      ),
    },
    {
      accessorKey: "col4",
      header: () => <div className="text-right">{col4Header}</div>,
      cell: ({ row }) => <div className="text-right">{row.getValue("col4")}</div>,
    },
  ], [col1Header, col2Header, col3Header, col4Header]);

  const table = useReactTable({
    data: items,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // Inject dropdown styles for portaled content (renders outside Shadow DOM)
  useEffect(() => {
    const styleId = "cms-data-table-dropdown-styles";
    
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      /* Dropdown menu styles for portaled content */
      [data-slot="dropdown-menu-content"] {
        background-color: #ffffff;
        color: #0a0a0a;
        border: 1px solid #e5e5e5;
        border-radius: 0.375rem;
        padding: 0.25rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        z-index: 50;
        min-width: 8rem;
        overflow: hidden;
        font-family: system-ui, -apple-system, sans-serif;
      }
      
      [data-slot="dropdown-menu-item"],
      [data-slot="dropdown-menu-checkbox-item"] {
        position: relative;
        display: flex;
        cursor: default;
        user-select: none;
        align-items: center;
        gap: 0.5rem;
        outline: none;
        transition: background-color 0.15s ease-in-out;
        padding: 0.375rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        border-radius: 0.125rem;
      }
      
      [data-slot="dropdown-menu-checkbox-item"] {
        padding-left: 2rem;
      }
      
      [data-slot="dropdown-menu-item"]:hover,
      [data-slot="dropdown-menu-item"]:focus,
      [data-slot="dropdown-menu-checkbox-item"]:hover,
      [data-slot="dropdown-menu-checkbox-item"]:focus {
        background-color: #f5f5f5;
        color: #0a0a0a;
      }
      
      [data-slot="dropdown-menu-checkbox-item"] > span:first-child {
        position: absolute;
        left: 0.5rem;
        display: flex;
        width: 0.875rem;
        height: 0.875rem;
        align-items: center;
        justify-content: center;
      }
      
      [data-slot="dropdown-menu-checkbox-item"] svg {
        width: 1rem;
        height: 1rem;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div ref={parentRef}>
      {/* Hidden container for CMS collection slot */}
      <div
        ref={cmsCollectionSlotRef}
        style={{ display: showCMSCollection ? "block" : "none" }}
      >
        {cmsCollectionSlot}
      </div>

      {/* DataTable */}
      <div className="space-y-4">
        {enableFiltering && (
          <div className="flex items-center space-x-2">
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                table.getColumn(searchColumn)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            {enableColumnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value: boolean) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {items.length === 0 
                      ? "No CMS items found. Add a CMS Collection List to the slot."
                      : "No results."
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {enablePagination && items.length > 0 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CMSDataTable;
