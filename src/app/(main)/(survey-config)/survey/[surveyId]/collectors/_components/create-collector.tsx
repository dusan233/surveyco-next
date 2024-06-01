"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon } from "lucide-react";
import React from "react";
import useCreateSurveyCollector from "../_hooks/useCreateSurveyCollector";

type CreateCollectorProps = {
  surveyId: string;
};

const CreateCollector = ({ surveyId }: CreateCollectorProps) => {
  const { createCollectorMutationAsync, isPending } =
    useCreateSurveyCollector();
  const { toast } = useToast();

  const handleCreateCollector = async () => {
    try {
      await createCollectorMutationAsync({ surveyId });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
      });
    }
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleCreateCollector}
      className="uppercase"
      size="lg"
    >
      <span className="flex-1">CREATE NEW COLLECTOR</span>
      {isPending ? <Spinner size="xs" /> : <PlusIcon className="h-4 w-4" />}
    </Button>
  );
};

export default CreateCollector;
