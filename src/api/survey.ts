import { parseResponseData } from "@/lib/util/responseUtils";
import { AccessToken, SortObject } from "@/types/common";
import {
  Question,
  QuestionResponse,
  QuestionResult,
  QuestionsResponseData,
} from "@/types/question";
import {
  Survey,
  SurveyCollectorsResData,
  SurveyPage,
  SurveyResponse,
  SurveyResponsesResData,
  VolumeByDay,
} from "@/types/survey";
import qs from "qs";

export const getSurvey = async ({
  surveyId,
  token,
}: {
  surveyId: string;
  token: AccessToken;
}): Promise<Survey> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Something went wrong!`);
  }

  return await parseResponseData(res);
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
    throw new Error(`Something went wrong!`);
  }

  return await parseResponseData(res);
};

export const getSurveyPages = async (
  surveyId: string
): Promise<SurveyPage[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/pages`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Something wrong!`);
  }

  return await parseResponseData(res);
};

export const getSurveyResponsesVolume = async (params: {
  surveyId: string;
  token: AccessToken;
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

  return await parseResponseData(res);
};

export const getSurveyResponse = async (params: {
  surveyId: string;
  responseId: string;
  pageId: string;
  accessToken: AccessToken | undefined;
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
    throw new Error(`Something went wrong!`);
  }

  return await parseResponseData(res);
};

export const getSurveyCollectors = async (params: {
  surveyId: string;
  page: number;
  sort: SortObject;
  token: AccessToken | undefined;
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
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Something went wrong!`);
  }

  return await parseResponseData(res);
};

export const getSurveyResponses = async (params: {
  surveyId: string;
  page: number;
  sort: SortObject;
  token: AccessToken;
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
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Something went wrong!`);
  }

  return await parseResponseData(res);
};

export const getPageQuestionResults = async (params: {
  surveyId: string;
  pageId: string;
  token: AccessToken;
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
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Something went wrong!`);
  }

  return await parseResponseData(res);
};
