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
      className={`px-3 py-2 inline-flex font-medium items-center ${
        isActive
          ? "text-primary border-b-4 border-t-white border-t-4 border-secondary"
          : "text-slate-500 border-y-4 border-white"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default BuildSurveyNavigationLink;
