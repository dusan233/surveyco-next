import { QuestionsResponsesData } from "@/lib/types";

export const saveSurveyResponse = async (
  surveyId: string,
  data: QuestionsResponsesData,
  collectorId: string
): Promise<{ message: string }> => {
  const res = await fetch(`http://localhost:8080/quiz/${surveyId}/response`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      questionResponses: data.questionResponses,
      collectorId,
    }),
  });

  if (!res.ok) {
    // throw new Error(`Failed to create page for survey with id: ${surveyId}`);
    console.log("error cookie thing");
  }

  return await res.json();
};
