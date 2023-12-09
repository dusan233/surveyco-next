"use client";

import {
  MultiChoiceQuestionData,
  MultipleChoiceQuestion,
  UnsavedMultiChoiceQuestion,
} from "@/lib/types";
import React, { useContext } from "react";
import { RichTextEditor } from "../text-editor/rich-text";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";
import QuestionOptionList from "./question-option-list";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionFooter from "./question-footer";
import useSaveQuestion from "@/lib/hooks/useSaveQuestion";
import { multiChoiceQuestionSchema } from "@/lib/validationSchemas";
import { useClickAwayQuestionEdit } from "@/lib/hooks/useClickAwayQuestionEdit";
import { QuestionsListContext } from "@/lib/context";
import { useToast } from "../ui/use-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AutoAnimate from "../auto-animate";

type MultiChoiceQuestionProps = {
  question: MultipleChoiceQuestion | UnsavedMultiChoiceQuestion;
  surveyId: string;
  index: number;
};

const BuildMultiChoiceQuestion = ({
  question,
  index,
  surveyId,
}: MultiChoiceQuestionProps) => {
  const { toast } = useToast();
  const [parent] = useAutoAnimate();
  const form = useForm<z.infer<typeof multiChoiceQuestionSchema>>({
    resolver: zodResolver(multiChoiceQuestionSchema),
    defaultValues: {
      description: question.description,
      options: question.options,
    },
  });

  const { setCanSelectQuestion, currentPage } =
    useContext(QuestionsListContext);

  const { isPending, saveQuestionMutation } = useSaveQuestion();

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
    const addingQuestionToast = toast({
      variant: "destructive",
      title: "Saving question...",
    });
    saveQuestionMutation(
      { surveyId, currentPage: currentPage!, data: questionData },
      {
        onSuccess() {
          addingQuestionToast.dismiss();
        },
      }
    );
  };
  const ref = useClickAwayQuestionEdit<HTMLDivElement>(async (e) => {
    const fn = form.handleSubmit(onSubmit);
    await fn();
    if (form.formState.errors.description || form.formState.errors.options) {
      console.log("before prop stop");
      e.stopPropagation();
    }
  });

  return (
    <div ref={ref}>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor
                      content={field.value}
                      placeholder="Enter your question"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={fieldState.error}
                    />
                  </FormControl>
                  <AutoAnimate>
                    <FormMessage />
                  </AutoAnimate>
                </FormItem>
              )}
            />
            <Separator className="my-5" />
            <QuestionOptionList control={form.control} />
            <QuestionFooter questionIndex={index} isDisabled={isPending} />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default BuildMultiChoiceQuestion;
