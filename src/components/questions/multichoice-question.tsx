import {
  MultiChoiceQuestionData,
  MultipleChoiceQuestion,
  Option,
  UnsavedMultiChoiceQuestion,
  UnsavedQuestion,
} from "@/lib/types";
import React, { useContext } from "react";
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
import useSaveQuestion from "@/lib/hooks/useSaveQuestion";
import { multiChoiceQuestionSchema } from "@/lib/validationSchemas";
import { useClickAwayQuestionEdit } from "@/lib/hooks/useClickAway";
import { QuestionsListContext } from "@/lib/context";

type MultiChoiceQuestionProps = {
  question: MultipleChoiceQuestion | UnsavedMultiChoiceQuestion;
  surveyId: string;
  index: number;
};

const MultiChoiceQuestion = ({
  question,
  index,
  surveyId,
}: MultiChoiceQuestionProps) => {
  const form = useForm<z.infer<typeof multiChoiceQuestionSchema>>({
    resolver: zodResolver(multiChoiceQuestionSchema),
    defaultValues: {
      description: question.description,
      options: question.options,
    },
  });
  const { setCanSelectQuestion } = useContext(QuestionsListContext);
  const { isPending, saveQuestionMutation } = useSaveQuestion(surveyId);

  const onSubmit: SubmitHandler<z.infer<typeof multiChoiceQuestionSchema>> = (
    data
  ) => {
    const questionData: MultiChoiceQuestionData = {
      description: data.description,
      type: question.type,
      options: data.options,
      ...(question.id && { id: question.id }),
    };

    setCanSelectQuestion(false);
    saveQuestionMutation(questionData);
  };
  const ref = useClickAwayQuestionEdit<HTMLDivElement>(async (e) => {
    console.log("away");
    const fn = form.handleSubmit(onSubmit);
    await fn();
    console.log(form.formState.errors, "erros");
    if (form.formState.errors.description || form.formState.errors.options) {
      e.stopPropagation();
    }
  });

  return (
    <div
      ref={ref}
      className="p-5 rounded-lg bg-white border-l-4 border-l-blue-400"
    >
      <QuestionHeader index={index} type={question.type} />
      <FormProvider {...form}>
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
            <Separator className="my-5" />
            <QuestionOptionList control={form.control} />
            <QuestionFooter questionIndex={index} />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default MultiChoiceQuestion;
