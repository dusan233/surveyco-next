import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

const BuildSurveyNavigationLink = ({ href, children, isActive }: Props) => {
  return (
    <Link
      className={`py-3 border-b-0 ${
        isActive
          ? "text-blue-600 border-b-2  border-blue-600"
          : "text-neutral-800"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default BuildSurveyNavigationLink;
