"use client";

import useSurveyResponses from "@/lib/hooks/useSurveyResponses";
import { QuizResponseData } from "@/lib/types";
import React from "react";
import { SurveyResponsesTable } from "./survey-responses-table";
import { columns } from "./survey-responses-table-columns";

type SurveyResponsesProps = {
  survey: QuizResponseData;
};

const SurveyResponsesView = ({ survey }: SurveyResponsesProps) => {
  const { responses, page, setPage } = useSurveyResponses(survey.id);

  return (
    <div>
      <SurveyResponsesTable columns={columns} data={responses!} />
    </div>
  );
};

export default SurveyResponsesView;
