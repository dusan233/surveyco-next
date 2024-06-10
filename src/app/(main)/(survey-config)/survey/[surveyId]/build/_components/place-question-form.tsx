import React from "react";
import { placeQuestionSchema } from "@/lib/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PlaceQuestionFormContent from "./place-question-form-content";
import { OperationPosition } from "@/types/common";
import { PlaceQuestionData, Question } from "@/types/question";
import Spinner from "@/components/ui/spinner";
import { SurveyPage } from "@/types/survey";

type PlaceQuestionFormProps = {
  isSubmitting: boolean;
  isFetchingQuestions: boolean;
  surveyPages: SurveyPage[];
  questions: Question[];
  selectedPageId: string;
  onPlaceQuestion: (values: PlaceQuestionData) => Promise<Question | undefined>;
  onChangePage: (pageId: string) => void;
  onCancel?: () => void;
  type?: "move" | "copy";
};

const PlaceQuestionForm = ({
  onCancel,
  onPlaceQuestion,
  onChangePage,
  isSubmitting,
  isFetchingQuestions,
  surveyPages,
  questions,
  selectedPageId,
  type = "copy",
}: PlaceQuestionFormProps) => {
  const form = useForm<PlaceQuestionData>({
    resolver: zodResolver(placeQuestionSchema),
    defaultValues: {
      pageId: selectedPageId,
      position: OperationPosition.before,
      questionId: questions[0].id ?? "",
    },
  });

  const handleSubmit = async (values: PlaceQuestionData) => {
    await onPlaceQuestion(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-end gap-2"
      >
        <PlaceQuestionFormContent
          onChangePage={onChangePage}
          isLoading={isFetchingQuestions}
          surveyPages={surveyPages}
          questions={questions}
        />
      </form>
      <DialogFooter className="mt-10">
        <Button variant="outline" onClick={onCancel} size="sm">
          Cancel
        </Button>
        <Button
          disabled={isSubmitting || isFetchingQuestions}
          onClick={form.handleSubmit(handleSubmit)}
          size="sm"
        >
          {type === "copy" ? "Copy" : "Move"} question{" "}
          {isSubmitting && <Spinner size="xs" />}
        </Button>
      </DialogFooter>
    </Form>
  );
};

export default PlaceQuestionForm;
