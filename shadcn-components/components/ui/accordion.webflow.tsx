import { AccordionWrapper } from "./accordion-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(AccordionWrapper, {
  name: "Accordion",
  description: "A accordion component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    item1Label: props.Text({
      name: "Item 1 Label",
      group: "Item Labels",
      defaultValue: "Section 1",
    }),
    item2Label: props.Text({
      name: "Item 2 Label",
      group: "Item Labels",
      defaultValue: "Section 2",
    }),
    item3Label: props.Text({
      name: "Item 3 Label",
      group: "Item Labels",
      defaultValue: "Section 3",
    }),
    item1Content: props.Slot({
      name: "Item 1 Content",
      group: "Item Content",
    }),
    item2Content: props.Slot({
      name: "Item 2 Content",
      group: "Item Content",
    }),
    item3Content: props.Slot({
      name: "Item 3 Content",
      group: "Item Content",
    }),
    showItem3: props.Boolean({
      name: "Show Item 3",
      group: "Settings",
      defaultValue: false,
    }),
    defaultOpen: props.Boolean({
      name: "Default Open",
      group: "Settings",
      defaultValue: false,
    })
  },
});
