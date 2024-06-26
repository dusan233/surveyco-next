"use server";

import { cookies } from "next/headers";
import cookie from "cookie";
import setCookie from "set-cookie-parser";
import { revalidatePath } from "next/cache";
import { getAccessToken } from "./helper";
import qs from "qs";
import { getResponseData, parseResponseData } from "@/lib/util/responseUtils";
import { CreateSurveyData, Survey, SurveyPage } from "@/types/survey";
import { ErrorObj, OperationPosition } from "@/types/common";
import {
  PlaceQuestionData,
  Question,
  QuestionResponse,
  QuestionsResponsesData,
  SaveQuestionData,
} from "@/types/question";
import { isSuccessData } from "@/lib/util/serverActionUtils";

export const createQuestion = async (
  surveyId: string,
  pageId: string,
  data: SaveQuestionData
): Promise<Question | ErrorObj> => {
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

  const resData = await getResponseData<Question>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/summary`);
    revalidatePath(`/survey/${surveyId}/results`);
    revalidatePath(`/survey/${surveyId}/results/individual`);
    revalidatePath(`/library`);
  }

  return resData;
};

export const updateQuestion = async (
  surveyId: string,
  data: SaveQuestionData
): Promise<Question | ErrorObj> => {
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

  const resData = await getResponseData<Question>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/summary`);
    revalidatePath(`/survey/${surveyId}/results`);
    revalidatePath(`/survey/${surveyId}/results/individual`);
  }

  return resData;
};

export const deleteQuestion = async (
  surveyId: string,
  questionId: string
): Promise<Question | ErrorObj> => {
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

  const resData = await getResponseData<Question>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/summary`);
    revalidatePath(`/survey/${surveyId}/results`);
    revalidatePath(`/survey/${surveyId}/results/individual`);
    revalidatePath(`/library`);
  }

  return resData;
};

export const deleteSurveyPage = async (
  surveyId: string,
  pageId: string
): Promise<SurveyPage | ErrorObj> => {
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
  const resData = await getResponseData<SurveyPage>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/summary`);
    revalidatePath(`/survey/${surveyId}/results`);
    revalidatePath(`/survey/${surveyId}/results/individual`);
  }

  return resData;
};

export const copySurveyPage = async (
  surveyId: string,
  sourcePageId: string,
  data: { position: OperationPosition; pageId: string }
): Promise<SurveyPage | ErrorObj> => {
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

  const resData = await getResponseData<SurveyPage>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/summary`);
    revalidatePath(`/survey/${surveyId}/results`);
    revalidatePath(`/survey/${surveyId}/results/individual`);
  }

  return resData;
};

export const moveSurveyPage = async (
  surveyId: string,
  sourcePageId: string,
  data: { position: OperationPosition; pageId: string }
): Promise<SurveyPage | ErrorObj> => {
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

  const resData = await getResponseData<SurveyPage>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/results`);
    revalidatePath(`/survey/${surveyId}/results/individual`);
  }

  return await getResponseData(res);
};

export const copyQuestion = async (
  surveyId: string,
  questionId: string,
  data: PlaceQuestionData
): Promise<Question | ErrorObj> => {
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

  const resData = await getResponseData<SurveyPage>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/library`);
    revalidatePath(`/survey/${surveyId}/results`);
    revalidatePath(`/survey/${surveyId}/summary`);
  }

  return await getResponseData(res);
};

export const moveQuestion = async (
  surveyId: string,
  questionId: string,
  data: PlaceQuestionData
): Promise<Question | ErrorObj> => {
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

  const resData = await getResponseData<SurveyPage>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/results`);
  }

  return await getResponseData(res);
};

export const createSurveyPage = async (
  surveyId: string
): Promise<SurveyPage | ErrorObj> => {
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
  const resData = await getResponseData<SurveyPage>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/summary`);
    revalidatePath(`/survey/${surveyId}/results`);
    revalidatePath(`/survey/${surveyId}/results/individual`);
  }

  return resData;
};

export const createSurvey = async (
  data: CreateSurveyData
): Promise<Survey | ErrorObj> => {
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

  const resData = await getResponseData<Survey>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/library`);
  }
  return resData;
};

export const getSurveyQuestionsAndResponses = async (
  surveyId: string,
  collectorId: string,
  pageId: string
): Promise<
  | {
      questions: Question[];
      questionResponses: QuestionResponse[];
      page: string;
    }
  | ErrorObj
> => {
  const surveyResponsesCookieVal = cookies().get("surveyResponses");
  const queryParamsObj = {
    collectorId,
    pageId,
  };
  const queryParamsStr = qs.stringify(queryParamsObj);

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

  return await getResponseData(res);
};

export const saveSurveyResponse = async (
  surveyId: string,
  data: QuestionsResponsesData,
  collectorId: string | null,
  pageId: string,
  surveyResposneStartTime: Date,
  isPreview: boolean
): Promise<{
  data: { submitted: boolean } | null;
  error: {
    errorCode: string;
    message: string;
  } | null;
}> => {
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

  const combinedCookieHeader = res.headers.get("set-cookie");
  const splitCookieHeaders = setCookie.splitCookiesString(
    combinedCookieHeader || ""
  );
  const formatedCookies = setCookie.parse(splitCookieHeaders, {
    decodeValues: true,
  });

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
      return {
        data: null,
        error: {
          errorCode: "SURVEY_UPDATED",
          message: "Survey data got updated by creator.",
        },
      };
    }

    return {
      data: null,
      error: {
        errorCode: "ERROR",
        message: "Something went wrong!",
      },
    };
  }
  const resData = await parseResponseData<{ submitted: boolean }>(res);
  return { error: null, data: resData };
};
