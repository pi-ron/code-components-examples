#!/usr/bin/env npx ts-node

/**
 * Script to auto-generate Webflow wrapper + adapter files for complex React components.
 * 
 * For components with required complex props (arrays, objects, functions), this script:
 * 1. Creates a wrapper component that handles internal data/state
 * 2. Creates a Webflow adapter that exposes only primitive props
 * 
 * Usage:
 *   npx ts-node scripts/generate-complex-webflow-adapter.ts components/ui/accordion.tsx
 */

import * as fs from "fs";
import * as path from "path";

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function toTitleCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

interface ComponentExport {
  name: string;
  isMain: boolean;
}

function extractExports(content: string, fileName: string): ComponentExport[] {
  const exports: ComponentExport[] = [];
  const componentName = toPascalCase(fileName);
  
  // Pattern: export { Name, Name2 }
  const namedExportMatch = content.match(/export\s*\{\s*([^}]+)\s*\}/);
  if (namedExportMatch) {
    const names = namedExportMatch[1].split(",").map(e => e.trim());
    for (const name of names) {
      exports.push({
        name,
        isMain: name.toLowerCase() === componentName.toLowerCase(),
      });
    }
  }
  
  // Pattern: export const/function Name
  const directExports = content.matchAll(/export\s+(?:const|function)\s+(\w+)/g);
  for (const match of directExports) {
    if (!exports.find(e => e.name === match[1])) {
      exports.push({
        name: match[1],
        isMain: match[1].toLowerCase() === componentName.toLowerCase(),
      });
    }
  }
  
  return exports;
}

