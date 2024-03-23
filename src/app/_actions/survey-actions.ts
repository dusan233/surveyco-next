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
  QuestionsResponsesData,
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
import cookie from "cookie";
import setCookie from "set-cookie-parser";

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

  revalidatePath(`/survey/${surveyId}/summary`);
  revalidatePath(`/survey/${surveyId}/results`);
  revalidatePath(`/survey/${surveyId}/results/individual`);
  revalidatePath(`/library`);

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

  revalidatePath(`/survey/${surveyId}/summary`);
  revalidatePath(`/survey/${surveyId}/results`);
  revalidatePath(`/survey/${surveyId}/results/individual`);

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

  revalidatePath(`/survey/${surveyId}/summary`);
  revalidatePath(`/survey/${surveyId}/results`);
  revalidatePath(`/survey/${surveyId}/results/individual`);
  revalidatePath(`/library`);
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

  revalidatePath(`/survey/${surveyId}/summary`);
  revalidatePath(`/survey/${surveyId}/results`);
  revalidatePath(`/survey/${surveyId}/results/individual`);
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

  revalidatePath(`/survey/${surveyId}/summary`);
  revalidatePath(`/survey/${surveyId}/results`);
  revalidatePath(`/survey/${surveyId}/results/individual`);

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

  revalidatePath(`/survey/${surveyId}/summary`);
  revalidatePath(`/survey/${surveyId}/results`);
  revalidatePath(`/survey/${surveyId}/results/individual`);

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

export const saveSurveyResponse = async (
  surveyId: string,
  data: QuestionsResponsesData,
  collectorId: string | null,
  pageId: string,
  surveyResposneStartTime: Date,
  isPreview: boolean
): Promise<{ submitted: boolean }> => {
  const surveyResponsesCookie = cookies().get("surveyResponses");
  const blockedCollectorsCookie = cookies().get("blocked_col");
  let cookiesStr = "";
  if (surveyResponsesCookie) {
    const surveyResponsesCookieStr = cookie.serialize(
      surveyResponsesCookie.name,
      surveyResponsesCookie?.value
    );
    cookiesStr = surveyResponsesCookieStr;
  }
  if (blockedCollectorsCookie) {
    const blockedCollectorsCookieStr = cookie.serialize(
      blockedCollectorsCookie.name,
      blockedCollectorsCookie.value
    );
    cookiesStr = cookiesStr + "; " + blockedCollectorsCookieStr;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/quiz/${surveyId}/response`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Cookie: cookiesStr,
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
  // console.log(res.headers.get("set-cookie")?.split(","), "tulipi");
  const combinedCookieHeader = res.headers.get("set-cookie");
  const splitCookieHeaders = setCookie.splitCookiesString(
    combinedCookieHeader || ""
  );
  const formatedCookies = setCookie.parse(splitCookieHeaders, {
    decodeValues: true,
  });
  // console.log(donestuff, "huhiiii");
  // console.log(cookie.parse(res.headers.get("set-cookie")!));
  // console.log(cookie.parse(res.headers.get("set-cookie")!), "set-cookie");
  // res.headers.forEach((val, key, parent) => {
  //   console.log(val, key);
  // });

  // const setCookie = res.headers.get("set-cookie")

  // if(setCookie !== null) {
  //   const extractedCookie =  cookie.parse(setCookie);
  // }

  // const cookiesFromHeader = res.headers
  //   .getSetCookie()
  //   .map((cookieStr) => cookie.parse(cookieStr as string));

  formatedCookies.forEach((cookie) => {
    if (cookie.name === "surveyResponses") {
      cookies().set({
        name: cookie.name,
        value: cookie.value,
        maxAge: cookie.maxAge,
        sameSite: "none",
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
      });
    } else if (cookie.name === "blocked_col") {
      cookies().set({
        name: cookie.name,
        value: cookie.value,
        maxAge: cookie.maxAge,
        sameSite: "none",
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
      });
    }
  });

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
  console.log("gets here brah");
  return await getResponseData(res);
};
