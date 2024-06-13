"use server";

import { getAccessToken } from "./helper";
import { revalidatePath } from "next/cache";
import { getResponseData, parseResponseData } from "@/lib/util/responseUtils";
import { Collector, CollectorStatus, CollectorType } from "@/types/collector";
import { ErrorObj } from "@/types/common";
import { isSuccessData } from "@/lib/util/serverActionUtils";

export const createSurveyCollector = async (
  surveyId: string
): Promise<Collector | ErrorObj> => {
  const token = await getAccessToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/collector`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ surveyId, type: CollectorType.web_link }),
  });

  const resData = await getResponseData<Collector>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/collectors`);
    revalidatePath(`/survey/${surveyId}/summary`);
  }

  return resData;
};

export const updateSurveyCollector = async (
  collectorId: string,
  collectorName: string
): Promise<Collector | ErrorObj> => {
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

  const resData = await getResponseData<Collector>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${resData.surveyId}/collectors/${resData.id}`);
    revalidatePath(`/survey/${resData.surveyId}/summary`);
  }

  return resData;
};

export const updateSurveyCollectorStatus = async (
  collectorId: string,
  status: CollectorStatus
): Promise<Collector | ErrorObj> => {
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

  const resData = await getResponseData<Collector>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${resData.surveyId}/collectors`);
    revalidatePath(`/survey/${resData.surveyId}/summary`);
  }

  return resData;
};

export const deleteSurveyCollector = async (
  collectorId: string,
  surveyId: string
): Promise<Collector | ErrorObj> => {
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

  const resData = await getResponseData<Collector>(res);
  if (isSuccessData(resData)) {
    revalidatePath(`/survey/${surveyId}/collectors`);
    revalidatePath(`/survey/${surveyId}/summary`);
  }

  return resData;
};
