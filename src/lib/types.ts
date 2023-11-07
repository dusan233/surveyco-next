import { Content } from "@tiptap/react";
import { z } from "zod";
import {
  multiChoiceQuestionSchema,
  textboxQuestionSchema,
} from "./validationSchemas";

export enum QuestionType {
  multiple_choice = "multiple_choice",
  checkboxes = "checkbox",
  dropdown = "dropdown",
  textbox = "textbox",
}

export interface QuestionBase {
  quizId: string;
  id: string;
  type: QuestionType;
  updated_at: string;
  created_at: string;
  description: string;
}
export type UnsavedQuestion = UnsavedMultiChoiceQuestion | UnsavedTextQuestion;
export type UnsavedMultiChoiceQuestion = {
  id?: string;
  updated_at: null;
  type: QuestionType;
  description: string;
  options: Option[];
};
export type UnsavedTextQuestion = {
  id?: string;
  updated_at: null;
  type: QuestionType;
  description: string;
};

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
  id?: string;
}

export interface OptionsQuestion {
  options: Option[];
}

export interface MultipleChoiceQuestion extends QuestionBase, OptionsQuestion {}

export interface CheckboxesQuestion extends QuestionBase, OptionsQuestion {
  options: Option[];
}

export interface DropdownQuestion extends QuestionBase, OptionsQuestion {}

export interface TextboxQuestion extends QuestionBase {}

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
}

export interface QuestionsResponseData {
  questions: Question[];
}
