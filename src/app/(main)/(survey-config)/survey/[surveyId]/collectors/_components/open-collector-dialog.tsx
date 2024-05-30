import { updateSurveyCollectorStatus } from "@/actions/collector-actions";
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
import React, { useTransition } from "react";

type OpenCollectorDialogProps = DialogProps & {
  collector: Collector;
};

const OpenCollectorDialog = ({
  isOpen,
  onOpenChange,
  collector,
}: OpenCollectorDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleUpdateCollectorStatus = () => {
    onOpenChange();
    startTransition(async () => {
      try {
        await updateSurveyCollectorStatus(collector.id, CollectorStatus.open);
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
          <Button
            variant="outline"
            onClick={onOpenChange}
            size="sm"
            disabled={isPending}
          >
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

export default OpenCollectorDialog;
