import { Content } from "@tiptap/react";

export enum QuestionType {
  multiple_choice = "multiple_choice",
  checkboxes = "checkbox",
  dropdown = "dropdown",
  textbox = "textbox",
}

export interface QuestionBase {
  quizId: string;
  id: number | string;
  type: QuestionType;
  updated_at: string;
  created_at: string;
  description: string;
}
export type UnsavedQuestion =
  | { id: number; updated_at: null; type: QuestionType; description: string }
  | {
      id: number;
      updated_at: null;
      type: QuestionType;
      description: string;
      options: Option[];
    };

export interface Option {
  description: string;
  id?: string | number;
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
  questions: [];
}
