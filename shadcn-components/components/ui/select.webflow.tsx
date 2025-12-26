import { SelectWrapper } from "./select-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(SelectWrapper, {
  name: "Select",
  description: "A select component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    placeholder: props.Text({
      name: "Placeholder",
      group: "Content",
      defaultValue: "Select an option",
    }),
    option1Label: props.Text({
      name: "Option 1",
      group: "Options",
      defaultValue: "Option 1",
    }),
    option2Label: props.Text({
      name: "Option 2",
      group: "Options",
      defaultValue: "Option 2",
    }),
    option3Label: props.Text({
      name: "Option 3",
      group: "Options",
      defaultValue: "Option 3",
    }),
    option4Label: props.Text({
      name: "Option 4",
      group: "Options",
      defaultValue: "Option 4",
    }),
    showOption4: props.Boolean({
      name: "Show Option 4",
      group: "Settings",
      defaultValue: false,
    }),
    disabled: props.Boolean({
      name: "Disabled",
      group: "Settings",
      defaultValue: false,
    }),
    defaultValue: props.Text({
      name: "Default Value",
      group: "Settings",
      defaultValue: "",
    })
  },
});
