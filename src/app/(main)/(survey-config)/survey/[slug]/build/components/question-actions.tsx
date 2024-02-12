"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Copy, MoreVertical, Trash2 } from "lucide-react";
import useDeleteQuestion from "@/lib/hooks/useDeleteQuestion";
import { useToast } from "@/components/ui/use-toast";
import CopyQuestionDialog from "./copy-question-dialog";
import MoveQuestionDialog from "./move-question-dialog";
import useBuildQuestionsContext from "../useBuildQuestionsContext";

type QuestionActionsProps = {
  surveyId: string;
  questionId: string;
};

const QuestionActions = ({ surveyId, questionId }: QuestionActionsProps) => {
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { toast } = useToast();
  const { deleteQuestionMutation } = useDeleteQuestion(currentPage!);
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);

  const handleDeleteQuestion = () => {
    const deleteQuestionToast = toast({
      variant: "destructive",
      title: "Deleting question...",
    });

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
    <>
      <CopyQuestionDialog
        questionId={questionId}
        surveyId={surveyId}
        isOpen={isCopyOpen}
        onOpenChange={setIsCopyOpen}
      />

      <MoveQuestionDialog
        questionId={questionId}
        surveyId={surveyId}
        isOpen={isMoveOpen}
        onOpenChange={setIsMoveOpen}
      />

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
            <DropdownMenuItem onClick={() => setIsCopyOpen(true)}>
              Copy
              <DropdownMenuShortcut>
                <Copy className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsMoveOpen(true)}>
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
    </>
  );
};

export default QuestionActions;
