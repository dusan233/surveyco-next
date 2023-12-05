import React, { createContext } from "react";
import { Question, SurveyPage, UnsavedQuestion } from "./types";

export const QuestionsListContext = createContext<{
  setPendingQuestion: React.Dispatch<React.SetStateAction<string | null>>;
  setAddingQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setCanSelectQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestions: (
    value: React.SetStateAction<(Question | UnsavedQuestion)[]>
  ) => void;
  addingQuestion: boolean;
  lastQuestionIndex: number;
  currentPage?: SurveyPage;
}>({
  setPendingQuestion: () => {},
  setAddingQuestion: () => {},
  setCanSelectQuestion: () => {},
  addingQuestion: false,
  lastQuestionIndex: 0,
  setQuestions: () => {},
});
