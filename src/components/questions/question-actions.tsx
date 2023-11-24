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
import { ArrowUpDown, Copy, MoreVertical, Trash2 } from "lucide-react";
import useDeleteQuestion from "@/lib/hooks/useDeleteQuestion";
import { SurveyPage } from "@/lib/types";
import { useToast } from "../ui/use-toast";

type QuestionActionsProps = {
  currentPage: SurveyPage;
  surveyId: string;
  questionId: string;
};

const QuestionActions = ({
  currentPage,
  surveyId,
  questionId,
}: QuestionActionsProps) => {
  const { toast } = useToast();
  const { deleteQuestionMutation } = useDeleteQuestion(currentPage);

  const handleDeleteQuestion = () => {
    const deleteQuestionToast = toast({
      variant: "destructive",
      title: "Deleting question...",
    });
    console.log(surveyId, questionId, currentPage.number);
    deleteQuestionMutation(
      { surveyId, questionId },
      {
        onSuccess() {
          deleteQuestionToast.dismiss();
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Question actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Copy
            <DropdownMenuShortcut>
              <Copy className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Move
            <DropdownMenuShortcut>
              <ArrowUpDown className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleDeleteQuestion}
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

export default QuestionActions;
