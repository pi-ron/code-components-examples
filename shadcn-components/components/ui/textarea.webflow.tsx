import { Textarea } from "./textarea";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Textarea, {
  name: "Textarea",
  description: "A textarea component",
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
