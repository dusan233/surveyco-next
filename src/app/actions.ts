"use server";
import {
  Collector,
  CollectorStatus,
  CollectorType,
  CopyQuestionData,
  OperationPosition,
  Question,
  QuestionResponse,
  QuestionsResponseData,
  QuizResponseData,
  SaveQuestionData,
  SurveyPage,
} from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import cookie from "cookie";
import { revalidatePath } from "next/cache";

export const getSurvey = async (
  surveyId: string
): Promise<QuizResponseData> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(`${process.env.BACKEND_API}/quiz/${surveyId}`, {
    cache: "no-cache",
    credentials: "include",
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
      credentials: "include",
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
    credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
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

export const createQuestion = async (
  surveyId: string,
  pageId: string,
  data: SaveQuestionData
): Promise<Question> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/question`,
    {
      method: "POST",
      credentials: "include",
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

  return await res.json();
};

export const updateQuestion = async (
  surveyId: string,
  data: SaveQuestionData
): Promise<Question> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/question`,
    {
      method: "PUT",
      credentials: "include",
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
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to delete question with id: ${questionId}`);
  }
};

export const deleteSurveyPage = async (surveyId: string, pageId: string) => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/page/${pageId}`,
    {
      method: "DELETE",
      credentials: "include",
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
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/page/${sourcePageId}/copy`,
    {
      method: "POST",
      credentials: "include",
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

  return await res.json();
};

export const moveSurveyPage = async (
  surveyId: string,
  sourcePageId: string,
  data: { position: OperationPosition; pageId: string }
): Promise<SurveyPage> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/quiz/${surveyId}/page/${sourcePageId}/move`,
    {
      method: "PUT",
      credentials: "include",
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

  return await res.json();
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
      credentials: "include",
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
      credentials: "include",
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
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to create page for survey with id: ${surveyId}`);
  }

  return await res.json();
};

export const getSurveyCollectors = async (
  surveyId: string
): Promise<Collector[]> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(`http://localhost:8080/quiz/${surveyId}/collectors`, {
    cache: "no-cache",
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch collectors for survey with id: ${surveyId}`
    );
  }

  return await res.json();
};

export const createSurveyCollector = async (
  surveyId: string
): Promise<Collector> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(`http://localhost:8080/collector`, {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ surveyId, type: CollectorType.web_link }),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch collectors for survey with id: ${surveyId}`
    );
  }

  revalidatePath(`/survey/${surveyId}/collectors`);

  return await res.json();
};

export const updateSurveyCollectorStatus = async (
  collectorId: string,
  status: CollectorStatus
): Promise<Collector> => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/collector/${collectorId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to delete collector with id: ${collectorId}`);
  }

  const collector = await res.json();

  revalidatePath(`/survey/${collector.surveyId}/collectors`);

  return collector;
};

export const deleteSurveyCollector = async (
  collectorId: string,
  surveyId: string
) => {
  const { getToken } = auth();
  const token = await getToken();

  const res = await fetch(
    `${process.env.BACKEND_API}/collector/${collectorId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to delete collector with id: ${collectorId}`);
  }

  revalidatePath(`/survey/${surveyId}/collectors`);
};

export const getSurveyQuestionsAndResponses = async (
  surveyId: string,
  collectorId: string,
  pageNumber: number
): Promise<{
  questions: Question[];
  questionResponses: QuestionResponse[];
}> => {
  const surveyResponsesCookieVal = cookies().get("surveyResponses");

  const res = await fetch(
    `http://localhost:8080/quiz/${surveyId}/responseData?collectorId=${collectorId}&page=${pageNumber}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: surveyResponsesCookieVal
          ? surveyResponsesCookieVal.name + "=" + surveyResponsesCookieVal.value
          : "",
      },
    }
  );

  if (!res.ok) {
    // throw new Error(`Failed to create page for survey with id: ${surveyId}`);
    console.log("error questions-responses thing");
  }

  return await res.json();
};

// export const saveSurveyResponse = async (
//   surveyId: string
// ): Promise<{ message: string }> => {
//   "use client";
//   // const surveyResponsesCookieObj = cookies().get("surveyResponses");
//   // const serializedCookie = surveyResponsesCookieObj
//   //   ? cookie.serialize(
//   //       surveyResponsesCookieObj.name,
//   //       surveyResponsesCookieObj?.value
//   //     )
//   //   : "";
//   const res = await fetch(
//     `${process.env.BACKEND_API}/quiz/${surveyId}/response`,
//     {
//       method: "PUT",
//       credentials: "include",
//       // headers: {
//       //   Cookie: serializedCookie,
//       // },
//     }
//   );

//   if (!res.ok) {
//     // throw new Error(`Failed to create page for survey with id: ${surveyId}`);
//     console.log("error cookie thing");
//   }
//   // console.log(cookies().get("surveyResponses"), "dd");
//   // res.headers.getSetCookie().forEach((cookieString) => {
//   //   const parsedCookie = cookie.parse(cookieString);
//   //   const cookieName = Object.keys(parsedCookie)[0];
//   //   const cookieValue = parsedCookie[cookieName];

//   //   console.log(parsedCookie, "parsed");
//   //   cookies().set({
//   //     name: cookieName,
//   //     value: cookieValue,
//   //     httpOnly: true,
//   //   });
//   // });

//   return await res.json();
// };
