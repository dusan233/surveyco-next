"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSaveSurveyResponse from "@/lib/hooks/useSaveSurveyResponse";
import {
  Question,
  QuestionResponseData,
  QuestionsResponsesData,
  SurveyPage,
} from "@/lib/types";
import { questionsResponsesSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import QuestionResponseList from "../questions/response/question-response-list";
import { useToast } from "../ui/use-toast";

type SurveyResponseFormProps = {
  questions: Question[];
  surveyPages: SurveyPage[];
  surveyId: string;
  collectorId: string;
  displayPageId: string;
  isFetchingPage: boolean;
  surveyResposneStartTime: Date;
  onSurveyChange: () => void;
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
}: SurveyResponseFormProps) => {
  const { toast } = useToast();
  const { saveResponseMutation, isPending } = useSaveSurveyResponse();
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
    const submit =
      surveyPages[surveyPages.length - 1].number === currentPageNum;
    saveResponseMutation(
      {
        surveyId,
        data: values,
        collectorId,
        submit,
        surveyResposneStartTime,
      },
      {
        onSuccess(data) {
          onSuccessfulSubmit(values, data.submitted);
        },
        onError(error) {
          if (error.name === "CONFLICT") {
            onSurveyChange();
          } else {
            toast({ variant: "destructive", title: "Something went wrong!" });
          }
        },
      }
    );
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
