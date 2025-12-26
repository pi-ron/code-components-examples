import { Breadcrumb } from "./breadcrumb";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(Breadcrumb, {
  name: "Breadcrumb",
  description: "A breadcrumb component",
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
