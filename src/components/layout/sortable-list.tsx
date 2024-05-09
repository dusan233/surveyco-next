"use client";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { PropsWithChildren, ReactNode, useId } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DragEndEvent } from "@/types/dnd";

type SortableListProps<T> = PropsWithChildren<{
  onDragStart: (event: any) => void;
  onDragEnd: (event: DragEndEvent) => void;
  items: T[];
  overlayItem: ReactNode;
}>;

const SortableList = <T extends { id: string }>({
  onDragEnd,
  onDragStart,
  items,
  children,
  overlayItem,
}: SortableListProps<T>) => {
  const dndContextId = useId();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      id={dndContextId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      <DragOverlay modifiers={[restrictToVerticalAxis]}>
        {overlayItem}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableList;
