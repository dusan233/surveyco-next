import useSurveyPages from "@/hooks/useSurveyPages";
import React, { useEffect, useState } from "react";
import { v4 as uuid4 } from "uuid";
import useMoveQuestion from "../_hooks/useMoveQuestion";
import { placeQuestionSchema } from "@/lib/validationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OperationPosition, PlaceQuestionData } from "@/lib/types";
import useDownsizedQuestions from "@/hooks/useDownsizedQuestions";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CopyQuestionFormContent from "./copy-question/copy-question-form-content";
import { useToast } from "@/components/ui/use-toast";
import useSurveyQuestions from "@/hooks/useSurveyQuestions";

type PlaceQuestionFormProps = {
  surveyId: string;
  questionId: string;
  onCloseDialog: () => void;
};

const PlaceQuestionForm = ({
  surveyId,
  onCloseDialog,
  questionId,
}: PlaceQuestionFormProps) => {
  const { toast } = useToast();
  const { surveyPages } = useSurveyPages(surveyId);
  const [formId, setFormId] = useState(uuid4());
  const { moveQuestionMutation, isPending } = useMoveQuestion();
  const form = useForm<z.infer<typeof placeQuestionSchema>>({
    resolver: zodResolver(placeQuestionSchema),
    defaultValues: {
      pageId: surveyPages!.find((page) => page.number === 1)!.id,
      position: OperationPosition.before,
      questionId: "",
    },
  });

  const selectedPageId = form.watch("pageId");
  const selectedPageNumber = surveyPages!.find(
    (page) => page.id === selectedPageId
  )!.number;
  const { questions, isLoading, isFetching } = useSurveyQuestions(
    surveyId,
    selectedPageId
  );

  useEffect(() => {
    const currentPageId = selectedPageId;
    const questionId = questions ? (questions[0] ? questions[0].id : "") : "";
    const position = OperationPosition.after;

    form.reset({ pageId: currentPageId, position, questionId });
    setFormId(uuid4());
  }, [questions, form, selectedPageId]);

  useLoadingToast(isPending, "Copying question...");

  const onSubmit = async (values: PlaceQuestionData) => {
    moveQuestionMutation(
      {
        surveyId,
        questionId: questionId,
        pageNumber: selectedPageNumber,
        data: values,
      },
      {
        onError(error) {
          toast({ title: "Something went wrong!", variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="gap-2  mt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end gap-2"
        >
          <CopyQuestionFormContent
            isLoading={isLoading || isFetching}
            key={formId}
            surveyPages={surveyPages!}
            questions={questions}
          />
        </form>
      </Form>
      <DialogFooter className="mt-10">
        <Button variant="outline" onClick={() => onCloseDialog()} size="sm">
          Cancel
        </Button>
        <Button
          disabled={isPending || isLoading || isFetching}
          loading={isPending}
          onClick={form.handleSubmit(onSubmit)}
          size="sm"
        >
          Move question
        </Button>
      </DialogFooter>
    </div>
  );
};

export default PlaceQuestionForm;
