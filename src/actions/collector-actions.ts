"use server";

import { getAccessToken } from "./helper";
import { revalidatePath } from "next/cache";
import { updateCollectorNameSchema } from "@/lib/validationSchemas";
import { getResponseData } from "@/lib/util/getResponseData";
import { Collector, CollectorStatus, CollectorType } from "@/types/collector";

export const createSurveyCollector = async (
  surveyId: string
): Promise<Collector> => {
  const token = await getAccessToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/collector`, {
    method: "POST",
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
  revalidatePath(`/survey/${surveyId}/summary`);

  return await getResponseData(res);
};

export type UpdateCollectorFormState = {
  collector: Collector;
  message: string | null;
  errors: {
    name?: string[] | undefined;
  } | null;
  errorType: string | null;
};

export const updateSurveyCollector = async (
  collectorId: string,
  collectorName: string
) => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collector/${collectorId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: collectorName }),
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to update collector with id: ${collectorId}`);
  }

  const collector = await getResponseData<Collector>(res);
  revalidatePath(`/survey/${collector.surveyId}/collectors/${collector.id}`);
  revalidatePath(`/survey/${collector.surveyId}/summary`);

  return collector;
};

export const updateSurveyCollectorStatus = async (
  collectorId: string,
  status: CollectorStatus
): Promise<Collector> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collector/${collectorId}/status`,
    {
      method: "PUT",
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

  const collector = await getResponseData<Collector>(res);

  revalidatePath(`/survey/${collector.surveyId}/collectors`);
  revalidatePath(`/survey/${collector.surveyId}/summary`);

  return collector;
};

export const deleteSurveyCollector = async (
  collectorId: string,
  surveyId: string
) => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collector/${collectorId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to delete collector with id: ${collectorId}`);
  }

  revalidatePath(`/survey/${surveyId}/collectors`);
  revalidatePath(`/survey/${surveyId}/summary`);
};
