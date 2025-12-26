"use client"

import * as React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select";


export interface SelectWrapperProps {
  placeholder?: string;
  option1Label?: string;
  option2Label?: string;
  option3Label?: string;
  option4Label?: string;
  showOption4?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

export function SelectWrapper({
  placeholder = "Select an option",
  option1Label = "Option 1",
  option2Label = "Option 2",
  option3Label = "Option 3",
  option4Label = "Option 4",
  showOption4 = false,
  disabled = false,
  defaultValue = "",
}: SelectWrapperProps) {
  // Always render the select structure
  return (
    <Select disabled={disabled} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">{option1Label}</SelectItem>
        <SelectItem value="option2">{option2Label}</SelectItem>
        <SelectItem value="option3">{option3Label}</SelectItem>
        {showOption4 && <SelectItem value="option4">{option4Label}</SelectItem>}
      </SelectContent>
    </Select>
  );
}
