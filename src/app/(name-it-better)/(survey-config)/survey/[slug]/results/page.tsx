"use client";

import React, { StyleHTMLAttributes, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    opacity: isDragging ? "0.4" : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style} className="p-3 bg-red-300 relative" ref={setNodeRef}>
      Some shittt {props.id}
      <div
        {...attributes}
        {...listeners}
        ref={setActivatorNodeRef}
        className="bg-red-500 absolute right-[-20px] w-4 top-0"
      >
        s
      </div>
    </div>
  );
}

export default function Dsasas() {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const virtualizer = useWindowVirtualizer({
    count: items.length,
    estimateSize: () => 50,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });
  const itemss = virtualizer.getVirtualItems();

  return (
    <DndContext
      id="13dsadaskk"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {/* <div className="flex flex-col gap-2">
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </div> */}
        <div ref={listRef} className="py-5 px-20">
          <div
            className="w-full relative"
            style={{
              height: `${virtualizer.getTotalSize()}px`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${
                  itemss[0]?.start - virtualizer.options.scrollMargin
                }px)`,
              }}
            >
              {itemss.map((virtualRow) => (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={virtualizer.measureElement}
                  // style={{
                  //   position: "absolute",
                  //   top: 0,
                  //   left: 0,
                  //   width: "100%",
                  //   height: `${virtualRow.size}px`,

                  // }}
                  className="pb-3"
                >
                  <SortableItem
                    key={items[virtualRow.index]}
                    id={items[virtualRow.index]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <div className="bg-blue-200 p-3">Some shittt {activeId}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: any) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      // setItems((items) => {
      //   const oldIndex = items.indexOf(active.id);
      //   const newIndex = items.indexOf(over.id);
      //   return arrayMove(items, oldIndex, newIndex);
      // });
    }

    setActiveId(null);
  }
}
