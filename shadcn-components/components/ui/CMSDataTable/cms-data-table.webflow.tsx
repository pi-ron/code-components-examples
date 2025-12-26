import CMSDataTable from "./CMSDataTable";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../../app/globals.css";

export default declareComponent(CMSDataTable, {
  name: "CMS Data Table",
  description: "A full-featured DataTable that displays items from a Webflow CMS Collection List with sorting, filtering, and pagination",
  group: "Data Display",
  options: {
    ssr: false,
  },
  props: {
    cmsCollectionSlot: props.Slot({
      name: "CMS Collection Slot",
      group: "Content",
      tooltip: "Add a Webflow CMS Collection List component here",
    }),
    showCMSCollection: props.Boolean({
      name: "Show CMS Collection",
      group: "Visibility",
      tooltip: "Toggle to show the CMS collection for editing in the designer",
      defaultValue: false,
    }),
    enableSorting: props.Boolean({
      name: "Enable Sorting",
      group: "Features",
      tooltip: "Allow sorting by clicking column headers",
      defaultValue: true,
    }),
    enableFiltering: props.Boolean({
      name: "Enable Filtering",
      group: "Features",
      tooltip: "Show search input for filtering data",
      defaultValue: true,
    }),
    enablePagination: props.Boolean({
      name: "Enable Pagination",
      group: "Features",
      tooltip: "Show pagination controls",
      defaultValue: true,
    }),
    enableColumnVisibility: props.Boolean({
      name: "Enable Column Visibility",
      group: "Features",
      tooltip: "Show column visibility toggle dropdown",
      defaultValue: true,
    }),
    searchPlaceholder: props.Text({
      name: "Search Placeholder",
      group: "Content",
      defaultValue: "Filter...",
    }),
    searchColumn: props.Text({
      name: "Search Column",
      group: "Content",
      tooltip: "Column key to filter on (col1, col2, col3, or col4)",
      defaultValue: "col1",
    }),
    col1Header: props.Text({
      name: "Column 1 Header",
      group: "Headers",
      defaultValue: "Column 1",
    }),
    col2Header: props.Text({
      name: "Column 2 Header",
      group: "Headers",
      defaultValue: "Column 2",
    }),
    col3Header: props.Text({
      name: "Column 3 Header",
      group: "Headers",
      defaultValue: "Column 3",
    }),
    col4Header: props.Text({
      name: "Column 4 Header",
      group: "Headers",
      defaultValue: "Column 4",
    }),
  },
});
