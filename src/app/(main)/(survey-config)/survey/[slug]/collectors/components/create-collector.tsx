"use client";

import { createSurveyCollector } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useTransition } from "react";

type CreateCollectorProps = {
  surveyId: string;
};

const CreateCollector = ({ surveyId }: CreateCollectorProps) => {
  const [isPending, startTransition] = useTransition();

  const handleCreateCollector = () => {
    startTransition(() => {
      createSurveyCollector(surveyId);
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={handleCreateCollector}
      className="uppercase"
    >
      CREATE NEW COLLECTOR
      <PlusIcon className="ml-2" />
    </Button>
  );
};

export default CreateCollector;
