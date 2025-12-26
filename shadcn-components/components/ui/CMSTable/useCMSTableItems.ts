import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Extracts CMS collection list items from a Webflow collection slot
 * @param slotName - Name of the slot containing the CMS collection
 * @returns Ref for the slot container and array of cloned item elements
 */
export function useCMSTableItems(slotName: string) {
  const cmsCollectionSlotRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<HTMLDivElement[] | null>(null);

  useEffect(() => {
    if (items === null && cmsCollectionSlotRef.current) {
      // Find the slot element by name
      const slot = cmsCollectionSlotRef.current.querySelector(
        `[name="${slotName}"]`
      ) as HTMLSlotElement;

      if (slot) {
        const assignedElements = slot.assignedElements();
        if (assignedElements && assignedElements.length > 0) {
          // Extract all CMS list items and clone them for manipulation
          const tableItems = (
            Array.from(
              assignedElements[0].querySelectorAll(
                `.w-dyn-item[role='listitem']`
              )
            ) as HTMLDivElement[]
          ).map((item) => item.cloneNode(true) as HTMLDivElement);
          setItems(tableItems);
        }
      }
    }
  }, [cmsCollectionSlotRef.current, items]);

  // Filter out empty items and memoize for performance
  const memoizedItems = useMemo(
    () => items?.filter((item) => item && item.children.length > 0) ?? [],
    [items]
  );

  return {
    cmsCollectionSlotRef,
    items: memoizedItems,
  };
}
