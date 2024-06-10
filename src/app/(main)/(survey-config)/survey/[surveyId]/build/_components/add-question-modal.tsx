"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import AddQuestion from "./add-question";
import { DialogProps } from "@/types/common";

type AddQuestionDialogProps = DialogProps;

const AddQuestionDialog = ({ isOpen, onClose }: AddQuestionDialogProps) => {
  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader hidden>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>

        <AddQuestion onAddQuestion={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionDialog;
