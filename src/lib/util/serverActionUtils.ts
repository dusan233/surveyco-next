import { ErrorObj } from "@/types/common";

export function isSuccessData<TData extends ErrorObj | any>(
  val: TData
): val is Exclude<TData, ErrorObj> {
  if (typeof val === "object" && val && "error" in val) return false;
  return true;
}

export const handleServerActionRes = async <TData extends ErrorObj | any>(
  fn: () => Promise<TData>
) => {
  const data = await fn();
  if (isSuccessData(data)) {
    return data;
  } else {
    throw new Error((data as ErrorObj).error.message);
  }
};
