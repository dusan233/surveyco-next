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
import { TextboxQuestion, UnsavedTextQuestion } from "@/lib/types";
import QuestionHeader from "./question-header";
import QuestionFooter from "./question-footer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type MultiChoiceQuestionProps = {
  question: TextboxQuestion | UnsavedTextQuestion;
  index: number;
};
export const textboxQuestionSchema = z.object({
  description: z.string().min(1, "You must enter question text."),
});

const TextboxQuestion = ({ question, index }: MultiChoiceQuestionProps) => {
  const form = useForm<z.infer<typeof textboxQuestionSchema>>({
    resolver: zodResolver(textboxQuestionSchema),
    defaultValues: {
      description: question.description,
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof textboxQuestionSchema>> = (
    data
  ) => console.log(data);

  return (
    <div className="p-5 bg-slate-100 rounded-sm border-l-4 border-l-blue-400">
      <QuestionHeader type={question.type} index={index} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RichTextEditor
                    content={question.description}
                    placeholder="Enter your question"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <QuestionFooter questionIndex={index} />
        </form>
      </Form>
    </div>
  );
};

export default TextboxQuestion;
