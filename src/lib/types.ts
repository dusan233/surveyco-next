import { Content } from "@tiptap/react";

export enum QuestionType {
  multiple_choice = "multiple_choice",
  checkboxes = "checkbox",
  dropdown = "dropdown",
  textbox = "textbox",
}

export interface QuestionBase {
  id: number | string;
  type: QuestionType;
  updated_at: string | null;
  question_description: string;
}

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
