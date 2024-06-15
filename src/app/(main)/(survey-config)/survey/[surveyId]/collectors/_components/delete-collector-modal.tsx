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
import { getErrorMessage } from "@/lib/util/errorUtils";

type DeleteCollectorModalProps = DialogProps & {
  collector: Collector;
};

const DeleteCollectorModal = ({
  onClose,
  isOpen,
  collector,
}: DeleteCollectorModalProps) => {
  const { isPending, deleteCollectorMutationAsync } =
    useDeleteSurveyCollector();
  const { toast } = useToast();
  const createdAt = new Date(collector.created_at);
  const updatedAt = new Date(collector.updated_at);

  const handleDeleteCollector = async () => {
    try {
      await deleteCollectorMutationAsync({
        collectorId: collector.id,
        surveyId: collector.surveyId,
      });
      onClose();
    } catch (err) {
      toast({
        variant: "destructive",
        title: getErrorMessage(err),
      });
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
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
          <Button variant="outline" onClick={onClose} size="sm">
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

export default DeleteCollectorModal;
