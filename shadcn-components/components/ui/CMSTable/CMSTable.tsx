"use client"

import React, { useRef } from "react";
import { useCMSTableItems } from "./useCMSTableItems";
import TableRowItem from "./TableRowItem";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

export interface CMSTableProps {
  cmsCollectionSlot: React.ReactNode;
  showCMSCollection: boolean;
  caption?: string;
  showCaption?: boolean;
  col1Header?: string;
  col2Header?: string;
  col3Header?: string;
  col4Header?: string;
}

const CMSTable = (props: CMSTableProps) => {
  const {
    cmsCollectionSlot,
    showCMSCollection,
    caption = "CMS Collection Items",
    showCaption = true,
    col1Header = "Column 1",
    col2Header = "Column 2",
    col3Header = "Column 3",
    col4Header = "Column 4",
  } = props;

  // Reference to parent div
  const parentRef = useRef<HTMLDivElement>(null);

  // Extract CMS collection items from Webflow slot
  const { cmsCollectionSlotRef, items } = useCMSTableItems("cmsCollectionSlot");

  return (
    <div ref={parentRef}>
      {/* Hidden container for CMS collection slot */}
      <div
        ref={cmsCollectionSlotRef}
        style={{ display: showCMSCollection ? "block" : "none" }}
      >
        {cmsCollectionSlot}
      </div>

      {/* Render table once CMS items are extracted */}
      <Table>
        {showCaption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{col1Header}</TableHead>
            <TableHead>{col2Header}</TableHead>
            <TableHead>{col3Header}</TableHead>
            <TableHead className="text-right">{col4Header}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <TableRowItem key={index} item={item} index={index} />
            ))
          ) : (
            <TableRow>
              <TableHead colSpan={4} className="text-center text-muted-foreground">
                No CMS items found. Add a CMS Collection List to the slot.
              </TableHead>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CMSTable;
