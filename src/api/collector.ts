import { getResponseData } from "@/lib/util/getResponseData";
import { Collector } from "@/types/collector";

export const getCollector = async (collectorId: string): Promise<Collector> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collector/${collectorId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch collector ${collectorId} for survey`);
  }

  return await getResponseData(res);
};
