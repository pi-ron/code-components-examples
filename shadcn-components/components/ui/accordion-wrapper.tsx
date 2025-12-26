"use client"

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";


export interface AccordionWrapperProps {
  item1Label?: string;
  item2Label?: string;
  item3Label?: string;
  item1Content?: React.ReactNode;
  item2Content?: React.ReactNode;
  item3Content?: React.ReactNode;
  showItem3?: boolean;
  defaultOpen?: boolean;
}

export function AccordionWrapper({
  item1Label = "Section 1",
  item2Label = "Section 2",
  item3Label = "Section 3",
  item1Content,
  item2Content,
  item3Content,
  showItem3 = false,
  defaultOpen = false,
}: AccordionWrapperProps) {
  // Always render the accordion structure - use content slots for item content
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? "item-1" : undefined}>
      <AccordionItem value="item-1">
        <AccordionTrigger>{item1Label}</AccordionTrigger>
        <AccordionContent>
          {item1Content || <div className="p-2">Content for {item1Label}</div>}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>{item2Label}</AccordionTrigger>
        <AccordionContent>
          {item2Content || <div className="p-2">Content for {item2Label}</div>}
        </AccordionContent>
      </AccordionItem>
      {showItem3 && (
        <AccordionItem value="item-3">
          <AccordionTrigger>{item3Label}</AccordionTrigger>
          <AccordionContent>
            {item3Content || <div className="p-2">Content for {item3Label}</div>}
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
