import React, { createContext } from "react";
import { SurveyPage } from "./types";

export const QuestionsListContext = createContext<{
  setPendingQuestion: React.Dispatch<React.SetStateAction<string | null>>;
  setAddingQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setCanSelectQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  addingQuestion: boolean;
  lastQuestionIndex: number;
  currentPage?: SurveyPage;
}>({
  setPendingQuestion: () => {},
  setAddingQuestion: () => {},
  setCanSelectQuestion: () => {},
  addingQuestion: false,
  lastQuestionIndex: 0,
});
