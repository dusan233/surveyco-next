import React, { createContext } from "react";

export const QuestionsListContext = createContext<{
  setPendingQuestion: React.Dispatch<React.SetStateAction<string | null>>;
  setAddingQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setCanSelectQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  addingQuestion: boolean;
  lastQuestionIndex: number;
}>({
  setPendingQuestion: () => {},
  setAddingQuestion: () => {},
  setCanSelectQuestion: () => {},
  addingQuestion: false,
  lastQuestionIndex: 0,
});
