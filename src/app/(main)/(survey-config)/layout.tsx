"use client";

import BuildSurveyNavigation from "@/components/survey/build-survey-navigation";
import { Skeleton } from "@/components/ui/skeleton";
import useSurvey from "@/lib/hooks/useQuiz";
import { useParams } from "next/navigation";

const surveyBuildLinks = [
  { slug: "summary", regex: "^/survey/[^/]+/summary$", text: "summary" },
  { slug: "build", regex: "^/survey/[^/]+/build$", text: "build survey" },
  { slug: "preview", regex: "^/survey/[^/]+/preview$", text: "preview" },
  {
    slug: "collectors",
    regex: "^/survey/[^/]+/collector(s)?(?:/[^/]+)?$",
    text: "collect responses",
  },
  {
    slug: "results",
    regex: "^/survey/[^/]+/results(?:/individual)?$",
    text: "results",
  },
];

export default function BuildSurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const surveyId = useParams().slug;

  const { survey, isLoading } = useSurvey(surveyId as string);

  return (
    <>
      <div className="bg-slate-800 flex items-center min-h-[100px] px-4 sm:px-10 ">
        {isLoading ? (
          <Skeleton className="h-8 w-full max-w-md" />
        ) : (
          <h1 className="text-2xl text-white font-bold py-4 break-words">
            {survey!.title}
          </h1>
        )}
      </div>
      <BuildSurveyNavigation links={surveyBuildLinks} />
      {children}
    </>
  );
}
