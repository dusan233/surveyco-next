import BuildSurveyNavigation from "@/components/survey/build-survey-navigation";

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
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold py-4">
          This is the title of survey/quiz
        </h1>
      </div>
      <BuildSurveyNavigation links={surveyBuildLinks} />
      {children}
    </>
  );
}
