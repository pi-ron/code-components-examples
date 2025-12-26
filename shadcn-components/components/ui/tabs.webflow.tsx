import { TabsWrapper } from "./tabs-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(TabsWrapper, {
  name: "Tabs",
  description: "A tabs component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    tab1Label: props.Text({
      name: "Tab 1 Label",
      group: "Tab Labels",
      defaultValue: "Tab 1",
    }),
    tab2Label: props.Text({
      name: "Tab 2 Label",
      group: "Tab Labels",
      defaultValue: "Tab 2",
    }),
    tab3Label: props.Text({
      name: "Tab 3 Label",
      group: "Tab Labels",
      defaultValue: "Tab 3",
    }),
    tab1Content: props.Slot({
      name: "Tab 1 Content",
      group: "Tab Content",
    }),
    tab2Content: props.Slot({
      name: "Tab 2 Content",
      group: "Tab Content",
    }),
    tab3Content: props.Slot({
      name: "Tab 3 Content",
      group: "Tab Content",
    }),
    showTab3: props.Boolean({
      name: "Show Tab 3",
      group: "Settings",
      defaultValue: false,
    }),
    defaultTab: props.Variant({
      name: "Default Tab",
      group: "Settings",
      options: ["tab1", "tab2", "tab3"],
      defaultValue: "tab1",
    })
  },
});
