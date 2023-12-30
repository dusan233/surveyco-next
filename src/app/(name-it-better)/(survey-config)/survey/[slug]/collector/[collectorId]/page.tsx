import { getCollector } from "@/app/actions";
import React from "react";
import UpdateCollectorNameForm from "../components/update-collector-name-form";
import Link from "next/link";
import { ChevronsLeftIcon } from "lucide-react";
import WebLinkCollector from "../components/web-link-collector";

const SurveyCollectorPage = async ({
  params,
}: {
  params: { collectorId: string; slug: string };
}) => {
  const collectorId = params.collectorId;
  const surveyId = params.slug;

  const collector = await getCollector(collectorId);
  console.log(collector);

  return (
    <div className="bg-slate-100 container mx-auto py-10">
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
      <WebLinkCollector collector={collector} />
    </div>
  );
};

export default SurveyCollectorPage;
