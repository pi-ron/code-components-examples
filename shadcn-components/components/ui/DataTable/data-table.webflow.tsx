import { DataTableWrapper } from "./data-table-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../../app/globals.css";

export default declareComponent(DataTableWrapper, {
  name: "Data Table",
  description: "A powerful data table with sorting, filtering, pagination, and row selection built using TanStack Table",
  group: "Data Display",
  props: {
    enableSorting: props.Visibility({
      name: "Enable Sorting",
      defaultValue: true,
    }),
    enableFiltering: props.Visibility({
      name: "Enable Filtering",
      defaultValue: true,
    }),
    enablePagination: props.Visibility({
      name: "Enable Pagination",
      defaultValue: true,
    }),
    enableColumnVisibility: props.Visibility({
      name: "Enable Column Visibility",
      defaultValue: true,
    }),
    enableRowSelection: props.Visibility({
      name: "Enable Row Selection",
      defaultValue: true,
    }),
    searchPlaceholder: props.Text({
      name: "Search Placeholder",
      defaultValue: "Filter emails...",
    }),
    searchColumn: props.Text({
      name: "Search Column",
      defaultValue: "email",
    }),
  },
});
