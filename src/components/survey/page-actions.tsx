"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  ChevronDown,
  Copy,
  MoreVertical,
  Trash2,
} from "lucide-react";
import useDeleteQuestion from "@/lib/hooks/useDeleteQuestion";
import { SurveyPage } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import useDeleteSurveyPage from "@/lib/hooks/useDeleteSurveyPage";

type QuestionActionsProps = {
  surveyId: string;
  currentPage: SurveyPage;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const PageActions = ({
  surveyId,
  currentPage,
  setCurrentPageNumber,
}: QuestionActionsProps) => {
  const { toast } = useToast();

  const { deletePageMutation } = useDeleteSurveyPage();

  const handleDeletePage = () => {
    const deletePageToast = toast({
      variant: "destructive",
      title: "Deleting page...",
    });

    deletePageMutation(
      { surveyId, pageId: currentPage.id },
      {
        onSuccess() {
          setCurrentPageNumber(1);
          deletePageToast.dismiss();
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1" size="default">
          Page actions
          <ChevronDown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Page actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Copy page
            <DropdownMenuShortcut>
              <Copy className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Move page
            <DropdownMenuShortcut>
              <ArrowUpDown className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleDeletePage}
          className="bg-red-500 text-white focus:bg-red-600 focus:text-white"
        >
          Delete
          <DropdownMenuShortcut>
            <Trash2 className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PageActions;
