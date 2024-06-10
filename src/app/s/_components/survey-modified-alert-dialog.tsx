"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DialogProps } from "@/types/common";
import React from "react";

type SurveyModifiedAlertDialogProps = DialogProps;

const SurveyModifiedAlertDialog = ({
  isOpen,
  onClose,
}: SurveyModifiedAlertDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            This survey was modified by its creator
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`For questions on the page you're currently on, you'll have to
            re-submit your answers. Your answers for previous pages are saved (you'll see them when you click OK). Survey creators usually make changes only when it's vital do the data, so thank you for your patient.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => window.location.reload()}>
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SurveyModifiedAlertDialog;
