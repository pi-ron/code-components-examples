import CMSTable from "./CMSTable";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../../app/globals.css";

export default declareComponent(CMSTable, {
  name: "CMS Table",
  description: "A table component that displays items from a Webflow CMS Collection List",
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
    caption: props.Text({
      name: "Caption",
      group: "Content",
      defaultValue: "CMS Collection Items",
    }),
    showCaption: props.Boolean({
      name: "Show Caption",
      group: "Visibility",
      defaultValue: true,
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
