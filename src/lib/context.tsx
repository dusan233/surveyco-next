"use client";

import React, { ReactNode, createContext, useRef } from "react";
import { Question, SurveyPage, UnsavedQuestion } from "./types";
import { createStore } from "zustand";

interface BuildQuestionsStoreProps {
  questions: (Question | UnsavedQuestion)[];
  addingQuestion: boolean;
  selectedQuestion: string | null;
  canSelectQuestion: boolean;
  queueQuestion: string | null;
  currentPage: SurveyPage | null;
}

type QuestionData = Question | UnsavedQuestion;
type CallbackFunc = (data: QuestionData[]) => QuestionData[];

export interface BuildQuestionsStoreState extends BuildQuestionsStoreProps {
  updateQuestions: (
    param: CallbackFunc | (Question | UnsavedQuestion)[]
  ) => void;
  setAddingQuestion: (adding: boolean) => void;
  setSelectedQuestion: (questionId: string | null) => void;
  setCanSelectQuestion: (adding: boolean) => void;
  setQueueQuestion: (questionId: string | null) => void;
  setCurrentPage: (page: SurveyPage) => void;
}

type BuildQuestionsStore = ReturnType<typeof createBuildQuestionsStore>;

export const createBuildQuestionsStore = (
  initProps?: Partial<BuildQuestionsStoreProps>
) => {
  const DEFAULT_PROPS: BuildQuestionsStoreProps = {
    addingQuestion: false,
    selectedQuestion: null,
    canSelectQuestion: true,
    queueQuestion: null,
    currentPage: null,
    questions: [],
  };
  return createStore<BuildQuestionsStoreState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateQuestions: (param) =>
      set((state) => ({
        questions: typeof param === "function" ? param(state.questions) : param,
      })),
    setAddingQuestion: (addingQuestion) => set({ addingQuestion }),
    setSelectedQuestion: (qId) => set({ selectedQuestion: qId }),
    setCanSelectQuestion: (canSelectQuestion) => set({ canSelectQuestion }),
    setQueueQuestion: (qId) => set({ queueQuestion: qId }),
    setCurrentPage: (page) => set({ currentPage: page }),
  }));
};

export const BuildQuestionsContext = createContext<BuildQuestionsStore | null>(
  null
);

export const BuildQuestionsProvider = ({
  currentPage,
  questions,
  children,
}: {
  currentPage: SurveyPage;
  questions: Question[];
  children: ReactNode;
}) => {
  const buildQuestionsStore = useRef(
    createBuildQuestionsStore({
      currentPage,
      questions,
    })
  ).current;
  return (
    <BuildQuestionsContext.Provider value={buildQuestionsStore}>
      {children}
    </BuildQuestionsContext.Provider>
  );
};
