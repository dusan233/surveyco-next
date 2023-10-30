import React, { createContext } from "react";

export const QuestionsListContext = createContext<{
  setSelectedQuestion: React.Dispatch<
    React.SetStateAction<string | number | null>
  >;
}>({ setSelectedQuestion: () => {} });