function extractVariants(content: string): string[] {
  // Look for cva variants
  const cvaMatch = content.match(/variants:\s*\{[\s\S]*?variant:\s*\{([\s\S]*?)\}/);
  if (cvaMatch) {
    const variantBlock = cvaMatch[1];
    const variantNames = variantBlock.match(/(\w+):/g)?.map((v) => v.replace(":", "")) || [];
    return variantNames;
  }
  return [];
}

function extractSizes(content: string): string[] {
  const cvaMatch = content.match(/variants:\s*\{[\s\S]*?size:\s*\{([\s\S]*?)\}/);
  if (cvaMatch) {
    const sizeBlock = cvaMatch[1];
    const sizeNames = sizeBlock.match(/(\w+):/g)?.map((v) => v.replace(":", "")) || [];
    return sizeNames;
  }
  return [];
}

function generateWrapperComponent(
  filePath: string,
  exports: ComponentExport[],
  variants: string[],
  sizes: string[]
): string {
  const fileName = path.basename(filePath, ".tsx");
  const componentName = toPascalCase(fileName);
  const mainExport = exports.find(e => e.isMain)?.name || exports[0]?.name || componentName;
  
  // Determine which sub-components to import
  const subComponents = exports.filter(e => !e.isMain).map(e => e.name);
  
  // Build imports based on component type
  let importList = [mainExport, ...subComponents].join(", ");
  let extraImports = "";
  
  // Build props interface based on component type
  let propsLines: string[] = [];
  let destructuredProps = "";
  let wrapperContent = "";
  
  // Detect component type and generate appropriate wrapper
  if (fileName.includes("accordion")) {
    importList = "Accordion, AccordionItem, AccordionTrigger, AccordionContent";
    propsLines = [
      "  item1Label?: string;",
      "  item2Label?: string;",
      "  item3Label?: string;",
      "  item1Content?: React.ReactNode;",
      "  item2Content?: React.ReactNode;",
      "  item3Content?: React.ReactNode;",
      "  showItem3?: boolean;",
      "  defaultOpen?: boolean;",
    ];
    destructuredProps = `  item1Label = "Section 1",
  item2Label = "Section 2",
  item3Label = "Section 3",
  item1Content,
  item2Content,
  item3Content,
  showItem3 = false,
  defaultOpen = false,`;
    wrapperContent = generateAccordionWrapper(mainExport, subComponents);
  } else if (fileName.includes("tabs")) {
    importList = "Tabs, TabsList, TabsTrigger, TabsContent";
    propsLines = [
      "  tab1Label?: string;",
      "  tab2Label?: string;",
      "  tab3Label?: string;",
      "  tab1Content?: React.ReactNode;",
      "  tab2Content?: React.ReactNode;",
      "  tab3Content?: React.ReactNode;",
      "  showTab3?: boolean;",
      "  defaultTab?: string;",
    ];
    destructuredProps = `  tab1Label = "Tab 1",
  tab2Label = "Tab 2",
  tab3Label = "Tab 3",
  tab1Content,
  tab2Content,
  tab3Content,
  showTab3 = false,
  defaultTab = "tab1",`;
    wrapperContent = generateTabsWrapper(mainExport, subComponents);
  } else if (fileName.includes("dialog")) {
    importList = "Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription";
    extraImports = `import { Button } from "./button";`;
    propsLines = [
      "  triggerLabel?: string;",
      '  triggerVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";',
      "  title?: string;",
      "  description?: string;",
      "  dialogContent?: React.ReactNode;",
      "  defaultOpen?: boolean;",
    ];
    destructuredProps = `  triggerLabel = "Open Dialog",
  triggerVariant = "outline",
  title = "Dialog Title",
  description = "",
  dialogContent,
  defaultOpen = false,`;
    wrapperContent = generateDialogWrapper(mainExport, subComponents);
  } else if (fileName.includes("select")) {
    importList = "Select, SelectTrigger, SelectValue, SelectContent, SelectItem";
    propsLines = [
      "  placeholder?: string;",
      "  option1Label?: string;",
      "  option2Label?: string;",
      "  option3Label?: string;",
      "  option4Label?: string;",
      "  showOption4?: boolean;",
      "  disabled?: boolean;",
      "  defaultValue?: string;",
    ];
    destructuredProps = `  placeholder = "Select an option",
  option1Label = "Option 1",
  option2Label = "Option 2",
  option3Label = "Option 3",
  option4Label = "Option 4",
  showOption4 = false,
  disabled = false,
  defaultValue = "",`;
    wrapperContent = generateSelectWrapper(mainExport, subComponents);
  } else if (fileName.includes("calendar")) {
    propsLines = [
      "  disabled?: boolean;",
      "  defaultDate?: string;",
      "  showSelectedDate?: boolean;",
    ];
    destructuredProps = `  disabled = false,
  defaultDate = "",
  showSelectedDate = true,`;
    wrapperContent = generateCalendarWrapper(mainExport);
  } else {
    // Generic wrapper
    propsLines = [
      "  children?: React.ReactNode;",
      "  disabled?: boolean;",
    ];
    destructuredProps = `  children,
  disabled = false,`;
    wrapperContent = generateGenericWrapper(mainExport, subComponents);
  }
  
  return `"use client"

import * as React from "react";
import { ${importList} } from "./${fileName}";
${extraImports}

export interface ${componentName}WrapperProps {
${propsLines.join("\n")}
}

export function ${componentName}Wrapper({
${destructuredProps}
}: ${componentName}WrapperProps) {
${wrapperContent}
}
`;
}

function generateAccordionWrapper(mainExport: string, subComponents: string[]): string {
  return `  // Always render the accordion structure - use content slots for item content
  return (
    <${mainExport} type="single" collapsible defaultValue={defaultOpen ? "item-1" : undefined}>
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
    </${mainExport}>
  );`;
}

function generateTabsWrapper(mainExport: string, subComponents: string[]): string {
  return `  // Always render the tab structure - use content slots for tab panes
  return (
    <${mainExport} defaultValue={defaultTab}>
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
    </${mainExport}>
  );`;
}

function generateDialogWrapper(mainExport: string, subComponents: string[]): string {
  return `  const [open, setOpen] = React.useState(defaultOpen);
  
  return (
    <${mainExport} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {dialogContent || <div className="py-4">Dialog content goes here</div>}
      </DialogContent>
    </${mainExport}>
  );`;
}

function generateSelectWrapper(mainExport: string, subComponents: string[]): string {
  return `  // Always render the select structure
  return (
    <${mainExport} disabled={disabled} defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">{option1Label}</SelectItem>
        <SelectItem value="option2">{option2Label}</SelectItem>
        <SelectItem value="option3">{option3Label}</SelectItem>
        {showOption4 && <SelectItem value="option4">{option4Label}</SelectItem>}
      </SelectContent>
    </${mainExport}>
  );`;
}

function generateCalendarWrapper(mainExport: string): string {
  return `  const [date, setDate] = React.useState<Date | undefined>(
    defaultDate ? new Date(defaultDate) : new Date()
  );
  
  return (
    <div className="rounded-md border p-3">
      <${mainExport}
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
  );`;
}

function generateGenericWrapper(mainExport: string, subComponents: string[]): string {
  return `  return (
    <${mainExport}>
      {children || <div>Content goes here</div>}
    </${mainExport}>
  );`;
}

function generateWebflowAdapter(
  filePath: string,
  componentName: string,
  variants: string[],
  sizes: string[]
): string {
  const fileName = path.basename(filePath, ".tsx");
  const displayName = toTitleCase(fileName);
  
  // Build props based on component type
  let propsLines: string[] = [];
  
  if (fileName.includes("accordion")) {
    propsLines = [
      `    item1Label: props.Text({
      name: "Item 1 Label",
      group: "Item Labels",
      defaultValue: "Section 1",
    })`,
      `    item2Label: props.Text({
      name: "Item 2 Label",
      group: "Item Labels",
      defaultValue: "Section 2",
    })`,
      `    item3Label: props.Text({
      name: "Item 3 Label",
      group: "Item Labels",
      defaultValue: "Section 3",
    })`,
      `    item1Content: props.Slot({
      name: "Item 1 Content",
      group: "Item Content",
    })`,
      `    item2Content: props.Slot({
      name: "Item 2 Content",
      group: "Item Content",
    })`,
      `    item3Content: props.Slot({
      name: "Item 3 Content",
      group: "Item Content",
    })`,
      `    showItem3: props.Boolean({
      name: "Show Item 3",
      group: "Settings",
      defaultValue: false,
    })`,
      `    defaultOpen: props.Boolean({
      name: "Default Open",
      group: "Settings",
      defaultValue: false,
    })`,
    ];
  } else if (fileName.includes("tabs")) {
    propsLines = [
      `    tab1Label: props.Text({
      name: "Tab 1 Label",
      group: "Tab Labels",
      defaultValue: "Tab 1",
    })`,
      `    tab2Label: props.Text({
      name: "Tab 2 Label",
      group: "Tab Labels",
      defaultValue: "Tab 2",
    })`,
      `    tab3Label: props.Text({
      name: "Tab 3 Label",
      group: "Tab Labels",
      defaultValue: "Tab 3",
    })`,
      `    tab1Content: props.Slot({
      name: "Tab 1 Content",
      group: "Tab Content",
    })`,
      `    tab2Content: props.Slot({
      name: "Tab 2 Content",
      group: "Tab Content",
    })`,
      `    tab3Content: props.Slot({
      name: "Tab 3 Content",
      group: "Tab Content",
    })`,
      `    showTab3: props.Boolean({
      name: "Show Tab 3",
      group: "Settings",
      defaultValue: false,
    })`,
      `    defaultTab: props.Variant({
      name: "Default Tab",
      group: "Settings",
      options: ["tab1", "tab2", "tab3"],
      defaultValue: "tab1",
    })`,
    ];
  } else if (fileName.includes("dialog")) {
    propsLines = [
      `    triggerLabel: props.Text({
      name: "Trigger Label",
      group: "Trigger",
      defaultValue: "Open Dialog",
    })`,
      `    triggerVariant: props.Variant({
      name: "Trigger Style",
      group: "Trigger",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      defaultValue: "outline",
    })`,
      `    title: props.Text({
      name: "Title",
      group: "Content",
      defaultValue: "Dialog Title",
    })`,
      `    description: props.Text({
      name: "Description",
      group: "Content",
      defaultValue: "",
    })`,
      `    dialogContent: props.Slot({
      name: "Dialog Content",
      group: "Content",
    })`,
      `    defaultOpen: props.Boolean({
      name: "Default Open",
      group: "Settings",
      defaultValue: false,
    })`,
    ];
  } else if (fileName.includes("select")) {
    propsLines = [
      `    placeholder: props.Text({
      name: "Placeholder",
      group: "Content",
      defaultValue: "Select an option",
    })`,
      `    option1Label: props.Text({
      name: "Option 1",
      group: "Options",
      defaultValue: "Option 1",
    })`,
      `    option2Label: props.Text({
      name: "Option 2",
      group: "Options",
      defaultValue: "Option 2",
    })`,
      `    option3Label: props.Text({
      name: "Option 3",
      group: "Options",
      defaultValue: "Option 3",
    })`,
      `    option4Label: props.Text({
      name: "Option 4",
      group: "Options",
      defaultValue: "Option 4",
    })`,
      `    showOption4: props.Boolean({
      name: "Show Option 4",
      group: "Settings",
      defaultValue: false,
    })`,
      `    disabled: props.Boolean({
      name: "Disabled",
      group: "Settings",
      defaultValue: false,
    })`,
      `    defaultValue: props.Text({
      name: "Default Value",
      group: "Settings",
      defaultValue: "",
    })`,
    ];
  } else if (fileName.includes("calendar")) {
    propsLines = [
      `    disabled: props.Boolean({
      name: "Disabled",
      group: "Settings",
      defaultValue: false,
    })`,
      `    defaultDate: props.Text({
      name: "Default Date",
      group: "Settings",
      defaultValue: "",
      tooltip: "ISO date string (e.g., 2024-01-15)",
    })`,
      `    showSelectedDate: props.Boolean({
      name: "Show Selected Date",
      group: "Settings",
      defaultValue: true,
    })`,
    ];
  } else {
    // Generic props
    propsLines = [
      `    children: props.Slot({
      name: "Content",
      group: "Content",
    })`,
      `    disabled: props.Boolean({
      name: "Disabled",
      group: "Settings",
      defaultValue: false,
    })`,
    ];
  }
  
  return `import { ${componentName}Wrapper } from "./${fileName}-wrapper";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(${componentName}Wrapper, {
  name: "${displayName}",
  description: "A ${displayName.toLowerCase()} component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
${propsLines.join(",\n")}
  },
});
`;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log("Usage: npx ts-node scripts/generate-complex-webflow-adapter.ts <component-file.tsx>");
    console.log("Example: npx ts-node scripts/generate-complex-webflow-adapter.ts components/ui/accordion.tsx");
    process.exit(1);
  }
  
  for (const arg of args) {
    const filePath = path.resolve(arg);
    
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }
    
    if (!filePath.endsWith(".tsx")) {
      console.error(`Skipping non-tsx file: ${filePath}`);
      continue;
    }
    
    // Skip existing webflow/wrapper files
    if (filePath.includes(".webflow.") || filePath.includes("-wrapper.")) {
      console.log(`Skipping: ${filePath}`);
      continue;
    }
    
    const content = fs.readFileSync(filePath, "utf-8");
    const fileName = path.basename(filePath, ".tsx");
    const componentName = toPascalCase(fileName);
    const dir = path.dirname(filePath);
    
    // Extract component info
    const exports = extractExports(content, fileName);
    const variants = extractVariants(content);
    const sizes = extractSizes(content);
    
    if (exports.length === 0) {
      console.log(`No exports found in ${filePath}`);
      continue;
    }
    
    // Generate wrapper
    const wrapperPath = path.join(dir, `${fileName}-wrapper.tsx`);
    if (fs.existsSync(wrapperPath)) {
      console.log(`Wrapper already exists: ${wrapperPath}`);
    } else {
      const wrapperContent = generateWrapperComponent(filePath, exports, variants, sizes);
      fs.writeFileSync(wrapperPath, wrapperContent);
      console.log(`Generated wrapper: ${wrapperPath}`);
    }
    
    // Generate adapter
    const adapterPath = path.join(dir, `${fileName}.webflow.tsx`);
    if (fs.existsSync(adapterPath)) {
      console.log(`Adapter already exists: ${adapterPath}`);
    } else {
      const adapterContent = generateWebflowAdapter(filePath, componentName, variants, sizes);
      fs.writeFileSync(adapterPath, adapterContent);
      console.log(`Generated adapter: ${adapterPath}`);
    }
  }
}

main();
