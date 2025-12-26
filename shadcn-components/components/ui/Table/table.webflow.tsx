import { TableWrapper } from "./table-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../../app/globals.css";

export default declareComponent(TableWrapper, {
  name: "Table",
  description: "A responsive table component with sample invoice data",
  group: "Data Display",
  props: {
    caption: props.Text({
      name: "Caption",
      defaultValue: "A list of your recent invoices.",
      group: "Content",
    }),
    showCaption: props.Visibility({
      name: "Show Caption",
      defaultValue: true,
      group: "Content",
    }),
    col1Header: props.Text({
      name: "Column 1 Header",
      defaultValue: "Invoice",
      group: "Headers",
    }),
    col2Header: props.Text({
      name: "Column 2 Header",
      defaultValue: "Status",
      group: "Headers",
    }),
    col3Header: props.Text({
      name: "Column 3 Header",
      defaultValue: "Method",
      group: "Headers",
    }),
    col4Header: props.Text({
      name: "Column 4 Header",
      defaultValue: "Amount",
      group: "Headers",
    }),
  },
});
