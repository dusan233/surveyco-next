"use client";

import { MultipleChoiceQuestion, Question, QuestionType } from "@/lib/types";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import QuestionCard from "../questions/question-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

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

  const renderQuestionForm = (questionData: Question, index: number) => {
    if (questionData.type === QuestionType.textbox) {
      return (
        <FormField
          control={form.control}
          name={`questions.${index}.answer`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter response" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (questionData.type === QuestionType.dropdown) {
      return (
        <FormField
          control={form.control}
          name={`questions.${index}.answer`}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {(questionData as MultipleChoiceQuestion).options.map(
                    (option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.description}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (questionData.type === QuestionType.multiple_choice) {
      return (
        <FormField
          control={form.control}
          name={`questions.${index}.answer`}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={""}
                  className="flex flex-col space-y-1"
                >
                  {(questionData as MultipleChoiceQuestion).options.map(
                    (option) => (
                      <FormItem
                        key={option.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option.id} />
                        </FormControl>
                        <FormLabel
                          dangerouslySetInnerHTML={{
                            __html: option.description,
                          }}
                          className="font-normal"
                        ></FormLabel>
                      </FormItem>
                    )
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    } else if (questionData.type === QuestionType.checkboxes) {
      return (
        <FormField
          control={form.control}
          name={`questions.${index}.answer`}
          render={() => (
            <FormItem>
              {(questionData as MultipleChoiceQuestion).options.map(
                (option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name={`questions.${index}.answer`}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value as string[]),
                                      option.id,
                                    ])
                                  : field.onChange(
                                      (field.value as string[]).filter(
                                        (value) => value !== option.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className="font-normal"
                            dangerouslySetInnerHTML={{
                              __html: option.description,
                            }}
                          />
                        </FormItem>
                      );
                    }}
                  />
                )
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }
    return null;
  };

  async function onSubmit(values: any) {
    console.log(values, "response submission");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-6">
          {fields.map((questionField, index) => {
            const questionData = questions[index];
            return (
              <QuestionCard key={questionField.id}>
                <>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: questionData.description,
                    }}
                  ></div>
                  <div className="mt-4">
                    {renderQuestionForm(questionData, index)}
                  </div>
                </>
              </QuestionCard>
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
  );
};

export default SurveyResponseForm;
