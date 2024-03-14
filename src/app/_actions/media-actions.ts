"use server";

import { MediaUploadResData } from "@/lib/types";
import { getResponseData } from "@/lib/utils";
import { getAccessToken } from "./helper";

export const uploadMedia = async (
  surveyId: string,
  formData: FormData
): Promise<MediaUploadResData> => {
  const token = await getAccessToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/media/create?surveyId=${surveyId}`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to upload media file`);
  }

  return await getResponseData(res);
};
