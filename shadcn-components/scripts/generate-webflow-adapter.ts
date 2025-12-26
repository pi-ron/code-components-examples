#!/usr/bin/env npx ts-node

/**
 * Script to auto-generate Webflow adapter files from React component files.
 * 
 * Usage:
 *   npx ts-node scripts/generate-webflow-adapter.ts components/ui/label.tsx
 *   npx ts-node scripts/generate-webflow-adapter.ts components/ui/*.tsx
 * 
 * This script:
 * 1. Parses the React component file
 * 2. Extracts props from the component interface/type
 * 3. Maps React prop types to Webflow prop types
 * 4. Generates a .webflow.tsx adapter file
 */

import * as fs from "fs";
import * as path from "path";

// Webflow prop type mappings
const PROP_TYPE_MAP: Record<string, { webflowType: string; defaultValue: string }> = {
  // String types
  string: { webflowType: "props.Text", defaultValue: '""' },
  // Boolean types
  boolean: { webflowType: "props.Boolean", defaultValue: "false" },
  // Number types
  number: { webflowType: "props.Number", defaultValue: "0" },
  // React children/nodes
  ReactNode: { webflowType: "props.Slot", defaultValue: "undefined" },
  "React.ReactNode": { webflowType: "props.Slot", defaultValue: "undefined" },
  children: { webflowType: "props.Slot", defaultValue: "undefined" },
};

// Props to skip (internal React props, event handlers, refs)
const SKIP_PROPS = [
  "className",
  "style",
  "ref",
  "key",
  "dangerouslySetInnerHTML",
  "onClick",
  "onChange",
  "onSubmit",
  "onFocus",
  "onBlur",
  "onKeyDown",
  "onKeyUp",
  "onMouseEnter",
  "onMouseLeave",
  "asChild",
];

interface PropInfo {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
}

interface ComponentInfo {
  name: string;
  displayName: string;
  props: PropInfo[];
  hasVariants: boolean;
  variants: string[];
}

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

