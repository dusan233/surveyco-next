import React, { ReactNode } from "react";

const QuestionCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-5 rounded-lg bg-white border-l-4 border-l-blue-400">
      {children}
    </div>
  );
};

export default QuestionCard;
