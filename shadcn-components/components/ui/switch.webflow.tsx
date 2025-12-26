import { Switch } from "./switch";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Switch, {
  name: "Switch",
  description: "A switch component",
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
