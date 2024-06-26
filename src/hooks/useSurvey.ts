import { getSurvey } from "@/api/survey";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export default function useSurvey(surveyId: string) {
  const { getToken } = useAuth();
  const { data, ...queryInfo } = useQuery({
    queryKey: ["survey", surveyId],
    queryFn: async () => {
      const token = await getToken();
      return getSurvey({ surveyId, token });
    },
  });

  return { survey: data, ...queryInfo };
}
