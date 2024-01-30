"use client";

import { createSurveyCollector } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon } from "lucide-react";
import React, { useTransition } from "react";

type CreateCollectorProps = {
  surveyId: string;
};

const CreateCollector = ({ surveyId }: CreateCollectorProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCreateCollector = () => {
    startTransition(async () => {
      try {
        await createSurveyCollector(surveyId);
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
        });
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      loading={isPending}
      onClick={handleCreateCollector}
      className="uppercase"
      size="lg"
    >
      CREATE NEW COLLECTOR
      {!isPending && <PlusIcon className="ml-2 h-4 w-4" />}
    </Button>
  );
};

export default CreateCollector;
