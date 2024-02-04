"use client";

import { Virtualizer } from "@tanstack/react-virtual";
import React, { ReactNode } from "react";

type WindowVirtualListProps = {
  children: ReactNode;
  listRef: React.MutableRefObject<HTMLDivElement | null>;
  virtualizer: Virtualizer<Window, Element>;
};

const WindowVirtualList = ({
  children,
  listRef,
  virtualizer,
}: WindowVirtualListProps) => {
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default WindowVirtualList;
