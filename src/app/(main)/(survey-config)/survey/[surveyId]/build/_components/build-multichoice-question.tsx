"use client";

import React, { useMemo } from "react";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import EditQuestionChoiceList from "./edit-question-choice-list";
import EditQuestionFooter from "./edit-question-footer";
import useSaveQuestion from "../_hooks/useSaveQuestion";
import { useClickAwayQuestionEdit } from "@/hooks/useClickAwayQuestionEdit";
import { useToast } from "@/components/ui/use-toast";
import EditQuestionSettings from "./edit-question-settings";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import useMultiChoiceQuestionForm from "../_hooks/useMultiChoiceQuestionForm";
import EditQuestionDescription from "./edit-question-description";
import { Settings } from "lucide-react";
import {
  CheckboxesQuestion,
  DropdownQuestion,
  MultiChoiceQuestionFormData,
  MultichoiceQuestion,
  SaveMultiChoiceQuestionData,
  UnsavedCheckboxesQuestion,
  UnsavedDropdownQuestion,
  UnsavedMultichoiceQuestion,
} from "@/types/question";
import {
  isSavedQuestion,
  isSavedQuestionChoice,
} from "@/lib/util/questionUtils";

type MultiChoiceQuestionProps = {
  question:
    | MultichoiceQuestion
    | UnsavedDropdownQuestion
    | UnsavedCheckboxesQuestion
    | CheckboxesQuestion
    | DropdownQuestion
    | UnsavedMultichoiceQuestion;
  surveyId: string;
  scrollToQuestion: (qIndex: number) => void;
  qIndex: number;
};

const BuildMultiChoiceQuestion = ({
  question,
  surveyId,
  scrollToQuestion,
  qIndex,
}: MultiChoiceQuestionProps) => {
  const { toast } = useToast();
  const form = useMultiChoiceQuestionForm({
    description: question.description,
    options: question.options.map((qChoice) => ({
      description: qChoice.description,
      descriptionImage: qChoice.description_image,
      number: qChoice.number,
      ...(isSavedQuestionChoice(qChoice) && { id: qChoice.id }),
    })),
    required: question.required,
    randomize: question.randomize,
    descriptionImage: question.description_image,
  });

  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);
  const setCanSelectQuestion = useBuildQuestionsContext(
    (s) => s.setCanSelectQuestion
  );
  const setAddingQuestion = useBuildQuestionsContext(
    (s) => s.setAddingQuestion
  );

  const canRemoveQuestionOptions = useMemo(() => {
    return isSavedQuestion(question) ? !question.hasResponses : true;
  }, [question]);

  const { isPending, saveQuestionMutation } = useSaveQuestion();

  const handleSaveQuestion: SubmitHandler<MultiChoiceQuestionFormData> = (
    data
  ) => {
    const questionData: SaveMultiChoiceQuestionData = {
      description: data.description,
      type: question.type,
      options: data.options,
      required: data.required,
      randomize: data.randomize,
      descriptionImage: data.descriptionImage,
      ...(isSavedQuestion(question) && { id: question.id }),
    };

    setCanSelectQuestion(false);
    const addingQuestionToast = toast({
      variant: "default",
      title: "Saving question...",
      icon: <Settings className="animate-spin text-secondary" />,
    });
    saveQuestionMutation(
      { surveyId, currentPage: currentPage!, data: questionData },
      {
        onSuccess(data) {
          setCanSelectQuestion(true);
          setAddingQuestion(false);

          form.setValue(
            "options",
            // @ts-ignore
            data.options.map((option) => {
              return {
                id: option.id,
                description: option.description,
                number: option.number,
                descriptionImage: option.description_image,
              };
            })
          );
          if (!questionData.id) {
            setQueueQuestion(data.id);
          }
          addingQuestionToast.dismiss();
        },
        onError() {
          toast({
            variant: "destructive",
            title: "Something went wrong!",
          });
        },
      }
    );
  };

  const ref = useClickAwayQuestionEdit<HTMLDivElement>(async (e) => {
    const fn = form.handleSubmit(handleSaveQuestion);
    await fn();
    if (form.formState.errors.description || form.formState.errors.options) {
      scrollToQuestion(qIndex);
      e.stopPropagation();
    }
  });

  return (
    <div ref={ref}>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSaveQuestion)}>
            <EditQuestionDescription
              handleSaveQuestion={handleSaveQuestion}
              surveyId={surveyId}
            />
            <Separator className="my-5" />
            <EditQuestionChoiceList
              handleSaveQuestion={handleSaveQuestion}
              surveyId={surveyId}
              control={form.control}
              canRemoveOptions={canRemoveQuestionOptions}
            />
            <EditQuestionSettings question={question} />
            <EditQuestionFooter question={question} isDisabled={isPending} />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default BuildMultiChoiceQuestion;
