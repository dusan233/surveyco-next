"use client";

import { VirtualItem, useWindowVirtualizer } from "@tanstack/react-virtual";
import React, { ReactNode, useRef } from "react";

type WindowVirtualListProps<T> = {
  items: T[];
  renderItem: (item: VirtualItem) => ReactNode;
};

const WindowVirtualList = <T,>({
  renderItem,
  items,
}: WindowVirtualListProps<T>) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: () => 50,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });
  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div ref={listRef}>
      <div
        className="w-full relative"
        style={{
          height: `${
            virtualItems.length === 0 ? 0 : virtualizer.getTotalSize()
          }px`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${
              virtualItems[0]?.start - virtualizer.options.scrollMargin
            }px)`,
          }}
        >
          {virtualItems.map((virtualRow) => {
            return (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className="pb-7"
              >
                {renderItem(virtualRow)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WindowVirtualList;
