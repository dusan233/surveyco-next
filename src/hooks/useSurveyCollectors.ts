import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSurveyCollectors } from "@/api/survey";
import { useAuth } from "@clerk/nextjs";
import { SortObject } from "@/types/common";
import { useLastSuccessData } from "./useLastSuccessData";

type UseSurveyCollectorsParams = {
  surveyId: string;
  page: number;
  sort: SortObject;
};

export default function useSurveyCollectors({
  surveyId,
  page,
  sort,
}: UseSurveyCollectorsParams) {
  const { getToken } = useAuth();

  const { data, ...queryInfo } = useQuery({
    staleTime: 0,
    queryKey: ["survey", surveyId, "collectors", page, sort],
    queryFn: async () => {
      const token = await getToken();
      return getSurveyCollectors({
        surveyId,
        page,
        sort,
        token,
      });
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { lastSuccessData } = useLastSuccessData(data);

  return {
    collectors: data?.data || lastSuccessData?.data,
    pageCount: data?.total_pages || lastSuccessData?.total_pages,
    ...queryInfo,
  };
}
