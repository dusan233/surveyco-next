import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  TextQuestionData,
  TextboxQuestion,
  TextboxQuestionFormData,
  UnsavedTextQuestion,
} from "@/lib/types";
import EditQuestionFooter from "./edit-question-footer";
import { useClickAwayQuestionEdit } from "@/lib/hooks/useClickAwayQuestionEdit";
import useSaveQuestion from "../hooks/useSaveQuestion";
import { useToast } from "@/components/ui/use-toast";
import EditQuestionSettings from "./edit-question-settings";
import useBuildQuestionsContext from "../hooks/useBuildQuestionsContext";
import useTextboxQuestionForm from "../hooks/useTextboxQuestionForm";
import EditQuestionDescription from "./edit-question-description";

type TextboxQuestionProps = {
  question: TextboxQuestion | UnsavedTextQuestion;
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

  const { isPending, saveQuestionMutation } = useSaveQuestion();

  const handleSaveQuestion: SubmitHandler<TextboxQuestionFormData> = (data) => {
    const questionData: TextQuestionData = {
      description: data.description,
      required: data.required,
      descriptionImage: data.descriptionImage,
      type: question.type,
      ...(question.id && { id: question.id }),
    };
    setCanSelectQuestion(false);
    const addingQuestionToast = toast({
      variant: "default",
      title: "Saving question...",
    });
    saveQuestionMutation(
      { surveyId, currentPage: currentPage!, data: questionData },
      {
        onSuccess(data) {
          setCanSelectQuestion(true);
          setAddingQuestion(false);
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
