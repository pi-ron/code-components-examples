"use client"

import * as React from "react";
import { Calendar, CalendarDayButton } from "./calendar";


export interface CalendarWrapperProps {
  disabled?: boolean;
  defaultDate?: string;
  showSelectedDate?: boolean;
}

export function CalendarWrapper({
  disabled = false,
  defaultDate = "",
  showSelectedDate = true,
}: CalendarWrapperProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    defaultDate ? new Date(defaultDate) : new Date()
  );
  
  return (
    <div className="rounded-md border p-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabled}
        className="rounded-md"
      />
      {showSelectedDate && date && (
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {date.toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
