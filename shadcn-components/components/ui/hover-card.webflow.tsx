import { HoverCard } from "./hover-card";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(HoverCard, {
  name: "Hover Card",
  description: "A hover card component",
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
