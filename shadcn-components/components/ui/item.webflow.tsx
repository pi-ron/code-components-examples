import { Item } from "./item";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Item, {
  name: "Item",
  description: "A item component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    variant: props.Variant({
      name: "Variant",
      group: "Style",
      options: ["default", "outline", "muted"],
      defaultValue: "default",
    }),
    size: props.Variant({
      name: "Size",
      group: "Style",
      options: ["default"],
      defaultValue: "default",
    })
  },
});