function extractVariants(content: string): string[] {
  // Look for variant patterns like: variant?: "default" | "destructive" | "outline"
  const variantMatch = content.match(/variant\??\s*:\s*["']([^"']+)["']\s*\|\s*["']([^"']+)["'](?:\s*\|\s*["']([^"']+)["'])*/);
  if (variantMatch) {
    // Extract all quoted strings
    const variants = content.match(/variant\??\s*:\s*((?:["'][^"']+["']\s*\|\s*)*["'][^"']+["'])/);
    if (variants) {
      return variants[1].match(/["']([^"']+)["']/g)?.map((v) => v.replace(/["']/g, "")) || [];
    }
  }
  
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
  // Look for size patterns
  const sizeMatch = content.match(/size\??\s*:\s*((?:["'][^"']+["']\s*\|\s*)*["'][^"']+["'])/);
  if (sizeMatch) {
    return sizeMatch[1].match(/["']([^"']+)["']/g)?.map((v) => v.replace(/["']/g, "")) || [];
  }
  
  // Look for cva sizes
  const cvaMatch = content.match(/variants:\s*\{[\s\S]*?size:\s*\{([\s\S]*?)\}/);
  if (cvaMatch) {
    const sizeBlock = cvaMatch[1];
    const sizeNames = sizeBlock.match(/(\w+):/g)?.map((v) => v.replace(":", "")) || [];
    return sizeNames;
  }
  
  return [];
}

function extractPropsFromInterface(content: string): PropInfo[] {
  const props: PropInfo[] = [];
  
  // Match interface or type definitions for props
  const interfaceMatch = content.match(/(?:interface|type)\s+\w*Props\w*\s*(?:=\s*)?\{([^}]+)\}/);
  if (!interfaceMatch) return props;
  
  const propsBlock = interfaceMatch[1];
  const propLines = propsBlock.split("\n");
  
  for (const line of propLines) {
    const propMatch = line.match(/^\s*(\w+)(\?)?:\s*(.+?);?\s*$/);
    if (propMatch) {
      const [, name, optional, type] = propMatch;
      if (!SKIP_PROPS.includes(name)) {
        props.push({
          name,
          type: type.trim(),
          optional: !!optional,
        });
      }
    }
  }
  
  return props;
}

function mapPropToWebflow(prop: PropInfo, variants: string[], sizes: string[]): string | null {
  const { name, type } = prop;
  
  // Handle variant prop specially
  if (name === "variant" && variants.length > 0) {
    return `props.Variant({
      name: "Variant",
      group: "Style",
      options: [${variants.map((v) => `"${v}"`).join(", ")}],
      defaultValue: "${variants[0]}",
    })`;
  }
  
  // Handle size prop specially
  if (name === "size" && sizes.length > 0) {
    return `props.Variant({
      name: "Size",
      group: "Style",
      options: [${sizes.map((s) => `"${s}"`).join(", ")}],
      defaultValue: "${sizes[0]}",
    })`;
  }
  
  // Handle children/ReactNode
  if (name === "children" || type.includes("ReactNode")) {
    return `props.Slot({
      name: "Content",
      group: "Content",
    })`;
  }
  
  // Handle boolean
  if (type === "boolean") {
    return `props.Boolean({
      name: "${toTitleCase(name)}",
      group: "Settings",
      defaultValue: false,
    })`;
  }
  
  // Handle string
  if (type === "string") {
    return `props.Text({
      name: "${toTitleCase(name)}",
      group: "Content",
      defaultValue: "",
    })`;
  }
  
  // Handle number
  if (type === "number") {
    return `props.Number({
      name: "${toTitleCase(name)}",
      group: "Settings",
      defaultValue: 0,
    })`;
  }
  
  // Skip complex types
  return null;
}

function generateWebflowAdapter(filePath: string): string | null {
  const content = fs.readFileSync(filePath, "utf-8");
  const fileName = path.basename(filePath, ".tsx");
  const componentName = toPascalCase(fileName);
  const displayName = toTitleCase(fileName);
  
  // Extract component exports - handle multiple patterns
  // Pattern 1: export { Name } or export { Name, Name2 }
  // Pattern 2: export const Name or export function Name
  let mainExport: string | null = null;
  
  // Try pattern: export { ComponentName }
  const namedExportMatch = content.match(/export\s*\{\s*([^}]+)\s*\}/);
  if (namedExportMatch) {
    const exports = namedExportMatch[1].split(",").map(e => e.trim());
    // Find the one matching the filename (PascalCase)
    mainExport = exports.find(e => e.toLowerCase() === componentName.toLowerCase()) || exports[0];
  }
  
  // Try pattern: export const/function Name
  if (!mainExport) {
    const directExportMatch = content.match(/export\s+(?:const|function)\s+(\w+)/);
    if (directExportMatch) {
      mainExport = directExportMatch[1];
    }
  }
  
  // Try pattern: function Name followed by export
  if (!mainExport) {
    const funcMatch = content.match(/function\s+(\w+)\s*\(/);
    if (funcMatch) {
      mainExport = funcMatch[1];
    }
  }
  
  if (!mainExport) {
    console.log(`No exports found in ${filePath}`);
    return null;
  }
  
  // Extract variants and sizes
  const variants = extractVariants(content);
  const sizes = extractSizes(content);
  
  // Extract props
  const props = extractPropsFromInterface(content);
  
  // Build props object
  const webflowProps: string[] = [];
  
  // Add children/slot if component likely accepts children
  if (content.includes("children") || content.includes("ReactNode")) {
    webflowProps.push(`    children: props.Slot({
      name: "Content",
      group: "Content",
    })`);
  }
  
  // Add variant if found
  if (variants.length > 0) {
    webflowProps.push(`    variant: props.Variant({
      name: "Variant",
      group: "Style",
      options: [${variants.map((v) => `"${v}"`).join(", ")}],
      defaultValue: "${variants[0]}",
    })`);
  }
  
  // Add size if found
  if (sizes.length > 0) {
    webflowProps.push(`    size: props.Variant({
      name: "Size",
      group: "Style",
      options: [${sizes.map((s) => `"${s}"`).join(", ")}],
      defaultValue: "${sizes[0]}",
    })`);
  }
  
  // Add other props
  for (const prop of props) {
    if (prop.name === "variant" || prop.name === "size" || prop.name === "children") continue;
    const webflowProp = mapPropToWebflow(prop, variants, sizes);
    if (webflowProp) {
      webflowProps.push(`    ${prop.name}: ${webflowProp}`);
    }
  }
  
  // If no props found, add a basic slot
  if (webflowProps.length === 0) {
    webflowProps.push(`    children: props.Slot({
      name: "Content",
      group: "Content",
    })`);
  }
  
  // Generate the adapter file content
  const adapterContent = `import { ${mainExport} } from "./${fileName}";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

import "../../app/globals.css";

export default declareComponent(${mainExport}, {
  name: "${displayName}",
  description: "A ${displayName.toLowerCase()} component",
  group: "UI",
  options: {
    ssr: false,
  },
  props: {
${webflowProps.join(",\n")}
  },
});
`;

  return adapterContent;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log("Usage: npx ts-node scripts/generate-webflow-adapter.ts <component-file.tsx>");
    console.log("Example: npx ts-node scripts/generate-webflow-adapter.ts components/ui/label.tsx");
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
    
    // Skip existing webflow files
    if (filePath.includes(".webflow.")) {
      console.log(`Skipping webflow file: ${filePath}`);
      continue;
    }
    
    const adapterContent = generateWebflowAdapter(filePath);
    
    if (adapterContent) {
      const outputPath = filePath.replace(".tsx", ".webflow.tsx");
      
      if (fs.existsSync(outputPath)) {
        console.log(`Adapter already exists: ${outputPath}`);
        continue;
      }
      
      fs.writeFileSync(outputPath, adapterContent);
      console.log(`Generated: ${outputPath}`);
    }
  }
}

main();
