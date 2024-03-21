"use server";

import { SortObject, UserSurveysResData } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { getAccessToken } from "./helper";
import qs from "qs";
import { getResponseData } from "@/lib/utils";
import { cookies } from "next/headers";

export const getUserSurveys = async (
  page: number,
  sort: SortObject
): Promise<UserSurveysResData> => {
  const { userId } = auth();
  const token = await getAccessToken();

  const sortColumn = sort.column;
  const sortType = sort.type;
  const queryParamsObj = {
    page: page,
    sort: `${sortColumn}:${sortType}`,
  };
  const queryParamsStr = qs.stringify(queryParamsObj, { encode: false });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userId}/surveys?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  cookies().get("ducky");
  if (!res.ok) {
    throw new Error(`Failed to get surveys for user with id: ${userId}`);
  }

  return await getResponseData(res);
};
