import { useIndividualResponseStore } from "@/lib/hooks/store/useIndividualResponseStore";
import React from "react";

type SurveyResponseTableActionProps = {
  responseId: string;
  collectorId: string;
};

const SurveyResponseTableAction = ({
  responseId,
  collectorId,
}: SurveyResponseTableActionProps) => {
  const setResponseData = useIndividualResponseStore(
    (state) => state.setResponseData
  );
  const setShowDialog = useIndividualResponseStore(
    (state) => state.setShowDialog
  );

  return (
    <div className="flex text-blue-500 justify-end">
      <button
        onClick={() => {
          setShowDialog(true);
          setResponseData({ responseId });
        }}
      >
        View
      </button>
    </div>
  );
};

export default SurveyResponseTableAction;
