"use client"

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export interface DialogWrapperProps {
  triggerLabel?: string;
  triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  title?: string;
  description?: string;
  dialogContent?: React.ReactNode;
  defaultOpen?: boolean;
}

export function DialogWrapper({
  triggerLabel = "Open Dialog",
  triggerVariant = "outline",
  title = "Dialog Title",
  description = "",
  dialogContent,
  defaultOpen = false,
}: DialogWrapperProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="dialog-container">
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <Button variant={triggerVariant}>{triggerLabel}</Button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal container={containerRef.current}>
          <DialogPrimitive.Overlay
            className={cn(
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
            )}
          />
          <DialogPrimitive.Content
            className={cn(
              "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg"
            )}
          >
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <DialogPrimitive.Title className="text-lg leading-none font-semibold">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="text-muted-foreground text-sm">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            {dialogContent || <div className="py-4">Dialog content goes here</div>}
            <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
