"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import AddQuestion from "./add-question";

type AddQuestionDialogProps = {
  open: boolean;
  onOpenChange: () => void;
};

const AddQuestionDialog = ({ open, onOpenChange }: AddQuestionDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader hidden>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>

        <AddQuestion onAddQuestion={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionDialog;
