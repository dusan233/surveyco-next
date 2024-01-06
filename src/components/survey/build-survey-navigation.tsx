"use client";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import React from "react";
import BuildSurveyNavigationLink from "./build-survey-navigation-link";

type BuildSurveyNavigationProps = {
  links: { slug: string; regex: string; text: string }[];
  sticky?: boolean;
};

const BuildSurveyNavigation = ({
  links,
  sticky = true,
}: BuildSurveyNavigationProps) => {
  const segments = usePathname().split("/").slice(1);
  const pathname = usePathname();
  const surveyId = segments[1];
  console.log(pathname);

  return (
    <div
      className={`border-b flex gap-6 mb-4 bg-white h-12 z-10 uppercase text-sm ${
        sticky && "sticky top-0"
      }`}
    >
      {links.map((link, index) => {
        const href = `/survey/${surveyId}/${link.slug}`;

        let isActive = new RegExp(link.regex).test(pathname);

        return (
          <BuildSurveyNavigationLink
            key={index}
            href={href}
            isActive={isActive}
          >
            {link.text}
          </BuildSurveyNavigationLink>
        );
      })}
    </div>
  );
};

export default BuildSurveyNavigation;
