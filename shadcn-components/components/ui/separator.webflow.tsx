import { Separator } from "./separator";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Separator, {
  name: "Separator",
  description: "A separator component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    children: props.Slot({
      name: "Content",
      group: "Content",
    })
  },
});
