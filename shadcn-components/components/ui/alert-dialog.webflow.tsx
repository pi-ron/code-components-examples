import { AlertDialogWrapper } from "./alert-dialog-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(AlertDialogWrapper, {
  name: "Alert Dialog",
  description: "A modal dialog that interrupts the user with important content and expects a response",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    triggerLabel: props.Text({
      name: "Trigger Label",
      group: "Trigger",
      defaultValue: "Open Alert",
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
      defaultValue: "Are you absolutely sure?",
    }),
    description: props.Text({
      name: "Description",
      group: "Content",
      defaultValue: "This action cannot be undone.",
    }),
    alertContent: props.Slot({
      name: "Additional Content",
      group: "Content",
    }),
    cancelLabel: props.Text({
      name: "Cancel Label",
      group: "Actions",
      defaultValue: "Cancel",
    }),
    actionLabel: props.Text({
      name: "Action Label",
      group: "Actions",
      defaultValue: "Continue",
    }),
    defaultOpen: props.Boolean({
      name: "Default Open",
      group: "Settings",
      defaultValue: false,
    }),
  },
});
