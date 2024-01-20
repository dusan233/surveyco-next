"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import InsertEditorImage from "./insert-editor-image";

type CopyQuestionDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  addImageToEditor: (src: string) => void;
};

const InsertImageDialog = ({
  isOpen,
  onOpenChange,
  addImageToEditor,
}: CopyQuestionDialogProps) => {
  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Insert image</DialogTitle>
        </DialogHeader>
        <InsertEditorImage
          onOpenChange={onOpenChange}
          addImageToEditor={addImageToEditor}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InsertImageDialog;
