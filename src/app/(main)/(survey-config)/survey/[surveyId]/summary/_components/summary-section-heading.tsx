import React, { PropsWithChildren } from "react";

type SummarySectionHeadingProps = PropsWithChildren;

const SummarySectionHeading = ({ children }: SummarySectionHeadingProps) => {
  return <h1 className="text-2xl">{children}</h1>;
};

export default SummarySectionHeading;
