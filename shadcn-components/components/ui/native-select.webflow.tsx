import { NativeSelect } from "./native-select";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(NativeSelect, {
  name: "Native Select",
  description: "A native select component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    size: props.Variant({
      name: "Size",
      group: "Style",
      options: ["sm", "default"],
      defaultValue: "sm",
    })
  },
});
