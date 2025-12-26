import { Toggle } from "./toggle";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Toggle, {
  name: "Toggle",
  description: "A toggle component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    variant: props.Variant({
      name: "Variant",
      group: "Style",
      options: ["default", "outline", "hover", "hover"],
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
