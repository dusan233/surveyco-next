import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUserSurveys } from "@/api/user";
import { useAuth } from "@clerk/nextjs";
import { SortObject } from "@/types/common";
import { useLastSuccessData } from "@/hooks/useLastSuccessData";

type UseUserSurveyParams = {
  page: number;
  sort: SortObject;
};

export default function useUserSurveys({ page, sort }: UseUserSurveyParams) {
  const { userId, getToken } = useAuth();

  const { data, ...queryInfo } = useQuery({
    staleTime: 0,
    queryKey: ["user", "surveys", page, sort],
    queryFn: async () => {
      return getUserSurveys({
        page,
        sort,
        token: await getToken(),
        userId: userId!,
      });
    },
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { lastSuccessData } = useLastSuccessData(data);

  return {
    surveys: data?.data || lastSuccessData?.data,
    pageCount: data?.total_pages || lastSuccessData?.total_pages,
    ...queryInfo,
  };
}
