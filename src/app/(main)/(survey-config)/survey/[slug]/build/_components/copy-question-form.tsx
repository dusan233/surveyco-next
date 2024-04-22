"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import useCopyQuestion from "../_hooks/useCopyQuestion";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import useSurveyPages from "@/hooks/useSurveyPages";
import { CopyQuestionData, OperationPosition } from "@/lib/types";
import { placeQuestionSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CopyQuestionFormContent from "./copy-question/copy-question-form-content";
import { v4 as uuid4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import useSurveyQuestions from "@/hooks/useSurveyQuestions";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";

type CopyQuestionFormProps = {
  surveyId: string;
  onCloseDialog: () => void;
  copyQuestionId: string;
};

const CopyQuestionForm = ({
  surveyId,
  onCloseDialog,
  copyQuestionId,
}: CopyQuestionFormProps) => {
  const { surveyPages } = useSurveyPages(surveyId);
  const { toast } = useToast();
  const [formId, setFormId] = useState(uuid4());
  const { copyQuestionMutation, isPending } = useCopyQuestion();
  const currentlyDisplayingPage = useBuildQuestionsContext(
    (s) => s.currentPage
  );
  const form = useForm<z.infer<typeof placeQuestionSchema>>({
    resolver: zodResolver(placeQuestionSchema),
    defaultValues: {
      pageId: surveyPages!.find((page) => page.number === 1)!.id,
      position: OperationPosition.before,
      questionId: "",
    },
  });

  const selectedPageId = form.watch("pageId");
  const selectedPageNumber = surveyPages!.find(
    (page) => page.id === selectedPageId
  )!.number;
  const { questions, isLoading, isFetching } = useSurveyQuestions(
    surveyId,
    selectedPageId
  );
  // const { questions, isLoading, isFetching } = useDownsizedQuestions(
  //   surveyId,
  //   selectedPageNumber
  // );

  useEffect(() => {
    const currentPageId = selectedPageId;
    const questionId = questions ? (questions[0] ? questions[0].id : "") : "";
    const position = OperationPosition.after;

    form.reset({ pageId: currentPageId, position, questionId });
    setFormId(uuid4());
  }, [questions, form, selectedPageId]);

  useLoadingToast(isPending, "Copying question...");

  const onSubmit = async (values: CopyQuestionData) => {
    copyQuestionMutation(
      {
        surveyId,
        questionId: copyQuestionId,
        data: values,
      },
      {
        onError() {
          toast({ title: "Something went wrong!", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="gap-2  mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end gap-2"
        >
          <CopyQuestionFormContent
            isLoading={isLoading || isFetching}
            key={formId}
            surveyPages={surveyPages!}
            questions={questions}
          />
        </form>
      </Form>
      <DialogFooter className="mt-10">
        <Button variant="outline" onClick={() => onCloseDialog()} size="sm">
          Cancel
        </Button>
        <Button
          disabled={isPending || isLoading || isFetching}
          loading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          size="sm"
        >
          Copy question
        </Button>
      </DialogFooter>
    </div>
  );
};

export default CopyQuestionForm;
