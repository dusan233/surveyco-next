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
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Copy, MoreVertical, Trash2 } from "lucide-react";
import useDeleteQuestion from "../_hooks/useDeleteQuestion";
import { useToast } from "@/components/ui/use-toast";
import CopyQuestionModal from "./copy-question-modal";
import MoveQuestionModal from "./move-question/move-question-modal";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import { useDisclosure } from "@/hooks/useDisclosure";

type QuestionActionsProps = {
  surveyId: string;
  questionId: string;
};

const QuestionActions = ({ surveyId, questionId }: QuestionActionsProps) => {
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { toast } = useToast();
  const { deleteQuestionMutation } = useDeleteQuestion(currentPage!);
  const {
    isOpen: isCopyQuestionOpen,
    onOpen: onOpenCopyQuestion,
    onToggle: onToggleCopyQuestion,
  } = useDisclosure();
  const {
    isOpen: isMoveQuestionOpen,
    onOpen: onOpenMoveQuestion,
    onToggle: onToggleMoveQuestion,
  } = useDisclosure();

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
        onError() {
          toast({
            variant: "destructive",
            title: "Something went wrong!",
          });
        },
      }
    );
  };

  return (
    <>
      <CopyQuestionModal
        questionId={questionId}
        surveyId={surveyId}
        isOpen={isCopyQuestionOpen}
        onOpenChange={onToggleCopyQuestion}
      />

      <MoveQuestionModal
        questionId={questionId}
        surveyId={surveyId}
        isOpen={isMoveQuestionOpen}
        onOpenChange={onToggleMoveQuestion}
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
            <DropdownMenuItem onClick={() => onOpenCopyQuestion()}>
              Copy
              <DropdownMenuShortcut>
                <Copy className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpenMoveQuestion()}>
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
