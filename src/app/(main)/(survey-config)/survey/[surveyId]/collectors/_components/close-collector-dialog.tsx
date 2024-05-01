"use client";

import { updateSurveyCollectorStatus } from "@/actions/collector-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Collector, CollectorStatus } from "@/types/collector";
import { DialogProps } from "@/types/common";
import { AlertTriangle } from "lucide-react";
import React, { useTransition } from "react";

type CloseCollectorDialogProps = DialogProps & {
  collector: Collector;
};

const CloseCollectorDialog = ({
  onOpenChange,
  collector,
  isOpen,
}: CloseCollectorDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleUpdateCollectorStatus = () => {
    onOpenChange();
    startTransition(async () => {
      try {
        await updateSurveyCollectorStatus(collector.id, CollectorStatus.closed);
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
          <DialogTitle>Close {collector.name}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 mt-5">
          <AlertTriangle className="text-red-500  h-12 w-12" />
          <div className="flex-1">
            <p className="font-medium">
              {`You’re turning off the survey for this collector.`}
            </p>
            <div className="space-y-3.5 mt-3.5">
              <p>
                {`Once you click close, people can’t access or take the survey. You can reopen the collector at any time.`}
              </p>
              <p>
                {`Closing this collector doesn’t impact other collectors you’re using.`}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-5">
          <Button
            variant="outline"
            onClick={() => onOpenChange()}
            size="sm"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            loading={isPending}
            onClick={handleUpdateCollectorStatus}
            size="sm"
          >
            Close collector
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CloseCollectorDialog;
