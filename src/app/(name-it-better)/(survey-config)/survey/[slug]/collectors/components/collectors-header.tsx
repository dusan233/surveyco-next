import React from "react";
import CreateCollector from "./create-collector";

type CollectorsHeaderProps = {
  surveyId: string;
};

const CollectorsHeader = ({ surveyId }: CollectorsHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-2 mb-10">
      <h2 className="text-2xl">Survey Collectors</h2>
      <CreateCollector surveyId={surveyId} />
    </div>
  );
};

export default CollectorsHeader;
