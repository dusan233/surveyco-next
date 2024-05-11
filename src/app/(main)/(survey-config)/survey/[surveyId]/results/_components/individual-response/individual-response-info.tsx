import { CollectorType } from "@/types/collector";
import { SurveyResponse } from "@/types/survey";
import { format } from "date-fns";
import React from "react";

interface IndividualResponseInfoProps {
  surveyResponse: SurveyResponse;
}

const IndividualResponseInfo = ({
  surveyResponse,
}: IndividualResponseInfoProps) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 font-bold">
        <span className="font-bold">Status:</span>
        {surveyResponse.status === "complete" ? (
          <span className="text-green-500">Complete</span>
        ) : (
          <span className="text-yellow-300">Incomplete</span>
        )}
      </div>
      <div className="flex gap-2">
        <span className="font-bold">Collector:</span>
        <span>
          {surveyResponse.collector.name} (
          {surveyResponse.collector.type === CollectorType.web_link &&
            "Weblink"}
          )
        </span>
      </div>
      <div className="flex gap-2">
        <span className="font-bold">Last Modified:</span>
        <span>
          {format(
            new Date(surveyResponse.updated_at!),
            "EEEE, MMMM dd, yyyy h:mm:ss a"
          )}
        </span>
      </div>
      <div className="flex gap-2">
        <span className="font-bold">IP Address:</span>
        <span>{surveyResponse.ip_address}</span>
      </div>
    </div>
  );
};

export default IndividualResponseInfo;
