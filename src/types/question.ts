import {
  multiChoiceQuestionSchema,
  placeQuestionSchema,
  questionsResponsesSchema,
  textboxQuestionSchema,
} from "@/lib/validationSchemas";
import { z } from "zod";
import { Timestamps } from "./common";

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

export type PlaceQuestionData = z.infer<typeof placeQuestionSchema>;
export type QuestionsResponsesData = z.infer<typeof questionsResponsesSchema>;
export type QuestionResponseData = {
  questionId: string;
  required: boolean;
  answer: (string | string[]) & (string | string[] | undefined);
  questionType: QuestionType;
  id?: string | undefined;
};
export type TextboxQuestionFormData = z.infer<typeof textboxQuestionSchema>;
export type MultiChoiceQuestionFormData = z.infer<
  typeof multiChoiceQuestionSchema
>;

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

//results related
//results related
//results related
//results related
//results related
//results related
//results related
//results related
export interface QuestionResultBase
  extends SavedQuestionBase,
    UnsavedQuestionBase,
    Timestamps {
  answeredCount: number;
  skippedCount: number;
}
export interface ChoicesResult {
  choices: ChoiceResult[];
}
export interface ChoiceResult extends QuestionOption {
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

export type QuestionResult =
  | TextboxQuestionResult
  | MultipleChoiceQuestionResult;
//results related
//results related
//results related
//results related
//results related
//results related
//results related
//results related
//results related
//results related
//results related

export enum QuestionType {
  multiple_choice = "multiple_choice",
  checkboxes = "checkbox",
  dropdown = "dropdown",
  textbox = "textbox",
}

export interface QuestionsResData {
  questions: Question[];
  page: string;
}

export interface UnsavedQuestionBase {
  description: string;
  description_image: null | string;
  number: number;
  required: boolean;
}
export interface UnsavedTextboxQuestion extends UnsavedQuestionBase {
  type: QuestionType.textbox;
}
export interface UnsavedMultichoiceQuestion extends UnsavedQuestionBase {
  type: QuestionType.multiple_choice;
}
export interface UnsavedCheckboxesQuestion extends UnsavedQuestionBase {
  type: QuestionType.checkboxes;
}
export interface UnsavedDropdownQuestion extends UnsavedQuestionBase {
  type: QuestionType.dropdown;
}

export type UnsavedQuestion =
  | UnsavedTextboxQuestion
  | UnsavedCheckboxesQuestion
  | UnsavedDropdownQuestion
  | UnsavedMultichoiceQuestion;

export interface SavedQuestionBase extends Timestamps {
  id: string;
  quizId: string;
  surveyPageId: string;
  hasResponses: boolean;
}

export interface TextboxQuestion
  extends SavedQuestionBase,
    UnsavedTextboxQuestion {}
export interface CheckboxesQuestion
  extends SavedQuestionBase,
    UnsavedCheckboxesQuestion,
    QuestionWithRandomize,
    QuestionWithOptions<"saved"> {}
export interface DropdownQuestion
  extends SavedQuestionBase,
    UnsavedDropdownQuestion,
    QuestionWithRandomize,
    QuestionWithOptions<"saved"> {}
export interface MultichoiceQuestion
  extends SavedQuestionBase,
    UnsavedMultichoiceQuestion,
    QuestionWithRandomize,
    QuestionWithOptions<"saved"> {}

export type Question =
  | MultichoiceQuestion
  | CheckboxesQuestion
  | DropdownQuestion
  | TextboxQuestion;

export interface QuestionWithOptions<T extends "saved" | "unsaved"> {
  options: (T extends "saved" ? QuestionOption : UnsavedQuestionOption)[];
}

export interface QuestionWithRandomize {
  randomize: boolean;
}

export interface UnsavedQuestionOption {
  description: string;
  description_image: string | null;
  number: number;
}
export interface QuestionOption extends UnsavedQuestionOption, Timestamps {
  id: string;
}
