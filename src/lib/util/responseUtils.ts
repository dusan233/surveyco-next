import { ApiError, ErrorObj } from "@/types/common";
import { formatApiError } from "./errorUtils";

export const parseResponseData = async <T>(res: Response): Promise<T> => {
  try {
    return await res.json();
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};

export const getResponseData = async <TSuccessData>(res: Response) => {
  if (!res.ok) {
    const errRes = await parseResponseData<ApiError>(res);
    const error: ErrorObj = {
      error: {
        message: formatApiError(errRes),
        data: null,
      },
    };
    return error;
  }

  return await parseResponseData<TSuccessData>(res);
};
