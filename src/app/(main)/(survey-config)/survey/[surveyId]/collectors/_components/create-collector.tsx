"use client";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { PlusIcon } from "lucide-react";
import React from "react";
import useCreateSurveyCollector from "../_hooks/useCreateSurveyCollector";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { toastError } from "@/lib/util/toastError";

type CreateCollectorProps = {
  surveyId: string;
};

const CreateCollector = ({ surveyId }: CreateCollectorProps) => {
  const { createCollectorMutationAsync, isPending } =
    useCreateSurveyCollector();

  const handleCreateCollector = async () => {
    try {
      await createCollectorMutationAsync({ surveyId });
    } catch (err) {
      toastError(getErrorMessage(err));
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
