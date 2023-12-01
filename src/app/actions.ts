"use server";

import {
  Collector,
  CopyQuestionData,
  Question,
  QuestionsResponseData,
  QuizResponseData,
  SaveQuestionData,
  SurveyPage,
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
  surveyId: string,
  surveyPage?: number
): Promise<QuestionsResponseData> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/questions?page=${
      surveyPage || 1
    }`,
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

export const getSurveyPages = async (
  surveyId: string
): Promise<SurveyPage[]> => {
  const res = await fetch(`${process.env.BACKEND_API}/quiz/${surveyId}/pages`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch pages  for survey with id: ${surveyId}`);
  }

  return await res.json();
};

export const getSurveyCollector = async (
  collectorId: string,
  surveyId: string
): Promise<Collector> => {
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
  pageId: string,
  data: SaveQuestionData
): Promise<Question> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/save-question`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data, pageId }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to save question for survey with id: ${surveyId}`);
  }

  return await res.json();
};

export const deleteQuestion = async (
  surveyId: string,
  questionId: string
): Promise<void> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/question/${questionId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to delete question with id: ${questionId}`);
  }
};

export const copyQuestion = async (
  surveyId: string,
  questionId: string,
  data: CopyQuestionData
): Promise<Question> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/question/${questionId}/copy`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to copy question with id: ${questionId}`);
  }

  return await res.json();
};

export const moveQuestion = async (
  surveyId: string,
  questionId: string,
  data: CopyQuestionData
): Promise<Question> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/question/${questionId}/move`,
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
    throw new Error(`Failed to move question with id: ${questionId}`);
  }

  return await res.json();
};

export const createSurveyPage = async (
  surveyId: string
): Promise<SurveyPage> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(`${process.env.BACKEND_API}/quiz/${surveyId}/page`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to create page for survey with id: ${surveyId}`);
  }

  return await res.json();
};
