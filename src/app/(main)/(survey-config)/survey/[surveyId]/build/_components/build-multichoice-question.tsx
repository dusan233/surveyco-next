"use client";

import React, { useMemo } from "react";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import EditQuestionChoiceList from "./edit-question-choice-list";
import EditQuestionFooter from "./edit-question-footer";
import useSaveQuestion from "../_hooks/useSaveQuestion";
import { useClickAwayQuestionEdit } from "@/hooks/useClickAwayQuestionEdit";
import EditQuestionSettings from "./edit-question-settings";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import useMultiChoiceQuestionForm from "../_hooks/useMultiChoiceQuestionForm";
import EditQuestionDescription from "./edit-question-description";
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
import { useLoadingToast } from "@/hooks/useLoadingToast";
import { getErrorMessage } from "@/lib/util/errorUtils";
import { toastError } from "@/lib/util/toastError";

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

  const { isPending, saveQuestionMutationAsync } = useSaveQuestion();

  const handleSaveQuestion: SubmitHandler<MultiChoiceQuestionFormData> = async (
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

    try {
      const resData = await saveQuestionMutationAsync({
        surveyId,
        currentPage: currentPage!,
        data: questionData,
      });
      setCanSelectQuestion(true);
      setAddingQuestion(false);

      form.setValue(
        "options",
        // @ts-ignore
        resData.options.map((option) => {
          return {
            id: option.id,
            description: option.description,
            number: option.number,
            descriptionImage: option.description_image,
          };
        })
      );
      if (!questionData.id) {
        setQueueQuestion(resData.id);
      }
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  useLoadingToast(isPending, "Saving question...");

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
