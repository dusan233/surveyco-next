import React, { ReactNode } from "react";

const QuestionCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-5 shadow-sm rounded-lg bg-white border-l-4 border-l-indigo-400">
      {children}
    </div>
  );
};

export default QuestionCard;
