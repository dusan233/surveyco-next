import React, { ReactNode } from "react";

type SummarySectionHeadingProps = {
  children: ReactNode;
};

const SummarySectionHeading = ({ children }: SummarySectionHeadingProps) => {
  return <h1 className="text-2xl">{children}</h1>;
};

export default SummarySectionHeading;
