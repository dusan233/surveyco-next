import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";

import EditQuestionFooter from "./edit-question-footer";
import { useClickAwayQuestionEdit } from "@/hooks/useClickAwayQuestionEdit";
import useSaveQuestion from "../_hooks/useSaveQuestion";
import { useToast } from "@/components/ui/use-toast";
import EditQuestionSettings from "./edit-question-settings";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import useTextboxQuestionForm from "../_hooks/useTextboxQuestionForm";
import EditQuestionDescription from "./edit-question-description";
import {
  SaveTextboxQuestionData,
  TextboxQuestion,
  TextboxQuestionFormData,
  UnsavedTextboxQuestion,
} from "@/types/question";
import { isSavedQuestion } from "@/lib/util/questionUtils";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import { getErrorMessage } from "@/lib/util/errorUtils";

type TextboxQuestionProps = {
  question: TextboxQuestion | UnsavedTextboxQuestion;
  surveyId: string;
  scrollToQuestion: (qIndex: number) => void;
  qIndex: number;
};

const BuildTextboxQuestion = ({
  question,
  surveyId,
  scrollToQuestion,
  qIndex,
}: TextboxQuestionProps) => {
  const { toast } = useToast();
  const form = useTextboxQuestionForm({
    required: question.required,
    description: question.description,
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

  const { isPending, saveQuestionMutationAsync } = useSaveQuestion();

  const handleSaveQuestion: SubmitHandler<TextboxQuestionFormData> = async (
    data
  ) => {
    const questionData: SaveTextboxQuestionData = {
      description: data.description,
      required: data.required,
      descriptionImage: data.descriptionImage,
      type: question.type,
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
      if (!questionData.id) {
        setQueueQuestion(resData.id);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: getErrorMessage(err),
      });
    }
  };

  useLoadingToast(isPending, "Saving question...");

  const ref = useClickAwayQuestionEdit<HTMLDivElement>(async (e) => {
    const fn = form.handleSubmit(handleSaveQuestion);
    await fn();

    if (form.formState.errors.description) {
      scrollToQuestion(qIndex);
      e.stopPropagation();
    }
  });

  return (
    <div ref={ref}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveQuestion)}>
          <EditQuestionDescription
            handleSaveQuestion={handleSaveQuestion}
            surveyId={surveyId}
          />
          <EditQuestionSettings question={question} />
          <EditQuestionFooter question={question} isDisabled={isPending} />
        </form>
      </Form>
    </div>
  );
};

export default BuildTextboxQuestion;
