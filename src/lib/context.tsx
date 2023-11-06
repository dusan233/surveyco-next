import React, { createContext } from "react";

export const QuestionsListContext = createContext<{
  setSelectedQuestion: React.Dispatch<
    React.SetStateAction<string | number | null>
  >;
  setAddingQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  addingQuestion: boolean;
  lastQuestionIndex: number;
}>({
  setSelectedQuestion: () => {},
  setAddingQuestion: () => {},
  addingQuestion: false,
  lastQuestionIndex: 0,
});
