"use client";

import Spinner from "@/components/ui/spinner";
import useSurveyResponse from "../../individual/useSurveyResponse";
import useSurveyResponses from "../../individual/useSurveIndividualResponses";
import React, { useState } from "react";
import IndividualResponseAnswers from "./individual-response-answers";
import useSurveyPages from "@/hooks/useSurveyPages";
import IndividualResponsePagination from "./individual-response-pagination";
import IndividualResponseInfo from "./individual-response-info";
import useSurveyResponsesPagination from "../../individual/useSurveyResponsesPagination";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import useToastError from "@/hooks/useToastError";
import { getUnknownErrorMessage } from "@/lib/util/errorUtils";

type IndividualResponseProps = {
  surveyId: string;
  responseId: string;
};

const IndividualResponse = ({
  surveyId,
  responseId,
}: IndividualResponseProps) => {
  const { responses, lastSuccessData: lastSuccessSurveyResponses } =
    useSurveyResponses(surveyId);
  const { surveyPages, isLoading: loadingSurveyPages } =
    useSurveyPages(surveyId);
  const [page, setPage] = useState(() => {
    const firstPage = surveyPages!.find((page) => page.number === 1);

    return firstPage!.id;
  });
  const {
    surveyResponse,
    questions,
    questionResponses,
    lastSuccessData,
    isError,
    error,
    isLoading: loadingResponse,
    isFetching: fetchingResponse,
  } = useSurveyResponse(surveyId, responseId, page);
  useToastError(isError, getUnknownErrorMessage(error));

  const surveyResponsesData =
    responses || lastSuccessSurveyResponses.current?.data;

  const {
    getCanNextResponse,
    getCanPreviousResponse,
    handleNextResponse,
    handlePreviousResponse,
  } = useSurveyResponsesPagination(surveyResponsesData!, responseId);

  const noData =
    !surveyResponse && !questions && !questionResponses && lastSuccessData;
  const responseData =
    surveyResponse || lastSuccessData.current?.surveyResponse;
  const questionsData = questions || lastSuccessData.current?.questions;
  const questionResponsesData =
    questionResponses || lastSuccessData.current?.questionResponses;

  if (isError && noData) {
    return (
      <Alert variant="destructive">
        <AlertTriangleIcon className="h-4 w-4" />

        <AlertDescription>
          It seems something went wrong! Try again in a bit.
        </AlertDescription>
      </Alert>
    );
  }

  if (loadingResponse || loadingSurveyPages) {
    return (
      <div className="flex justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <IndividualResponsePagination
        isLoading={fetchingResponse}
        responsePage={page}
        setResponsePage={setPage}
        selectedResponseId={responseId}
        surveyPages={surveyPages!}
        surveyResponses={surveyResponsesData!}
        getCanNextResponse={getCanNextResponse}
        getCanPreviousResponse={getCanPreviousResponse}
        handleNextResponse={handleNextResponse}
        handlePreviousResponse={handlePreviousResponse}
      />

      <IndividualResponseInfo surveyResponse={responseData!} />
      <div className="mt-6">
        <p className="mb-2 text-lg font-medium">
          Respondent {responseData?.display_number} (Page{" "}
          {surveyPages?.find((sPage) => sPage.id === page)?.number})
        </p>

        {questionsData?.length === 0 ? (
          <div className="border p-4 text-center">
            There are no questions on this page.
          </div>
        ) : (
          <IndividualResponseAnswers
            questionResponses={questionResponsesData!}
            questions={questionsData!}
          />
        )}
      </div>
    </div>
  );
};

export default IndividualResponse;
