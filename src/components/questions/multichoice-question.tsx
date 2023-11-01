import { MultipleChoiceQuestion, Option } from "@/lib/types";
import React from "react";
import { RichTextEditor } from "../rich-text";
import { Button } from "../ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Content } from "@tiptap/react";
import { Separator } from "../ui/separator";
import QuestionOptionList from "./question-option-list";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionFooter from "./question-footer";
import QuestionHeader from "./question-header";

type MultiChoiceQuestionProps = {
  question: MultipleChoiceQuestion;
  index: number;
};

export type QuestionInputs = {
  question_description: Content;
  options: Option[];
};

export const multiChoiceQuestionSchema = z.object({
  question_description: z.string().min(1, "You must enter question text."),
  options: z
    .array(
      z.object({
        description: z.string().min(1, "You must enter option text."),
      })
    )
    .nonempty("You must add at least one option."),
});

const MultiChoiceQuestion = ({ question, index }: MultiChoiceQuestionProps) => {
  const form = useForm<z.infer<typeof multiChoiceQuestionSchema>>({
    resolver: zodResolver(multiChoiceQuestionSchema),
    defaultValues: {
      question_description: question.question_description,
      options: question.options,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof multiChoiceQuestionSchema>> = (
    data
  ) => console.log(data);

  return (
    <div className="p-5 rounded-lg bg-slate-100 border-l-4 border-l-blue-400">
      <QuestionHeader index={index} type={question.type} />
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="question_description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor
                      content={question.question_description}
                      placeholder="Enter your question"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="my-5" />
            <QuestionOptionList control={form.control} />
            <QuestionFooter />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default MultiChoiceQuestion;
