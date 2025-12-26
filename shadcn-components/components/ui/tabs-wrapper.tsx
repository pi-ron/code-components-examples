"use client"

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";


export interface TabsWrapperProps {
  tab1Label?: string;
  tab2Label?: string;
  tab3Label?: string;
  tab1Content?: React.ReactNode;
  tab2Content?: React.ReactNode;
  tab3Content?: React.ReactNode;
  showTab3?: boolean;
  defaultTab?: string;
}

export function TabsWrapper({
  tab1Label = "Tab 1",
  tab2Label = "Tab 2",
  tab3Label = "Tab 3",
  tab1Content,
  tab2Content,
  tab3Content,
  showTab3 = false,
  defaultTab = "tab1",
}: TabsWrapperProps) {
  // Always render the tab structure - use content slots for tab panes
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList>
        <TabsTrigger value="tab1">{tab1Label}</TabsTrigger>
        <TabsTrigger value="tab2">{tab2Label}</TabsTrigger>
        {showTab3 && <TabsTrigger value="tab3">{tab3Label}</TabsTrigger>}
      </TabsList>
      <TabsContent value="tab1">
        {tab1Content || <div className="p-4">Content for {tab1Label}</div>}
      </TabsContent>
      <TabsContent value="tab2">
        {tab2Content || <div className="p-4">Content for {tab2Label}</div>}
      </TabsContent>
      {showTab3 && (
        <TabsContent value="tab3">
          {tab3Content || <div className="p-4">Content for {tab3Label}</div>}
        </TabsContent>
      )}
    </Tabs>
  );
}
