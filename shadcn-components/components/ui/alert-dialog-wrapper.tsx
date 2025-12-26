"use client"

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

export interface AlertDialogWrapperProps {
  triggerLabel?: string;
  triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  title?: string;
  description?: string;
  alertContent?: React.ReactNode;
  cancelLabel?: string;
  actionLabel?: string;
  defaultOpen?: boolean;
}

export function AlertDialogWrapper({
  triggerLabel = "Open Alert",
  triggerVariant = "outline",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  alertContent,
  cancelLabel = "Cancel",
  actionLabel = "Continue",
  defaultOpen = false,
}: AlertDialogWrapperProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="alert-dialog-container">
      <AlertDialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <AlertDialogPrimitive.Trigger asChild>
          <button className={cn(buttonVariants({ variant: triggerVariant }))}>
            {triggerLabel}
          </button>
        </AlertDialogPrimitive.Trigger>
        <AlertDialogPrimitive.Portal container={containerRef.current}>
          <AlertDialogPrimitive.Overlay
            className={cn(
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
            )}
          />
          <AlertDialogPrimitive.Content
            className={cn(
              "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg"
            )}
          >
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <AlertDialogPrimitive.Title className="text-lg font-semibold">
                {title}
              </AlertDialogPrimitive.Title>
              {description && (
                <AlertDialogPrimitive.Description className="text-muted-foreground text-sm">
                  {description}
                </AlertDialogPrimitive.Description>
              )}
            </div>
            {alertContent}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <AlertDialogPrimitive.Cancel
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                {cancelLabel}
              </AlertDialogPrimitive.Cancel>
              <AlertDialogPrimitive.Action
                className={cn(buttonVariants())}
              >
                {actionLabel}
              </AlertDialogPrimitive.Action>
            </div>
          </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Portal>
      </AlertDialogPrimitive.Root>
    </div>
  );
}
