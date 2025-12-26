import { Slider } from "./slider";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Slider, {
  name: "Slider",
  description: "A slider component",
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
