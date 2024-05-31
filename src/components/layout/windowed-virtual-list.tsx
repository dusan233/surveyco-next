import { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import React, { MutableRefObject, ReactNode, forwardRef } from "react";

type WindowedVirtualListProps = {
  virtualizer: Virtualizer<Window, Element>;
  renderItem: (item: VirtualItem) => ReactNode;
};

type Ref = HTMLDivElement;

const WindowedVirtualList = forwardRef<Ref, WindowedVirtualListProps>(
  ({ virtualizer, renderItem }, ref) => {
    const virtualItems = virtualizer.getVirtualItems();

    return (
      <div ref={ref}>
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
  }
);

WindowedVirtualList.displayName = "WindowedVirtualList";

export default WindowedVirtualList;
