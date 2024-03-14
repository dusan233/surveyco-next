"use client";

import { QuestionsResponsesData } from "@/lib/types";
import { getResponseData } from "@/lib/utils";

export const saveSurveyResponse = async (
  surveyId: string,
  data: QuestionsResponsesData,
  collectorId: string | null,
  pageId: string,
  surveyResposneStartTime: Date,
  isPreview: boolean
): Promise<{ submitted: boolean }> => {
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

  return await getResponseData(res);
};
