"use server";

import { MediaUploadResData } from "@/types/upload";
import { getAccessToken } from "./helper";
import { getResponseData } from "@/lib/util/getResponseData";

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
