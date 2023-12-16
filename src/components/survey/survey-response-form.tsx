"use client";

import { Question, QuestionType } from "@/lib/types";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import { Form } from "../ui/form";
import { Button } from "../ui/button";

import QuestionResponse from "../questions/response/question-response";

type SurveResponseFormProps = {
  questions: Question[];
};

const SurveyResponseForm = ({ questions }: SurveResponseFormProps) => {
  const form = useForm({
    defaultValues: {
      questions: questions.map((question) => {
        return {
          id: question.id,
          answer:
            question.type === QuestionType.textbox ? "" : ([] as string[]),
        };
      }),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <div className="flex flex-col gap-6">
            {fields.map((questionField, index) => {
              const questionData = questions[index];
              console.log(questionField.id, questionData.id, "ss");
              return (
                <QuestionResponse
                  key={questionField.id}
                  question={questionData}
                  index={index}
                />
              );
            })}
          </div>
          <div className="flex justify-end gap-2 mt-5">
            <Button size="lg" type="submit">
              Send
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default SurveyResponseForm;
