import { DropdownMenuWrapper } from "./dropdown-menu-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../../app/globals.css";

export default declareComponent(DropdownMenuWrapper, {
  name: "Dropdown Menu",
  description: "A dropdown menu component with customizable trigger and menu items",
  group: "Navigation",
  props: {
    triggerText: props.Text({
      name: "Trigger Text",
      defaultValue: "Open Menu",
    }),
    triggerVariant: props.Variant({
      name: "Trigger Style",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      defaultValue: "outline",
    }),
    menuLabel: props.Text({
      name: "Menu Label",
      defaultValue: "My Account",
    }),
    showLabel: props.Visibility({
      name: "Show Label",
      defaultValue: true,
    }),
    showSeparator: props.Visibility({
      name: "Show Separator",
      defaultValue: true,
    }),
    item1Text: props.Text({
      name: "Item 1 Text",
      defaultValue: "Profile",
    }),
    item2Text: props.Text({
      name: "Item 2 Text",
      defaultValue: "Billing",
    }),
    item3Text: props.Text({
      name: "Item 3 Text",
      defaultValue: "Team",
    }),
    item4Text: props.Text({
      name: "Item 4 Text",
      defaultValue: "Subscription",
    }),
  },
});
