import { getSurveyCollectors } from "@/app/actions";
import React from "react";
import { CollectorsTable } from "./components/collectors-table";
import { columns } from "./components/collectors-table-columns";

const CollectResponses = async ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;

  const collectors = await getSurveyCollectors(surveyId);

  return (
    <div className="container mx-auto py-10">
      <CollectorsTable columns={columns} data={collectors} />
    </div>
  );
};

export default CollectResponses;
