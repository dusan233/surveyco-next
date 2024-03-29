import {
  Question,
  QuestionResponse,
  QuestionResult,
  QuestionsResponseData,
  QuizResponseData,
  SortObject,
  SurveyCollectorsResData,
  SurveyPage,
  SurveyResponse,
  SurveyResponsesResData,
  VolumeByDay,
} from "@/lib/types";
import { getResponseData } from "@/lib/utils";
import { getAccessToken } from "../_actions/helper";
import qs from "qs";

export const getSurvey = async (params: {
  surveyId: string;
  token: string | null;
}): Promise<QuizResponseData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${params.surveyId}`,
    {
      headers: {
        Authorization: "Bearer " + params.token,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch data for survey with id: ${params.surveyId}`
    );
  }

  return await getResponseData(res);
};

export const getSurveyQuestions = async (params: {
  surveyId: string;
  surveyPage: string;
}): Promise<QuestionsResponseData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${params.surveyId}/questions?pageId=${params.surveyPage}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch questions for survey with id: ${params.surveyId} and pageId: ${params.surveyPage}`
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

export const getSurveyResponsesVolume = async (params: {
  surveyId: string;
  token: string | null;
}): Promise<VolumeByDay[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${params.surveyId}/responses/volume`,
    {
      headers: {
        Authorization: "Bearer " + params.token,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Something went wrong!`);
  }

  return await getResponseData(res);
};

export const getSurveyResponse = async (params: {
  surveyId: string;
  responseId: string;
  pageId: string;
  accessToken: string | null | undefined;
}): Promise<{
  surveyResponse: SurveyResponse;
  questions: Question[];
  questionResponses: QuestionResponse[];
  page: number;
}> => {
  const queryParamsObj = {
    pageId: params.pageId,
  };
  const queryParamsStr = qs.stringify(queryParamsObj);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${params.surveyId}/response/${params.responseId}?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + params.accessToken,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to get response with id: ${params.responseId}`);
  }

  return await getResponseData(res);
};

export const getSurveyCollectors = async (params: {
  surveyId: string;
  page: number;
  sort: SortObject;
  token: string | null | undefined;
  take?: number;
}): Promise<SurveyCollectorsResData> => {
  const sortColumn = params.sort.column;
  const sortType = params.sort.type;
  const queryParamsObj = {
    page: params.page,
    sort: `${sortColumn}:${sortType}`,
    take: params.take ?? 10,
  };
  const queryParamsStr = qs.stringify(queryParamsObj, { encode: false });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${params.surveyId}/collectors?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + params.token,
        cache: "no-store",
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch collectors for survey with id: ${params.surveyId}`
    );
  }

  return await getResponseData(res);
};

export const getSurveyResponses = async (params: {
  surveyId: string;
  page: number;
  sort: SortObject;
  token: string | null;
}): Promise<SurveyResponsesResData> => {
  const sortName = params.sort.column;
  const sortType = params.sort.type;
  const queryParamsObj = {
    page: params.page,
    sort: `${sortName}:${sortType}`,
  };
  const queryParamsStr = qs.stringify(queryParamsObj, { encode: false });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${params.surveyId}/responses?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + params.token,
        cache: "no-store",
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to get responses for survey with id: ${params.surveyId}`
    );
  }

  return await getResponseData(res);
};

export const getPageQuestionResults = async (params: {
  surveyId: string;
  pageId: string;
  token: string | null;
}): Promise<QuestionResult[]> => {
  const queryParamsObj = {
    pageId: params.pageId,
  };
  const queryParamsStr = qs.stringify(queryParamsObj);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${params.surveyId}/questions/result?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + params.token,
        cache: "no-store",
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to get results for survey with id: ${params.surveyId}`
    );
  }

  return await getResponseData(res);
};
