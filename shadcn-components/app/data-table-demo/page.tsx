"use client"

import { DataTable } from "@/components/ui/DataTable/data-table"
import { columns, Payment } from "@/components/ui/DataTable/columns"

const sampleData: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "7d3ed568",
    amount: 250,
    status: "success",
    email: "john.doe@example.com",
  },
  {
    id: "8a2f4b1c",
    amount: 75,
    status: "failed",
    email: "jane.smith@example.com",
  },
  {
    id: "9c3e6d2f",
    amount: 300,
    status: "success",
    email: "bob.wilson@example.com",
  },
  {
    id: "1a4b5c6d",
    amount: 180,
    status: "pending",
    email: "alice.johnson@example.com",
  },
  {
    id: "2b5c6d7e",
    amount: 220,
    status: "processing",
    email: "charlie.brown@example.com",
  },
  {
    id: "3c6d7e8f",
    amount: 95,
    status: "success",
    email: "diana.prince@example.com",
  },
  {
    id: "4d7e8f9a",
    amount: 340,
    status: "failed",
    email: "edward.norton@example.com",
  },
  {
    id: "5e8f9a0b",
    amount: 155,
    status: "pending",
    email: "fiona.apple@example.com",
  },
]

export default function DataTableDemo() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Data Table Demo</h1>
          <p className="text-muted-foreground">
            A powerful data table with sorting, filtering, pagination, and row selection.
          </p>
        </div>
        
        <DataTable 
          columns={columns} 
          data={sampleData}
          enableSorting={true}
          enableFiltering={true}
          enablePagination={true}
          enableColumnVisibility={true}
          enableRowSelection={true}
          searchPlaceholder="Filter emails..."
          searchColumn="email"
        />
      </div>
    </div>
  )
}
