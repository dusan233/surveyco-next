"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import InsertEditorImage from "./insert-editor-image";
import { DialogProps } from "@/types/common";

type InsertImageModalProps = DialogProps & {
  addImageToEditor: (file: File) => void;
};

const InsertImageModal = ({
  isOpen,
  onClose,
  addImageToEditor,
}: InsertImageModalProps) => {
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Insert image</DialogTitle>
        </DialogHeader>
        <InsertEditorImage
          onClose={onClose}
          addImageToEditor={addImageToEditor}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InsertImageModal;
