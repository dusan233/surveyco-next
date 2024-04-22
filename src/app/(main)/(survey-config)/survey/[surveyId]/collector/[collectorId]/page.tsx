import React from "react";
import UpdateCollectorNameForm from "../_components/update-collector-name-form";
import Link from "next/link";
import { ChevronsLeftIcon } from "lucide-react";
import CopyWebLink from "../_components/web-link-collector";
import { Metadata } from "next";
import { getCollector } from "@/api/collector";

export const metadata: Metadata = {
  title: "Surveyco - Collector Details",
  description: "Page dedicated for displaying details about collector.",
};

const SurveyCollectorPage = async ({
  params,
}: {
  params: { collectorId: string; surveyId: string };
}) => {
  const collectorId = params.collectorId;
  const surveyId = params.surveyId;

  const collector = await getCollector(collectorId);

  return (
    <div className="p-5 sm:p-10 bg-slate-100 max-w-screen-lg mx-auto">
      <div className="mb-10">
        <Link
          className="text-blue-500 inline-flex gap-1 items-center text-lg hover:underline"
          href={`/survey/${surveyId}/collectors`}
        >
          <ChevronsLeftIcon />
          Back to All Collectors
        </Link>
      </div>
      <UpdateCollectorNameForm collector={collector} />
      <CopyWebLink collector={collector} />
    </div>
  );
};

export default SurveyCollectorPage;
