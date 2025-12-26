import { CalendarWrapper } from "./calendar-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(CalendarWrapper, {
  name: "Calendar",
  description: "A calendar component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
    disabled: props.Boolean({
      name: "Disabled",
      group: "Settings",
      defaultValue: false,
    }),
    defaultDate: props.Text({
      name: "Default Date",
      group: "Settings",
      defaultValue: "",
      tooltip: "ISO date string (e.g., 2024-01-15)",
    }),
    showSelectedDate: props.Boolean({
      name: "Show Selected Date",
      group: "Settings",
      defaultValue: true,
    })
  },
});
