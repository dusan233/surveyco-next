"use client";

import QuestionResponseComp from "@/components/questions/response/question-response";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSaveSurveyResponse from "@/lib/hooks/useSaveSurveyResponse";
import {
  Question,
  QuestionResponse,
  QuestionType,
  QuestionsResponsesData,
  SurveyPage,
} from "@/lib/types";
import { questionsResponsesSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

type SurveyResponseFormProps = {
  questions: Question[];
  questionResponses: QuestionResponse[];
  surveyPages: SurveyPage[];
  surveyId: string;
  collectorId: string;
  displayPageNum: number;
  isFetchingPage: boolean;
  setSelectedPageNum: React.Dispatch<React.SetStateAction<number>>;
};

const SurveyResponseForm = ({
  questions,
  questionResponses,
  surveyPages,
  setSelectedPageNum,
  isFetchingPage,
  displayPageNum,
  surveyId,
  collectorId,
}: SurveyResponseFormProps) => {
  const getInitialAnswer = (question: Question) => {
    const questionRes = questionResponses.find(
      (qRes) => qRes.questionId === question.id
    );

    if (!questionRes)
      return question.type === QuestionType.checkboxes ? ([] as string[]) : "";

    return question.type === QuestionType.checkboxes
      ? questionRes.answer.map((answer) => answer.questionOptionId!)
      : question.type === QuestionType.textbox
      ? questionRes.answer[0].textAnswer!
      : questionRes.answer[0].questionOptionId!;
  };

  const { replace } = useRouter();
  const { saveResponseMutationAsync, isPending } = useSaveSurveyResponse();
  const form = useForm<QuestionsResponsesData>({
    resolver: zodResolver(questionsResponsesSchema),
    defaultValues: {
      questionResponses: questions!.map((question) => {
        const questionResponse = questionResponses.find(
          (qRes) => qRes.questionId === question.id
        );

        return {
          ...(questionResponse &&
            questionResponse.id && { id: questionResponse.id }),
          questionId: question.id,
          answer: getInitialAnswer(question),
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
    const submit =
      surveyPages[surveyPages.length - 1].number === displayPageNum;
    const surveyResponse = await saveResponseMutationAsync({
      surveyId,
      data: values,
      collectorId,
      submit,
    });
    if (surveyResponse.submitted) {
      replace("/survey-thanks");
    } else {
      setSelectedPageNum((selectedPageNum) => selectedPageNum + 1);
    }
  };

  const showNextBtn =
    surveyPages.findIndex((page) => page.number > displayPageNum) !== -1;
  const showPrevBtn =
    surveyPages.findIndex((page) => page.number < displayPageNum) !== -1;
  const showSendBtn = displayPageNum === surveyPages.length;

  const handlePrevPage = () => {
    setSelectedPageNum((selectedPageNum) => selectedPageNum - 1);
  };

  const buttonsInactive = isFetchingPage || isPending;

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-6">
            {fields.map((questionField, index) => {
              const questionData = questions[index];

              return (
                <QuestionResponseComp
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
                disabled={buttonsInactive}
                onClick={handlePrevPage}
                size="lg"
                type="button"
              >
                Previous
              </Button>
            )}
            {showNextBtn && (
              <Button disabled={buttonsInactive} size="lg" type="submit">
                Next
              </Button>
            )}
            {showSendBtn && (
              <Button disabled={buttonsInactive} size="lg" type="submit">
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
