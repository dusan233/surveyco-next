import { Active, Collision, Translate, Over } from "@dnd-kit/core";

interface DragEvent {
  activatorEvent: Event;
  active: Active;
  collisions: Collision[] | null;
  delta: Translate;
  over: Over;
}

export interface DragStartEvent extends Pick<DragEvent, "active"> {}
export interface DragMoveEvent extends DragEvent {}
export interface DragOverEvent extends DragMoveEvent {}
export interface DragEndEvent extends DragEvent {}
export interface DragCancelEvent extends DragEndEvent {}
