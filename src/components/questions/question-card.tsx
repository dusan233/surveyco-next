import React, { ReactNode } from "react";

const QuestionCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-2 py-5 sm:p-5 shadow-sm rounded-lg bg-white border-l-4 border-l-slate-600">
      {children}
    </div>
  );
};

export default QuestionCard;
