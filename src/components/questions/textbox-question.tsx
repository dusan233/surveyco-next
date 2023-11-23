import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { RichTextEditor } from "../rich-text";
import {
  TextQuestionData,
  TextboxQuestion,
  UnsavedTextQuestion,
} from "@/lib/types";
import QuestionHeader from "./question-header";
import QuestionFooter from "./question-footer";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClickAwayQuestionEdit } from "@/lib/hooks/useClickAway";
import useSaveQuestion from "@/lib/hooks/useSaveQuestion";
import { QuestionsListContext } from "@/lib/context";
import { useToast } from "../ui/use-toast";

type TextboxQuestionProps = {
  question: TextboxQuestion | UnsavedTextQuestion;
  surveyId: string;
  index: number;
};
export const textboxQuestionSchema = z.object({
  description: z.string().min(1, "You must enter question text."),
});

const TextboxQuestion = ({
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

  const { setCanSelectQuestion, currentPage } =
    useContext(QuestionsListContext);

  const { isPending, saveQuestionMutation } = useSaveQuestion(
    surveyId,
    currentPage!
  );

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
    saveQuestionMutation(questionData, {
      onSuccess() {
        addingQuestionToast.dismiss();
      },
    });
  };

  const ref = useClickAwayQuestionEdit<HTMLDivElement>((e) => {
    const fn = form.handleSubmit(onSubmit);
    fn();

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
          <QuestionFooter questionIndex={index} isDisabled={isPending} />
        </form>
      </Form>
    </div>
  );
};

export default TextboxQuestion;
