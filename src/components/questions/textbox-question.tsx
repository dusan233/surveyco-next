import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { RichTextEditor } from "../rich-text";
import { TextboxQuestion } from "@/lib/types";
import QuestionHeader from "./question-header";
import QuestionFooter from "./question-footer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type MultiChoiceQuestionProps = {
  question: TextboxQuestion;
  index: number;
};
export const textboxQuestionSchema = z.object({
  question_description: z.string().min(1, "You must enter question text."),
});

const TextboxQuestion = ({ question, index }: MultiChoiceQuestionProps) => {
  const form = useForm<z.infer<typeof textboxQuestionSchema>>({
    resolver: zodResolver(textboxQuestionSchema),
    defaultValues: {
      question_description: question.question_description,
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof textboxQuestionSchema>> = (
    data
  ) => console.log(data);

  return (
    <div className="p-5 rounded-sm border border-slate-600">
      <QuestionHeader type={question.type} index={index} />
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
          <QuestionFooter />
        </form>
      </Form>
    </div>
  );
};

export default TextboxQuestion;
