"use server";

import {
  Collector,
  Question,
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

export const getSurveyCollector = async (
  collectorId: string,
  surveyId: string
): Promise<Collector> => {
  console.log(collectorId, "action");
  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/collector/${collectorId}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch collector ${collectorId} for survey with id: ${surveyId}`
    );
  }

  return await res.json();
};

export const saveQuestion = async (
  surveyId: string,
  data: SaveQuestionData
): Promise<Question> => {
  const { getToken } = auth();
  const token = await getToken();
  console.log(data, "ovo saljem");
  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/save-question`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to save question for survey with id: ${surveyId}`);
  }

  return await res.json();
};
