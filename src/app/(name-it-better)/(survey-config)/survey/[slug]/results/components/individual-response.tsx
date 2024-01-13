"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import { useIndividualResponseStore } from "@/lib/hooks/store/useIndividualResponseStore";
import useSurveyResponse from "@/lib/hooks/useSurveyResponse";
import useSurveyResponseAnswers from "@/lib/hooks/useSurveyResponseAnswers";
import useSurveyResponses from "@/lib/hooks/useSurveyResponses";
import { CollectorType } from "@/lib/types";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import IndividualResponseAnswers from "./individual-response/individual-response-answers";
import useSurveyPages from "@/lib/hooks/useSurveyPages";

type IndividualResponseProps = {
  surveyId: string;
  responseId: string;
};

const IndividualResponse = ({
  surveyId,
  responseId,
}: IndividualResponseProps) => {
  const setResponseData = useIndividualResponseStore(
    (state) => state.setResponseData
  );

  const { responses } = useSurveyResponses(surveyId);
  const { surveyPages, isLoading: loadingSurveyPages } =
    useSurveyPages(surveyId);
  const {
    surveyResponse,
    isLoading: loadingResponse,
    isFetching: fetchingResponse,
  } = useSurveyResponse(surveyId, responseId);
  const [page, setPage] = useState(1);
  const {
    questions,
    questionResponses,
    isLoading: loadingAnswers,
    isFetching: fetchingAnswers,
  } = useSurveyResponseAnswers(surveyId, responseId, page);

  const handleNextResponse = () => {
    const currentResponseId = responseId;
    const currentResponseIndex = responses!.findIndex(
      (response) => response.id === currentResponseId
    );
    const lastItemIndex = responses!.length - 1;
    const nextResponseIndex =
      currentResponseIndex < lastItemIndex ? currentResponseIndex + 1 : -1;

    const nextResponseId = responses?.find(
      (_, index) => index === nextResponseIndex
    )?.id;

    if (nextResponseId) {
      setResponseData({ collectorId: "", responseId: nextResponseId });
    }
  };

  const getCanPreviousResponse = () => {
    const currentResponseId = responseId;
    const currentResponseIndex = responses!.findIndex(
      (response) => response.id === currentResponseId
    );

    const previousResponseIndex =
      currentResponseIndex > 0 ? currentResponseIndex - 1 : -1;

    return previousResponseIndex !== -1;
  };

  const getCanNextResponse = () => {
    const currentResponseId = responseId;
    const currentResponseIndex = responses!.findIndex(
      (response) => response.id === currentResponseId
    );
    const lastItemIndex = responses!.length - 1;
    const nextResponseIndex =
      currentResponseIndex < lastItemIndex ? currentResponseIndex + 1 : -1;

    return nextResponseIndex !== -1;
  };

  const handlePreviousResponse = () => {
    const currentResponseId = responseId;
    const currentResponseIndex = responses!.findIndex(
      (response) => response.id === currentResponseId
    );

    const previousResponseIndex =
      currentResponseIndex > 0 ? currentResponseIndex - 1 : -1;
    const previousResponseId = responses?.find(
      (_, index) => index === previousResponseIndex
    )?.id;

    if (previousResponseId) {
      setResponseData({ collectorId: "", responseId: previousResponseId });
    }
  };

  if (loadingResponse || loadingAnswers || loadingSurveyPages) {
    return (
      <div className="flex justify-center">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 justify-between border items-center rounded-md p-2 bg-slate-50">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={!getCanPreviousResponse()}
            onClick={handlePreviousResponse}
          >
            <ChevronLeft />
          </Button>
          <div className="max-w-20">
            <Select
              value={responseId}
              onValueChange={(value) => {
                setResponseData({ collectorId: "", responseId: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select respondent" />
              </SelectTrigger>

              <SelectContent>
                {responses!.map((response) => (
                  <SelectItem key={response.id} value={response.id}>
                    Respondent #{response.display_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            disabled={!getCanNextResponse()}
            onClick={handleNextResponse}
          >
            <ChevronRight />
          </Button>
        </div>
        {(fetchingAnswers || fetchingResponse) && <Spinner size="sm" />}
      </div>
      <div>
        <div className="max-w-20">
          <Select
            value={page.toString()}
            onValueChange={(value) => {
              setPage(Number(value));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Page" />
            </SelectTrigger>

            <SelectContent>
              {surveyPages!.map((page) => (
                <SelectItem key={page.id} value={page.number.toString()}>
                  Page {page.number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2 font-bold">
          <span className="font-bold">Status:</span>
          {surveyResponse!.status === "complete" ? (
            <span className="text-green-500">Complete</span>
          ) : (
            <span className="text-yellow-300">Incomplete</span>
          )}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Collector:</span>
          <span>
            {surveyResponse!.collector.name} (
            {surveyResponse!.collector.type === CollectorType.web_link &&
              "Weblink"}
            )
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Last Modified:</span>
          <span>
            {format(
              new Date(surveyResponse!.updated_at!),
              "EEEE, MMMM dd, yyyy h:mm:ss a"
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">IP Address:</span>
          <span>{surveyResponse!.ip_address}</span>
        </div>
      </div>
      <div className="mt-6">
        <p className="mb-2 text-lg font-medium">
          Respondent {surveyResponse?.display_number} (Page 1)
        </p>
        <IndividualResponseAnswers
          questionResponses={questionResponses!}
          questions={questions!}
        />
      </div>
    </div>
  );
};

export default IndividualResponse;
