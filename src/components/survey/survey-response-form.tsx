"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSaveSurveyResponse from "@/hooks/useSaveSurveyResponse";
import { questionsResponsesSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import QuestionResponseList from "../questions/response/question-response-list";
import {
  Question,
  QuestionResponseData,
  QuestionsResponsesData,
} from "@/types/question";
import { SurveyPage } from "@/types/survey";
import { toastError } from "@/lib/util/toastError";

type SurveyResponseFormProps = {
  questions: Question[];
  surveyPages: SurveyPage[];
  surveyId: string;
  collectorId: string | null;
  displayPageId: string;
  isFetchingPage: boolean;
  surveyResposneStartTime: Date;
  onSurveyChange: () => void;
  isPreview: boolean;
  onSuccessfulSubmit: (
    data: QuestionsResponsesData,
    submitted: boolean
  ) => void;
  onPreviousPage: () => void;
  initialResponses: QuestionResponseData[];
};

const SurveyResponseForm = ({
  questions,
  surveyPages,
  onPreviousPage,
  isFetchingPage,
  displayPageId,
  surveyId,
  collectorId,
  surveyResposneStartTime,
  onSurveyChange,
  initialResponses,
  onSuccessfulSubmit,
  isPreview = false,
}: SurveyResponseFormProps) => {
  const { isPending, saveResponseMutationAsync } = useSaveSurveyResponse();
  const form = useForm<QuestionsResponsesData>({
    resolver: zodResolver(questionsResponsesSchema),
    defaultValues: {
      questionResponses: initialResponses,
    },
  });
  const currentPageNum = surveyPages!.find(
    (page) => page.id === displayPageId
  )!.number;

  const handleSubmit = async (values: QuestionsResponsesData) => {
    const data = await saveResponseMutationAsync({
      surveyId,
      data: values,
      collectorId,
      pageId: displayPageId,
      surveyResposneStartTime,
      isPreview,
    });

    if (data.error) {
      if (data.error.errorCode === "SURVEY_UPDATED") {
        onSurveyChange();
      } else {
        toastError("Something went wrong!");
      }
    } else if (data.data) {
      onSuccessfulSubmit(values, data.data.submitted);
    }
  };

  const showNextBtn =
    surveyPages.findIndex((page) => page.number > currentPageNum) !== -1;
  const showPrevBtn =
    surveyPages.findIndex((page) => page.number < currentPageNum) !== -1;
  const showSendBtn =
    surveyPages!.find((page) => page.id === displayPageId)!.number ===
    surveyPages.length;

  const controlsInactive = isFetchingPage || isPending;

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <QuestionResponseList questions={questions} />
          <div className="flex justify-end gap-2 mt-10">
            {showPrevBtn && (
              <Button
                disabled={controlsInactive}
                onClick={onPreviousPage}
                size="lg"
                type="button"
              >
                Previous
              </Button>
            )}
            {showNextBtn && (
              <Button disabled={controlsInactive} size="lg" type="submit">
                Next
              </Button>
            )}
            {showSendBtn && (
              <Button disabled={controlsInactive} size="lg" type="submit">
                Send
              </Button>
            )}
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default SurveyResponseForm;
