"use client";

import {
  Question,
  QuestionResponse,
  QuestionsResponsesData,
} from "@/lib/types";

export const getSurveyQuestionsAndResponses = async (
  surveyId: string,
  collectorId: string,
  pageNumber: number
): Promise<{
  questions: Question[];
  questionResponses: QuestionResponse[];
}> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/responseData?collectorId=${collectorId}&page=${pageNumber}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    // throw new Error(`Failed to create page for survey with id: ${surveyId}`);
    console.log("error questions-responses thing");
  }

  return await res.json();
};

export const saveSurveyResponse = async (
  surveyId: string,
  data: QuestionsResponsesData,
  collectorId: string | null,
  pageId: string,
  surveyResposneStartTime: Date,
  isPreview: boolean
): Promise<{ submitted: boolean }> => {
  console.log(collectorId, pageId, surveyResposneStartTime, isPreview);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/response`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        questionResponses: data.questionResponses,
        collectorId,
        pageId,
        isPreview,
        surveyResposneStartTime,
      }),
    }
  );

  if (!res.ok) {
    if (res.status === 409) {
      const error = new Error(`Survey data has been updated.`);
      error.name = "CONFLICT";
      throw error;
    }

    throw new Error(
      `Failed to save survey response for survey with id: ${surveyId}`
    );
  }

  return await res.json();
};
