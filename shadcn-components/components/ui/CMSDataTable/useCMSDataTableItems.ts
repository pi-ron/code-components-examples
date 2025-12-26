import { useEffect, useMemo, useRef, useState } from "react";

export interface CMSDataItem {
  id: string;
  [key: string]: string;
}

/**
 * Extracts CMS collection list items from a Webflow collection slot
 * and converts them to a structured data format for the DataTable
 * @param slotName - Name of the slot containing the CMS collection
 * @returns Ref for the slot container and array of data items
 */
export function useCMSDataTableItems(slotName: string) {
  const cmsCollectionSlotRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<CMSDataItem[] | null>(null);

  useEffect(() => {
    if (items === null && cmsCollectionSlotRef.current) {
      // Find the slot element by name
      const slot = cmsCollectionSlotRef.current.querySelector(
        `[name="${slotName}"]`
      ) as HTMLSlotElement;

      if (slot) {
        const assignedElements = slot.assignedElements();
        if (assignedElements && assignedElements.length > 0) {
          // Extract all CMS list items
          const cmsItems = Array.from(
            assignedElements[0].querySelectorAll(
              `.w-dyn-item[role='listitem']`
            )
          ) as HTMLDivElement[];

          // Convert DOM elements to data objects
          const dataItems: CMSDataItem[] = cmsItems.map((item, index) => {
            const dataItem: CMSDataItem = {
              id: `cms-item-${index}`,
            };

            // Extract text content from each child element
            const children = item.children;
            for (let i = 0; i < children.length; i++) {
              const child = children[i] as HTMLElement;
              const key = `col${i + 1}`;
              dataItem[key] = child.textContent?.trim() || "";
            }

            return dataItem;
          });

          setItems(dataItems);
        }
      }
    }
  }, [cmsCollectionSlotRef.current, items]);

  // Filter out empty items and memoize for performance
  const memoizedItems = useMemo(
    () => items?.filter((item) => Object.keys(item).length > 1) ?? [],
    [items]
  );

  return {
    cmsCollectionSlotRef,
    items: memoizedItems,
  };
}
