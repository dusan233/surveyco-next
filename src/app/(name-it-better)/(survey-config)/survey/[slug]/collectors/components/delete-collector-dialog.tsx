"use client";

import { deleteSurveyCollector } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Collector } from "@/lib/types";
import { AlertTriangle } from "lucide-react";
import React, { useTransition } from "react";

type DeleteCollectorDialogProps = {
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  collector: Collector;
};

const DeleteCollectorDialog = ({
  onOpenChange,
  isOpen,
  collector,
}: DeleteCollectorDialogProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDeleteCollector = () => {
    startTransition(() => {
      deleteSurveyCollector(collector.id, collector.surveyId);
    });
  };

  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Delete collector</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 mt-5">
          <AlertTriangle className="text-red-500 h-12 w-12" />
          <div>
            <p className="font-medium">
              Are you sure you want to delete this collector?
            </p>
            <div className="space-y-1 mt-2">
              <p>Name: {collector.name}</p>
              <p>
                Date Created: {new Date(collector.created_at).toISOString()}
              </p>
              <p>
                Date Updated: {new Date(collector.updated_at).toISOString()}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-5">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            size="sm"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDeleteCollector}
            size="sm"
          >
            Delete collector
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCollectorDialog;
