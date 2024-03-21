"use server";
import {
  ApiError,
  Collector,
  CopyQuestionData,
  CreateSurveyData,
  OperationPosition,
  Question,
  QuestionResponse,
  QuestionResult,
  QuestionsResponseData,
  QuizResponseData,
  SaveQuestionData,
  SortObject,
  SurveyCollectorsResData,
  SurveyPage,
  SurveyResponse,
  SurveyResponsesResData,
  VolumeByDay,
} from "@/lib/types";
import qs from "qs";
import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";
import { getResponseData } from "@/lib/utils";
import { getAccessToken } from "./helper";

export const getSurvey = async (
  surveyId: string
): Promise<QuizResponseData> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch data for survey with id: ${surveyId}`);
  }

  return await getResponseData(res);
};

export const getSurveyQuestions = async (
  surveyId: string,
  surveyPage: string
): Promise<QuestionsResponseData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/questions?pageId=${surveyPage}`
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch questions for survey with id: ${surveyId} and pageId: ${surveyPage}`
    );
  }

  return await getResponseData(res);
};

export const getSurveyPages = async (
  surveyId: string
): Promise<SurveyPage[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/pages`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch pages  for survey with id: ${surveyId}`);
  }

  return await getResponseData(res);
};

export const createQuestion = async (
  surveyId: string,
  pageId: string,
  data: SaveQuestionData
): Promise<Question> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/question`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data, pageId }),
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to create question for survey with id: ${surveyId}`
    );
  }

  return await getResponseData(res);
};

export const updateQuestion = async (
  surveyId: string,
  data: SaveQuestionData
): Promise<Question> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/question`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data }),
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to update question for survey with id: ${surveyId}`
    );
  }

  return await getResponseData(res);
};

export const deleteQuestion = async (
  surveyId: string,
  questionId: string
): Promise<void> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/question/${questionId}`,
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

export const deleteSurveyPage = async (
  surveyId: string,
  pageId: string
): Promise<void> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/page/${pageId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to delete page with id: ${pageId}`);
  }
};

export const copySurveyPage = async (
  surveyId: string,
  sourcePageId: string,
  data: { position: OperationPosition; pageId: string }
): Promise<SurveyPage> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/page/${sourcePageId}/copy`,
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
    throw new Error(`Failed to copy page with id: ${sourcePageId}`);
  }

  return await getResponseData(res);
};

export const moveSurveyPage = async (
  surveyId: string,
  sourcePageId: string,
  data: { position: OperationPosition; pageId: string }
): Promise<SurveyPage> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/page/${sourcePageId}/move`,
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
    throw new Error(`Failed to move page with id: ${sourcePageId}`);
  }

  return await getResponseData(res);
};

export const copyQuestion = async (
  surveyId: string,
  questionId: string,
  data: CopyQuestionData
): Promise<Question> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/question/${questionId}/copy`,
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

  return await getResponseData(res);
};

export const moveQuestion = async (
  surveyId: string,
  questionId: string,
  data: CopyQuestionData
): Promise<Question> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/question/${questionId}/move`,
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

  return await getResponseData(res);
};

export const createSurveyPage = async (
  surveyId: string
): Promise<SurveyPage> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/page`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await getResponseData<SurveyPage | ApiError>(res);

  if (!res.ok) {
    const errorMsg =
      (data as ApiError).error.code === "MaxPagesExceeded"
        ? "You can have up to 20 pages per survey."
        : "Something went wrong!";
    throw new Error(errorMsg);
  }

  return data as SurveyPage;
};

export const createSurvey = async (
  data: CreateSurveyData
): Promise<QuizResponseData> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/create-quiz`,
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
    throw new Error(`Failed to create new survey`);
  }
  cookies().set("ducky", "duckyVal", { maxAge: 1000 * 60 * 60 });
  revalidatePath(`/library`);

  return await getResponseData(res);
};

export const getSurveyResponsesVolume = async (
  surveyId: string
): Promise<VolumeByDay[]> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/responses/volume`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Something went wrong!`);
  }

  return await getResponseData(res);
};

export const getSurveyResponse = async (
  surveyId: string,
  responseId: string,
  pageId: string
): Promise<{
  surveyResponse: SurveyResponse;
  questions: Question[];
  questionResponses: QuestionResponse[];
  page: number;
}> => {
  const token = await getAccessToken();

  const queryParamsObj = {
    pageId,
  };
  const queryParamsStr = qs.stringify(queryParamsObj);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/response/${responseId}?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to get response with id: ${responseId}`);
  }

  return await getResponseData(res);
};

export const getSurveyCollectors = async (
  surveyId: string,
  page: number,
  sort: SortObject,
  take?: number
): Promise<SurveyCollectorsResData> => {
  const token = await getAccessToken();

  const sortColumn = sort.column;
  const sortType = sort.type;
  const queryParamsObj = {
    page: page,
    sort: `${sortColumn}:${sortType}`,
    take: take ?? 10,
  };
  const queryParamsStr = qs.stringify(queryParamsObj, { encode: false });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/collectors?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch collectors for survey with id: ${surveyId}`
    );
  }

  return await getResponseData(res);
};

export const getSurveyResponses = async (
  surveyId: string,
  page: number,
  sort: SortObject
): Promise<SurveyResponsesResData> => {
  const token = await getAccessToken();

  const sortName = sort.column;
  const sortType = sort.type;
  const queryParamsObj = {
    page: page,
    sort: `${sortName}:${sortType}`,
  };
  const queryParamsStr = qs.stringify(queryParamsObj, { encode: false });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/responses?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to get responses for survey with id: ${surveyId}`);
  }

  return await getResponseData(res);
};

export const getPageQuestionResults = async (
  surveyId: string,
  pageId: string
): Promise<QuestionResult[]> => {
  const token = await getAccessToken();
  const queryParamsObj = {
    pageId,
  };
  const queryParamsStr = qs.stringify(queryParamsObj);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/questions/result?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to get results for survey with id: ${surveyId}`);
  }

  return await getResponseData(res);
};

export const getSurveyQuestionsAndResponses = async (
  surveyId: string,
  collectorId: string,
  pageId: string
): Promise<{
  questions: Question[];
  questionResponses: QuestionResponse[];
  page: string;
}> => {
  const surveyResponsesCookieVal = cookies().get("surveyResponses");
  const queryParamsObj = {
    collectorId,
    pageId,
  };
  const queryParamsStr = qs.stringify(queryParamsObj);

  console.log(surveyResponsesCookieVal, "cookie val");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/responseData?${queryParamsStr}`,
    {
      method: "GET",
      headers: {
        Cookie: surveyResponsesCookieVal
          ? surveyResponsesCookieVal.name + "=" + surveyResponsesCookieVal.value
          : "",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to get questions and question responses.`);
  }

  return await getResponseData(res);
};
