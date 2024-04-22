import BuildSurveyNavigation from "@/components/survey/build-survey-navigation";

const surveyResultLinks = [
  {
    slug: "results",
    regex: "^/survey/[^/]+/results$",
    text: "question responses",
  },
  {
    slug: "results/individual",
    regex: "^/survey/[^/]+/results/individual$",
    text: "individual responses",
  },
];

export default function SurveyResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100">
      <div className="max-w-screen-lg mx-auto p-5 sm:p-10">
        <BuildSurveyNavigation sticky={false} links={surveyResultLinks} />
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
