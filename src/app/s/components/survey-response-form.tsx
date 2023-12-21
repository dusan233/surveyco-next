"use client";

import { saveSurveyResponse } from "@/app/api";
import QuestionResponse from "@/components/questions/response/question-response";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Question,
  QuestionType,
  QuestionsResponsesData,
  SurveyPage,
} from "@/lib/types";
import { questionsResponsesSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

type SurveyResponseFormProps = {
  questions: Question[];
  surveyPages: SurveyPage[];
  surveyId: string;
  collectorId: string;
  displayPageNum: number;
  isFetchingPage: boolean;
  setSelectedPageNum: React.Dispatch<React.SetStateAction<number>>;
};

const SurveyResponseForm = ({
  questions,
  surveyPages,
  setSelectedPageNum,
  isFetchingPage,
  displayPageNum,
  surveyId,
  collectorId,
}: SurveyResponseFormProps) => {
  const form = useForm<QuestionsResponsesData>({
    resolver: zodResolver(questionsResponsesSchema),
    defaultValues: {
      questionResponses: questions!.map((question) => {
        return {
          questionId: question.id,
          answer:
            question.type === QuestionType.checkboxes ? ([] as string[]) : "",
          questionType: question.type,
        };
      }),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "questionResponses",
    keyName: "qId",
  });

  const handleSubmit = async (values: QuestionsResponsesData) => {
    await saveSurveyResponse(surveyId, values, collectorId);
  };

  const showNextBtn =
    surveyPages.findIndex((page) => page.number > displayPageNum) !== -1;
  const showPrevBtn =
    surveyPages.findIndex((page) => page.number < displayPageNum) !== -1;
  const showSendBtn = displayPageNum === surveyPages.length;

  const handleNextPage = async () => {
    await form.handleSubmit(handleSubmit)();
    setSelectedPageNum((selectedPageNum) => selectedPageNum + 1);
  };

  const handlePrevPage = () => {
    form.handleSubmit(handleSubmit)();
    setSelectedPageNum((selectedPageNum) => selectedPageNum - 1);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-6">
            {fields.map((questionField, index) => {
              const questionData = questions[index];

              return (
                <QuestionResponse
                  key={questionField.qId}
                  question={questionData}
                  index={index}
                  defaultValue={questionField.answer}
                />
              );
            })}
          </div>
          <div className="flex justify-end gap-2 mt-10">
            {showPrevBtn && (
              <Button
                disabled={isFetchingPage}
                onClick={handlePrevPage}
                size="lg"
              >
                Previous
              </Button>
            )}
            {showNextBtn && (
              <Button
                disabled={isFetchingPage}
                onClick={handleNextPage}
                size="lg"
              >
                Next
              </Button>
            )}
            {showSendBtn && (
              <Button disabled={isFetchingPage} size="lg" type="submit">
                Send
              </Button>
            )}
            <Button
              onClick={async () => {
                // const da = await saveSurveyResponse(surveyId);
              }}
              size="lg"
              type="button"
            >
              Cookie request
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default SurveyResponseForm;
