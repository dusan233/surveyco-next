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
import { Collector, CollectorStatus } from "@/types/collector";
import { DialogProps } from "@/types/common";
import React from "react";
import useUpdateCollectorStatus from "../_hooks/useUpdateCollectorStatus";

type OpenCollectorModalProps = DialogProps & {
  collector: Collector;
};

const OpenCollectorModal = ({
  isOpen,
  onClose,
  collector,
}: OpenCollectorModalProps) => {
  const { updateCollectorStatusMutationAsync, isPending } =
    useUpdateCollectorStatus();
  const { toast } = useToast();

  const handleUpdateCollectorStatus = async () => {
    try {
      await updateCollectorStatusMutationAsync({
        collectorId: collector.id,
        status: CollectorStatus.open,
      });
      onClose();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Open {collector.name}</DialogTitle>
        </DialogHeader>
        <div className="  mt-5">
          <p className="font-medium">
            {`You’re turning on the survey for this collector.`}
          </p>
          <div className="space-y-3.5 mt-3.5">
            <p>
              {`To give people access to your survey so they can submit responses, open the collector and send the survey.`}
            </p>
            <p>
              {`If you set a cutoff date or response limit, you need to extend the date or increase the max number of responses before you can reopen the collector.`}
            </p>
          </div>
        </div>
        <DialogFooter className="mt-5">
          <Button variant="outline" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={handleUpdateCollectorStatus}
            size="sm"
          >
            Open collector {isPending && <Spinner size="xs" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpenCollectorModal;
