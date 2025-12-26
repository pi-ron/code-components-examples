"use client"

import { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

// Sample data for demonstration
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
];

interface DataTableWrapperProps {
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableRowSelection?: boolean;
  searchPlaceholder?: string;
  searchColumn?: string;
}

export function DataTableWrapper({
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableColumnVisibility = true,
  enableRowSelection = true,
  searchPlaceholder = "Filter emails...",
  searchColumn = "email",
}: DataTableWrapperProps) {
  // Inject dropdown styles for portaled content (renders outside Shadow DOM)
  useEffect(() => {
    const styleId = "data-table-dropdown-styles";
    
    // Check if styles already exist
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    // Use hardcoded colors since CSS variables won't exist outside Shadow DOM
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
      
      [data-slot="dropdown-menu-item"][data-disabled],
      [data-slot="dropdown-menu-checkbox-item"][data-disabled] {
        pointer-events: none;
        opacity: 0.5;
      }
      
      [data-slot="dropdown-menu-separator"] {
        height: 1px;
        background-color: #e5e5e5;
        margin: 0.25rem -0.25rem;
      }
      
      [data-slot="dropdown-menu-label"] {
        padding: 0.375rem 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
      }
      
      /* Checkbox indicator styles */
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
    
    // Cleanup on unmount
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <DataTable 
      columns={columns}
      data={sampleData}
      enableSorting={enableSorting}
      enableFiltering={enableFiltering}
      enablePagination={enablePagination}
      enableColumnVisibility={enableColumnVisibility}
      enableRowSelection={enableRowSelection}
      searchPlaceholder={searchPlaceholder}
      searchColumn={searchColumn}
    />
  );
}
