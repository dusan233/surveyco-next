"use client";

import { StrictModeDroppable } from "@/components/strict-mode-droppable";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  ResponderProvided,
} from "react-beautiful-dnd";

const Preview = () => {
  function handleDragEnd(result: DropResult, provided: ResponderProvided) {
    console.log(result);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="list w-96">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => {
                return (
                  <Draggable
                    key={el.toString()}
                    draggableId={el.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="bg-red-200 h-16 mb-5"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        Hello freind {el}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default Preview;
