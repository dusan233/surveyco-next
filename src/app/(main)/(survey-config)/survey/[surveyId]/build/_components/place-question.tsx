import useSurveyPages from "@/hooks/useSurveyPages";
import useSurveyQuestions from "@/hooks/useSurveyQuestions";
import { PlaceQuestionData, Question } from "@/types/question";
import React, { useState } from "react";
import PlaceQuestionForm from "./place-question-form";
import useToastError from "@/hooks/useToastError";
import { getErrorMessage } from "@/lib/util/errorUtils";

type PlaceQuestionProps = {
  surveyId: string;
  isPending: boolean;
  onPlaceQuestion: (values: PlaceQuestionData) => Promise<Question | undefined>;
  type?: "move" | "copy";
  onCancel?: () => void;
};

const PlaceQuestion = ({
  surveyId,
  onCancel,
  onPlaceQuestion,
  isPending,
  type = "copy",
}: PlaceQuestionProps) => {
  const { surveyPages } = useSurveyPages(surveyId);
  const [selectedPageId, setSelectedPageId] = useState(
    surveyPages?.[0].id ?? ""
  );
  const { questions, page, isFetching, isError, error } = useSurveyQuestions(
    surveyId,
    selectedPageId,
    { staleTime: Infinity }
  );
  useToastError(isError, getErrorMessage(error));

  return (
    <PlaceQuestionForm
      key={page}
      onCancel={onCancel}
      onPlaceQuestion={onPlaceQuestion}
      onChangePage={setSelectedPageId}
      isSubmitting={isPending}
      isFetchingQuestions={isFetching}
      surveyPages={surveyPages!}
      selectedPageId={selectedPageId}
      questions={questions!}
      type={type}
    />
  );
};

export default PlaceQuestion;
