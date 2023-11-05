"use server";

import {
  QuestionsResponseData,
  QuizResponseData,
  SaveQuestionData,
} from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export const getSurvey = async (
  surveyId: string
): Promise<QuizResponseData> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(`${process.env.BACKEND_API}/quiz/${surveyId}`, {
    cache: "no-cache",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data for survey with id: ${surveyId}`);
  }

  return await res.json();
};

export const getSurveyQuestions = async (
  surveyId: string
): Promise<QuestionsResponseData> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/questions`,
    {
      cache: "no-cache",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch questions for survey with id: ${surveyId}`
    );
  }

  return await res.json();
};

export const saveQuestion = async (
  surveyId: string,
  data: SaveQuestionData
) => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/save-question`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to save question for survey with id: ${surveyId}`);
  }

  return await res.json();
};
