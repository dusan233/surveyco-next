import { getSurveyCollectors } from "@/app/actions";
import React from "react";
import { CollectorsTable } from "./components/collectors-table";
import { columns } from "./components/collectors-table-columns";
import CollectorsHeader from "./components/collectors-header";

const CollectResponsesPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const surveyId = params.slug;

  const collectors = await getSurveyCollectors(surveyId);

  return (
    <div className="p-5 sm:p-10 bg-slate-100 max-w-screen-lg mx-auto">
      <CollectorsHeader surveyId={surveyId} />
      <CollectorsTable columns={columns} data={collectors} />
    </div>
  );
};

export default CollectResponsesPage;
