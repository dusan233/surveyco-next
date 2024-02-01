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
import { useToast } from "@/components/ui/use-toast";
import { Collector } from "@/lib/types";
import { format } from "date-fns";
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
  const { toast } = useToast();

  const handleDeleteCollector = () => {
    onOpenChange(false);
    startTransition(async () => {
      try {
        await deleteSurveyCollector(collector.id, collector.surveyId);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
        });
      }
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
          <div className="flex-1">
            <p className="font-medium">
              Are you sure you want to delete this collector?
            </p>
            <div className="space-y-2 mt-3.5">
              <p>Name: {collector.name}</p>
              <p>
                Date Created:{" "}
                {format(
                  new Date(collector.created_at),
                  "EEEE, MMMM dd, yyyy H:mm"
                )}
              </p>
              <p>
                Date Updated:{" "}
                {format(
                  new Date(collector.updated_at),
                  "EEEE, MMMM dd, yyyy H:mm"
                )}
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
            loading={isPending}
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
