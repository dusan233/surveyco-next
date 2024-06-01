"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { Collector } from "@/types/collector";
import { DialogProps } from "@/types/common";
import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import React from "react";
import useDeleteSurveyCollector from "../_hooks/useDeleteSurveyCollector";

type DeleteCollectorDialogProps = DialogProps & {
  collector: Collector;
};

const DeleteCollectorDialog = ({
  onOpenChange,
  isOpen,
  collector,
}: DeleteCollectorDialogProps) => {
  const { isPending, deleteCollectorMutationAsync } =
    useDeleteSurveyCollector();
  const { toast } = useToast();
  const createdAt = new Date(collector.created_at);
  const updatedAt = new Date(collector.updated_at);

  const handleDeleteCollector = async () => {
    onOpenChange();
    try {
      await deleteCollectorMutationAsync({
        collectorId: collector.id,
        surveyId: collector.surveyId,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    }
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
                <time dateTime={createdAt.toISOString()}>
                  {format(createdAt, "EEEE, MMMM dd, yyyy H:mm")}
                </time>
              </p>
              <p>
                Date Updated:{" "}
                <time dateTime={updatedAt.toISOString()}>
                  {format(updatedAt, "EEEE, MMMM dd, yyyy H:mm")}
                </time>
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-5">
          <Button
            variant="outline"
            onClick={onOpenChange}
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
            Delete collector {isPending && <Spinner size="xs" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCollectorDialog;
