import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { RichTextEditor } from "../text-editor/rich-text";
import {
  TextQuestionData,
  TextboxQuestion,
  UnsavedTextQuestion,
} from "@/lib/types";
import QuestionHeader from "./question-header";
import QuestionFooter from "./question-footer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClickAwayQuestionEdit } from "@/lib/hooks/useClickAwayQuestionEdit";
import useSaveQuestion from "@/lib/hooks/useSaveQuestion";
import { QuestionsListContext } from "@/lib/context";
import { useToast } from "../ui/use-toast";
import AutoAnimate from "../auto-animate";

type TextboxQuestionProps = {
  question: TextboxQuestion | UnsavedTextQuestion;
  surveyId: string;
  index: number;
};
export const textboxQuestionSchema = z.object({
  description: z.string().min(1, "You must enter question text."),
});

const BuildTextboxQuestion = ({
  question,
  index,
  surveyId,
}: TextboxQuestionProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof textboxQuestionSchema>>({
    resolver: zodResolver(textboxQuestionSchema),
    defaultValues: {
      description: question.description,
    },
  });

  const {
    setCanSelectQuestion,
    currentPage,
    setAddingQuestion,
    setPendingQuestion,
  } = useContext(QuestionsListContext);

  const { isPending, saveQuestionMutation } = useSaveQuestion();

  const onSubmit: SubmitHandler<z.infer<typeof textboxQuestionSchema>> = (
    data
  ) => {
    const questionData: TextQuestionData = {
      description: data.description,
      type: question.type,
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
        onSuccess(data) {
          setCanSelectQuestion(true);
          setAddingQuestion(false);
          if (!questionData.id) {
            setPendingQuestion(data.id);
          }
          addingQuestionToast.dismiss();
        },
      }
    );
  };

  const ref = useClickAwayQuestionEdit<HTMLDivElement>(async (e) => {
    const fn = form.handleSubmit(onSubmit);
    await fn();

    if (form.formState.errors.description) {
      console.log("before prop stop");
      e.stopPropagation();
    }
  });

  return (
    <div ref={ref}>
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
          <QuestionFooter questionIndex={index} isDisabled={isPending} />
        </form>
      </Form>
    </div>
  );
};

export default BuildTextboxQuestion;
