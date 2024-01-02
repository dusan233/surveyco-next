import { getQuestionResults } from "@/app/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Question } from "../types";

export const useQuestionResults = (surveyId: string, questions: Question[]) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["questions", "results", 1],
    queryFn: ({ pageParam }) => getQuestionResults(surveyId, pageParam),
    initialPageParam: ["dw"],
    getNextPageParam: (lastPage, pages) => {
      const lastFetchedQuestions = lastPage.toSorted(
        (a, b) => a.number - b.number
      );
      const lastQuestion =
        lastFetchedQuestions[lastFetchedQuestions.length - 1];
      const nextQuestionIds = questions
        .filter(
          (q) =>
            q.number > lastQuestion.number &&
            q.number <= lastQuestion.number + 5
        )
        .map((q) => q.id);

      return nextQuestionIds;
    },
  });

  const questionResults = data?.pages.flat();
  return {
    questionResults,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};
