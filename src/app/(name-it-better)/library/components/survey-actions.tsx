"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BarChart3Icon,
  MoreHorizontal,
  PencilIcon,
  SendIcon,
} from "lucide-react";
import React from "react";
import { QuizResponseData } from "@/lib/types";
import Link from "next/link";

type CollectorActionsProps = {
  survey: QuizResponseData;
};

const SurveyActions = ({ survey }: CollectorActionsProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <Link href={`/survey/${survey.id}/build`}>
              <DropdownMenuItem>
                Build survey
                <DropdownMenuShortcut>
                  <PencilIcon className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href={`/survey/${survey.id}/collectors`}>
              <DropdownMenuItem>
                Survey collectors
                <DropdownMenuShortcut>
                  <SendIcon className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href={`/survey/${survey.id}/results`}>
              <DropdownMenuItem>
                Survey results
                <DropdownMenuShortcut>
                  <BarChart3Icon className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SurveyActions;
