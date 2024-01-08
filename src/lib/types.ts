import { Content } from "@tiptap/react";
import { z } from "zod";
import {
  multiChoiceQuestionSchema,
  placePageSchema,
  placeQuestionSchema,
  questionsResponsesSchema,
  textboxQuestionSchema,
} from "./validationSchemas";

export enum QuestionType {
  multiple_choice = "multiple_choice",
  checkboxes = "checkbox",
  dropdown = "dropdown",
  textbox = "textbox",
}

export enum OperationPosition {
  after = "after",
  before = "before",
}

export interface QuestionBase {
  quizId: string;
  id: string;
  type: QuestionType;
  updated_at: string;
  created_at: string;
  description: string;
  number: number;
  surveyPageId: string;
}
export interface QuestionResultBase extends QuestionBase {
  answeredCount: number;
  skippedCount: number;
}
export type UnsavedQuestion = UnsavedMultiChoiceQuestion | UnsavedTextQuestion;
export type UnsavedMultiChoiceQuestion = {
  id?: string;
  updated_at: null;
  type: QuestionType;
  description: string;
  options: Option[];
  number: number;
};
export type UnsavedTextQuestion = {
  id?: string;
  updated_at: null;
  type: QuestionType;
  description: string;
  number: number;
};
export type QuestionResponse = {
  id: string;
  surveyResponseId: string;
  questionId: string;
  answer: {
    id: string;
    questionResponseId: string;
    questionOptionId: string | null;
    questionId: string;
    textAnswer: string | null;
  }[];
};

export type CopyQuestionData = z.infer<typeof placeQuestionSchema>;
export type CopyPageData = z.infer<typeof placePageSchema>;
export type QuestionsResponsesData = z.infer<typeof questionsResponsesSchema>;

export type MultiChoiceQuestionData = z.infer<
  typeof multiChoiceQuestionSchema
> & {
  id?: string;
  type: QuestionType;
};
export type TextQuestionData = z.infer<typeof textboxQuestionSchema> & {
  id?: string;
  type: QuestionType;
};

export type SaveQuestionData = MultiChoiceQuestionData | TextQuestionData;

export interface Option {
  description: string;
  id: string;
}

export interface OptionsQuestion {
  options: Option[];
}
export interface ChoicesResult {
  choices: ChoiceResult[];
}

export interface ChoiceResult extends Option {
  answeredCount: number;
}
export interface MultipleChoiceQuestionResult
  extends QuestionResultBase,
    ChoicesResult {}
export interface TextboxQuestionResult extends QuestionResultBase {
  answers: {
    id: string;
    questionResponseId: string;
    text: string | null;
    updated_at: string;
  }[];
}

export interface MultipleChoiceQuestion extends QuestionBase, OptionsQuestion {}

export interface CheckboxesQuestion extends QuestionBase, OptionsQuestion {
  options: Option[];
}

export interface DropdownQuestion extends QuestionBase, OptionsQuestion {}

export interface TextboxQuestion extends QuestionBase {}

export interface SurveyPage {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  surveyId: string;
  number: number;
  totalQuestions: number;
}

export type QuestionResult =
  | TextboxQuestionResult
  | MultipleChoiceQuestionResult;
export type Question =
  | MultipleChoiceQuestion
  | CheckboxesQuestion
  | DropdownQuestion
  | TextboxQuestion;

export interface QuizResponseData {
  id: string;
  creatorId: string;
  title: string;
  category: string;
  created_at: Date;
  updated_at: Date;
  questions: Question[];
  responses_count: number;
}

export interface QuestionsResponseData {
  questions: Question[];
}

export interface SurveyResponse {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  surveyId: string;
  collectorId: string;
  collector: Collector;
}

export interface SurveyResponsesResData {
  current_page: number;
  data: SurveyResponse[];
  next_page: number | undefined;
  responses_count: number;
}

export enum CollectorType {
  web_link = "web_link",
}

export interface Collector {
  id: string;
  type: CollectorType;
  created_at: Date;
  updated_at: Date;
  status: string;
  surveyId: string;
  name: string;
  total_responses: number;
}
export enum CollectorStatus {
  open = "open",
  closed = "closed",
}
