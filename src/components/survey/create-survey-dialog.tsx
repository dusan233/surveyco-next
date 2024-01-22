"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CreateSurveyForm from "./create-survey-form";

type CreateSurveyDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateSurveyDialog = ({
  isOpen,
  onOpenChange,
}: CreateSurveyDialogProps) => {
  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>New survey</DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <CreateSurveyForm onCreate={onOpenChange} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSurveyDialog;