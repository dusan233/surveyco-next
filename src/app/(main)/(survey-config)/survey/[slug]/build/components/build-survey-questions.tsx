"use client";

import React, { useEffect } from "react";
import useSurveyQuestions from "@/hooks/useSurveyQuestions";
import BuildQuestionsList from "./build-questions-list";

import PageControlBar from "./page-control-bar";
import { useLoadingToast } from "@/hooks/useLoadingToast";
import useBuildQuestionsContext from "../hooks/useBuildQuestionsContext";
import AddQuestionDialog from "./add-question-dialog";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const BuildSurveyQuestions = ({ surveyId }: { surveyId: string }) => {
  const { isOpen, onToggle, onOpen } = useDisclosure();
  const currentPage = useBuildQuestionsContext((s) => s.currentPage);

  const { questions: questionsData, isFetching } = useSurveyQuestions(
    surveyId,
    currentPage!.id
  );

  const updateQuestions = useBuildQuestionsContext((s) => s.updateQuestions);
  const addingQuestion = useBuildQuestionsContext((s) => s.addingQuestion);
  const canSelectQuestion = useBuildQuestionsContext(
    (s) => s.canSelectQuestion
  );
  const setSelectedQuestion = useBuildQuestionsContext(
    (s) => s.setSelectedQuestion
  );
  const queueQuestion = useBuildQuestionsContext((s) => s.queueQuestion);

  //select new question if no other question is being saved at the moment.
  useEffect(() => {
    if (canSelectQuestion) {
      setSelectedQuestion(queueQuestion);
    }
  }, [canSelectQuestion, setSelectedQuestion, queueQuestion]);

  //sync useQuestions query data with store questions data.
  useEffect(() => {
    if (questionsData) {
      updateQuestions(questionsData);
    }
  }, [questionsData, updateQuestions]);

  //fillter out unsaved question on cancel adding new question.
  useEffect(() => {
    if (!addingQuestion) {
      updateQuestions((questions) => {
        return questions.filter((question) => question.id);
      });
    }
  }, [addingQuestion, updateQuestions]);

  useLoadingToast(isFetching, "Loading page...");

  return (
    <div className="p-5 sm:p-10 bg-accent max-w-screen-lg mx-auto">
      <PageControlBar surveyId={surveyId} />
      <BuildQuestionsList surveyId={surveyId} />
      <AddQuestionDialog open={isOpen} onOpenChange={onToggle} />
      <div className="flex justify-center">
        <Button onClick={() => onOpen()}>
          <span className="mr-2">
            <PlusIcon className="h-5 w-5" />
          </span>
          New Question
        </Button>
      </div>
    </div>
  );
};

export default BuildSurveyQuestions;
