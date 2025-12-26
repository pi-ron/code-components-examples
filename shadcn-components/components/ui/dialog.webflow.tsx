import { DialogWrapper } from "./dialog-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(DialogWrapper, {
  name: "Dialog",
  description: "A dialog component with trigger button",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    triggerLabel: props.Text({
      name: "Trigger Label",
      group: "Trigger",
      defaultValue: "Open Dialog",
    }),
    triggerVariant: props.Variant({
      name: "Trigger Style",
      group: "Trigger",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      defaultValue: "outline",
    }),
    title: props.Text({
      name: "Title",
      group: "Content",
      defaultValue: "Dialog Title",
    }),
    description: props.Text({
      name: "Description",
      group: "Content",
      defaultValue: "",
    }),
    dialogContent: props.Slot({
      name: "Dialog Content",
      group: "Content",
    }),
    defaultOpen: props.Boolean({
      name: "Default Open",
      group: "Settings",
      defaultValue: false,
    })
  },
});
