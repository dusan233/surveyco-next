import {
  Question,
  QuestionResponse,
  QuestionsResponsesData,
} from "@/lib/types";

export const getSurveyQuestionsAndResponses = async (
  surveyId: string,
  collectorId: string,
  pageNumber: number
): Promise<{
  questions: Question[];
  questionResponses: QuestionResponse[];
}> => {
  const res = await fetch(
    `http://localhost:8080/quiz/${surveyId}/responseData?collectorId=${collectorId}&page=${pageNumber}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    // throw new Error(`Failed to create page for survey with id: ${surveyId}`);
    console.log("error questions-responses thing");
  }

  return await res.json();
};

export const saveSurveyResponse = async (
  surveyId: string,
  data: QuestionsResponsesData,
  collectorId: string,
  submit: boolean
): Promise<{ submitted: boolean }> => {
  const res = await fetch(`http://localhost:8080/quiz/${surveyId}/response`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      questionResponses: data.questionResponses,
      collectorId,
      ...(submit && { submit: true }),
    }),
  });

  if (!res.ok) {
    // throw new Error(`Failed to create page for survey with id: ${surveyId}`);
    console.log("error cookie thing");
  }

  return await res.json();
};
