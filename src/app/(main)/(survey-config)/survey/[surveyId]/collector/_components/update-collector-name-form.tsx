"use client";

import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import SubmitButton from "./submit-button";
import { updateSurveyCollector } from "@/actions/collector-actions";
import { Collector } from "@/types/collector";

type UpdateCollectorNameFormProps = {
  collector: Collector;
};

const UpdateCollectorNameForm = ({
  collector,
}: UpdateCollectorNameFormProps) => {
  const [formState, formAction] = useFormState(updateSurveyCollector, {
    message: null,
    collector: collector,
    errorType: null,
    errors: null,
  });

  return (
    <>
      <form action={formAction} className="flex gap-3 max-w-md items-end">
        <div className="w-full space-y-1">
          <Label className="text-md" htmlFor="collectorName">
            Collector name
          </Label>
          <Input
            placeholder="Enter name"
            state={formState.errors?.name && "error"}
            id="collectorName"
            name="name"
            defaultValue={collector.name}
          />
        </div>
        <SubmitButton />
      </form>
      {formState.errors?.name && (
        <p className={"text-xs font-medium mt-1 text-destructive"}>
          {formState.errors.name[0]}
        </p>
      )}
    </>
  );
};

export default UpdateCollectorNameForm;
