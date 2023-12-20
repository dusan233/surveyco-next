import { saveSurveyResponse } from "@/app/actions";
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
}: SurveyResponseFormProps) => {
  const form = useForm<QuestionsResponsesData>({
    resolver: zodResolver(questionsResponsesSchema),
    defaultValues: {
      questions: questions!.map((question) => {
        return {
          id: question.id,
          answer:
            question.type === QuestionType.checkboxes ? ([] as string[]) : "",
        };
      }),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "questions",
    keyName: "qId",
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const showNextBtn =
    surveyPages.findIndex((page) => page.number > displayPageNum) !== -1;
  const showPrevBtn =
    surveyPages.findIndex((page) => page.number < displayPageNum) !== -1;
  const showSendBtn = displayPageNum === surveyPages.length;

  const handleNextPage = () => {
    console.log("kurac");
    form.handleSubmit(handleSubmit)();
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
            <Button
              onClick={() => {
                saveSurveyResponse(surveyId);
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
