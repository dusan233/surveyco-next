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
import { ArrowUpDown, ChevronDown, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useDeleteSurveyPage from "../_hooks/useDeleteSurveyPage";
import CopySurveyPageModal from "./copy-survey-page-modal";
import MoveSurvePageModal from "./move-survey-page-modal";
import useBuildQuestionsContext from "../_hooks/useBuildQuestionsContext";
import useSurveyPages from "@/hooks/useSurveyPages";
import { useDisclosure } from "@/hooks/useDisclosure";

type QuestionActionsProps = {
  surveyId: string;
};

const PageActions = ({ surveyId }: QuestionActionsProps) => {
  const setCurrentPage = useBuildQuestionsContext((s) => s.setCurrentPage);
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const { surveyPages } = useSurveyPages(surveyId);
  const { toast } = useToast();
  const { deletePageMutation } = useDeleteSurveyPage();

  const {
    isOpen: isCopyPageOpen,
    onClose: onCloseCopyPage,
    onOpen: onOpenCopyPage,
  } = useDisclosure();
  const {
    isOpen: isMovePageOpen,
    onClose: onCloseMovePage,
    onOpen: onOpenMovePage,
  } = useDisclosure();

  const handleDeletePage = () => {
    const deletePageToast = toast({
      variant: "destructive",
      title: "Deleting page...",
    });

    deletePageMutation(
      { surveyId, pageId: currentPage!.id },
      {
        onSuccess() {
          const firstPage = surveyPages?.find((page) => page.number === 1);
          setCurrentPage(firstPage!);
          deletePageToast.dismiss();
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
      <CopySurveyPageModal
        isOpen={isCopyPageOpen}
        onClose={onCloseCopyPage}
        surveyId={surveyId}
      />
      <MoveSurvePageModal
        isOpen={isMovePageOpen}
        onClose={onCloseMovePage}
        surveyId={surveyId}
      />
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
            <DropdownMenuItem onClick={() => onOpenCopyPage()}>
              Copy page
              <DropdownMenuShortcut>
                <Copy className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpenMovePage()}>
              Move page
              <DropdownMenuShortcut>
                <ArrowUpDown className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={surveyPages!.length === 1}
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
    </>
  );
};

export default PageActions;
