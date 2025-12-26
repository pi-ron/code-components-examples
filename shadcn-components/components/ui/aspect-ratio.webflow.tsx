import { AspectRatio } from "./aspect-ratio";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(AspectRatio, {
  name: "Aspect Ratio",
  description: "A aspect ratio component",
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
