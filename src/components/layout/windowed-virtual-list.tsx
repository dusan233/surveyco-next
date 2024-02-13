import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import React, { MutableRefObject, ReactNode } from "react";

type WindowedVirtualListProps = {
  virtualizer: Virtualizer<Window, Element>;
  listRef: MutableRefObject<HTMLDivElement | null>;
  renderItem: (item: VirtualItem) => ReactNode;
};

const WindowedVirtualList = ({
  virtualizer,
  listRef,
  renderItem,
}: WindowedVirtualListProps) => {
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

export default WindowedVirtualList;
