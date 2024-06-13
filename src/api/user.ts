import { parseResponseData } from "@/lib/util/responseUtils";
import { SortObject } from "@/types/common";
import { UserSurveysResData } from "@/types/survey";
import qs from "qs";

export const getUserSurveys = async (params: {
  page: number;
  sort: SortObject;
  userId: string | null;
  token: string | null;
}): Promise<UserSurveysResData> => {
  const sortColumn = params.sort.column;
  const sortType = params.sort.type;
  const queryParamsObj = {
    page: params.page,
    sort: `${sortColumn}:${sortType}`,
  };
  const queryParamsStr = qs.stringify(queryParamsObj, { encode: false });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/user/${params.userId}/surveys?${queryParamsStr}`,
    {
      headers: {
        Authorization: "Bearer " + params.token,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Something went wrong!`);
  }

  return await parseResponseData(res);
};
