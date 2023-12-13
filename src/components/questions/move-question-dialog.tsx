"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useSurveyPages from "@/lib/hooks/useSurveyPages";
import { Button } from "../ui/button";
import { OperationPosition } from "@/lib/types";
import useDownsizedQuestions from "@/lib/hooks/useDownsizedQuestions";
import { Skeleton } from "../ui/skeleton";
import useMoveQuestion from "@/lib/hooks/useMoveQuestion";
import { useLoadingToast } from "@/lib/hooks/useLoadingToast";

type CopyQuestionDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  surveyId: string;
  questionId: string;
};

const MoveQuestionDialog = ({
  isOpen,
  onOpenChange,
  surveyId,
  questionId,
}: CopyQuestionDialogProps) => {
  const { surveyPages } = useSurveyPages(surveyId);
  const { moveQuestionMutation, isPending } = useMoveQuestion();
  const [formPageId, setFormPageId] = useState(() => {
    return surveyPages!.find((page) => page.number === 1)!.id;
  });
  const [formQuestionId, setFormQuestionId] = useState<string | undefined>("");
  const [formPosition, setFormPosition] = useState<string | undefined>(
    OperationPosition.after
  );

  const currentPageNumber = surveyPages!.find(
    (page) => page.id === formPageId
  )!.number;
  const { questions, isLoading } = useDownsizedQuestions(
    surveyId,
    currentPageNumber
  );

  useEffect(() => {
    const questionId = questions
      ? questions[0]
        ? questions[0].id
        : undefined
      : undefined;
    setFormPosition(questionId ? OperationPosition.after : undefined);
    setFormQuestionId(questionId);
  }, [questions]);

  useLoadingToast(isPending, "Moving question...");

  const handleSubmit = async () => {
    moveQuestionMutation(
      {
        surveyId,
        questionId,
        pageNumber: currentPageNumber,
        data: {
          questionId: formQuestionId,
          pageId: formPageId,
          position: formPosition as OperationPosition,
        },
      },
      {
        onSuccess() {
          onOpenChange(false);
        },
      }
    );

    console.log({ formPageId, formPosition, formQuestionId });
  };

  const handleOpenChange = () => {
    if (!isPending) {
      onOpenChange((prev) => !prev);
    }
  };

  return (
    <Dialog modal onOpenChange={handleOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Move Question</DialogTitle>
          <DialogDescription>
            Copy this question and put it on ...
          </DialogDescription>
        </DialogHeader>
        <div className="gap-2  mt-5">
          <div className="flex items-end gap-2">
            <div className="min-w-[70px]">
              <div className="text-sm mb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Page
              </div>
              <Select value={formPageId} onValueChange={setFormPageId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {surveyPages?.map((page) => {
                    return (
                      <SelectItem key={page.id} value={page.id}>
                        {page.number}.
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <>
                <Skeleton className="h-6 w-[100px]" />
                <Skeleton className="h-6 w-[100px]" />
              </>
            ) : questions!.length > 0 ? (
              <>
                <div className="min-w-[100px]">
                  <div className="text-sm mb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Position
                  </div>
                  <Select value={formPosition} onValueChange={setFormPosition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={OperationPosition.after}>
                        After
                      </SelectItem>
                      <SelectItem value={OperationPosition.before}>
                        Before
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="max-w-[300px]">
                  <div className="text-sm mb-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Question
                  </div>
                  <Select
                    value={formQuestionId}
                    onValueChange={setFormQuestionId}
                  >
                    <SelectTrigger
                      onChange={(e) => {
                        console.log(e);
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {questions!.map((q) => {
                        return (
                          <SelectItem key={q.id} value={q.id}>
                            {q.number}.
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : null}
          </div>

          <DialogFooter className="mt-5">
            <Button
              disabled={isPending}
              onClick={() => onOpenChange(false)}
              size="sm"
            >
              Cancel
            </Button>
            <Button disabled={isPending} onClick={handleSubmit} size="sm">
              Copy question
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoveQuestionDialog;
