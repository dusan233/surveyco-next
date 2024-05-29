import React from "react";
import CreateCollector from "./create-collector";

type CollectorsHeaderProps = {
  surveyId: string;
};

const CollectorsHeader = ({ surveyId }: CollectorsHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
      <h1 className="text-2xl">Survey Collectors</h1>
      <CreateCollector surveyId={surveyId} />
    </div>
  );
};

export default CollectorsHeader;
