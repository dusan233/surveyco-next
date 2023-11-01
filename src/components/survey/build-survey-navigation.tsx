"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import React from "react";
import BuildSurveyNavigationLink from "./build-survey-navigation-link";

const surveyBuildLinks = [
  { slug: "summary", text: "summary" },
  { slug: "build", text: "build survey" },
  { slug: "preview", text: "preview" },
  { slug: "collect-responses", text: "collect responses" },
  { slug: "results", text: "results" },
];

const BuildSurveyNavigation = () => {
  const segment = useSelectedLayoutSegments();
  const surveyId = segment[1];

  return (
    <div className="border-y flex gap-6 mb-4 uppercase text-sm">
      {surveyBuildLinks.map((link, index) => {
        const href = `/survey/${surveyId}/${link.slug}`;
        const isActive = segment.join("") === href.replaceAll("/", "");

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
