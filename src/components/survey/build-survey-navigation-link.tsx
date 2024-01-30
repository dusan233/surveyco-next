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
      className={`p-3 inline-flex font-medium items-center border-b-0 ${
        isActive
          ? "text-emerald-600 border-b-4  border-primary"
          : "text-neutral-800"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default BuildSurveyNavigationLink;
