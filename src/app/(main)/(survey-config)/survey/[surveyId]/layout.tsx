import BuildSurveyNavigation from "@/components/survey/build-survey-navigation";
import { PropsWithChildren } from "react";

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

type BuildSurveyLayoutProps = {
  surveyTitle: React.ReactNode;
};

export default function BuildSurveyLayout({
  children,
  surveyTitle,
}: PropsWithChildren<BuildSurveyLayoutProps>) {
  return (
    <>
      {surveyTitle}
      <BuildSurveyNavigation links={surveyBuildLinks} />
      {children}
    </>
  );
}
