"use client"

import { useEffect, useRef } from "react";
import { TableCell, TableRow } from "../table";

interface TableRowItemProps {
  item: HTMLDivElement;
  index: number;
}

/**
 * Wrapper component that renders a single CMS collection item as a table row
 * Extracts text content from each child element and displays in table cells
 */
const TableRowItem = ({ item, index }: TableRowItemProps) => {
  const itemRef = useRef<HTMLTableRowElement>(null);

  // Extract text content from CMS item children
  const getCellContents = (): string[] => {
    const contents: string[] = [];
    const children = item.children;
    
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      contents.push(child.textContent?.trim() || "");
    }
    
    return contents;
  };

  const cellContents = getCellContents();

  return (
    <TableRow ref={itemRef} data-index={index}>
      {cellContents.map((content, cellIndex) => (
        <TableCell 
          key={cellIndex}
          className={cellIndex === 0 ? "font-medium" : cellIndex === cellContents.length - 1 ? "text-right" : ""}
        >
          {content}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableRowItem;
