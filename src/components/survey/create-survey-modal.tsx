"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CreateSurveyForm from "./create-survey-form";
import { DialogProps } from "@/types/common";
import useCreateSurvey from "@/hooks/useCreateSurvey";
import { CreateSurveyData } from "@/types/survey";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type CreateSurveyModalProps = DialogProps;

const CreateSurveyModal = ({ isOpen, onClose }: CreateSurveyModalProps) => {
  const { toast } = useToast();
  const { push } = useRouter();
  const { createSurveyMutationAsync, isPending } = useCreateSurvey();

  const handleCreateSurvey = async (values: CreateSurveyData) => {
    try {
      const newSurvey = await createSurveyMutationAsync({
        title: values.title,
        category: values.category,
      });
      onClose();
      push(`/survey/${newSurvey.id}/build`);
      return newSurvey;
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
          <DialogTitle>New survey</DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <CreateSurveyForm
            isPending={isPending}
            onCreate={handleCreateSurvey}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSurveyModal;
