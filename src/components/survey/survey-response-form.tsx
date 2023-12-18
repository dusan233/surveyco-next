"use client";

import { Question, SurveyPage } from "@/lib/types";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Form } from "../ui/form";
import { Button } from "../ui/button";

import QuestionResponse from "../questions/response/question-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionsResponsesSchema } from "@/lib/validationSchemas";

type SurveResponseFormProps = {
  questions: Question[];
  surveyPages: SurveyPage[];
  displayPageNum: number;
  setSelectedPageNum: React.Dispatch<React.SetStateAction<number>>;
  isFetchingPage: boolean;
  setIsPreviewFinished: React.Dispatch<React.SetStateAction<boolean>>;
  saveQuestionsResponsesData: (
    questionsResponsesData: {
      id: string;
      answer: string | string[];
    }[]
  ) => void;
  initValue: {
    id: string;
    answer: string | string[];
  }[];
  questionsResponses: {
    pageNum: number;
    questionsResponses: {
      id: string;
      answer: string | string[];
    }[];
  }[];
};

const SurveyResponseForm = ({
  questions,
  surveyPages,
  displayPageNum,
  setSelectedPageNum,
  isFetchingPage,
  initValue,
  saveQuestionsResponsesData,
  setIsPreviewFinished,
  questionsResponses,
}: SurveResponseFormProps) => {
  const form = useForm({
    resolver: zodResolver(questionsResponsesSchema),
    defaultValues: {
      questions: initValue,
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "questions",
    keyName: "qId",
  });

  const showNextBtn =
    surveyPages.findIndex((page) => page.number > displayPageNum) !== -1;
  const showPrevBtn =
    surveyPages.findIndex((page) => page.number < displayPageNum) !== -1;
  const showSendBtn = displayPageNum === surveyPages.length;

  const handleSubmit = (values: any) => {
    console.log(questionsResponses);
    setIsPreviewFinished(true);
  };

  const handleNextPage = () => {
    saveQuestionsResponsesData(form.getValues().questions);
    setSelectedPageNum((selectedPageNum) => selectedPageNum + 1);
  };

  const handlePrevPage = () => {
    saveQuestionsResponsesData(form.getValues().questions);
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
                  key={questionField.id}
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
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default SurveyResponseForm;
