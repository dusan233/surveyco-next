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

export type QuestionsResponsesData = z.infer<typeof questionsResponsesSchema>;
export type QuestionResponseData =
  QuestionsResponsesData["questionResponses"][number];

export type PlaceQuestionData = z.infer<typeof placeQuestionSchema>;
export type TextboxQuestionFormData = z.infer<typeof textboxQuestionSchema>;
export type MultiChoiceQuestionFormData = z.infer<
  typeof multiChoiceQuestionSchema
>;

export type SaveQuestionBase<T extends QuestionType> = {
  id?: string;
  type: T;
};
export type SaveMultiChoiceQuestionData = MultiChoiceQuestionFormData &
  SaveQuestionBase<
    | QuestionType.dropdown
    | QuestionType.checkboxes
    | QuestionType.multiple_choice
  >;
export type SaveTextboxQuestionData = TextboxQuestionFormData &
  SaveQuestionBase<QuestionType.textbox>;

export type SaveQuestionData =
  | SaveMultiChoiceQuestionData
  | SaveTextboxQuestionData;

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

export interface IQuestionType<T extends QuestionType> {
  type: T;
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
export interface UnsavedTextboxQuestion
  extends UnsavedQuestionBase,
    IQuestionType<QuestionType.textbox> {}
export interface UnsavedMultichoiceQuestion
  extends UnsavedQuestionBase,
    QuestionWithRandomize,
    QuestionWithOptions<"unsaved">,
    IQuestionType<QuestionType.multiple_choice> {}
export interface UnsavedCheckboxesQuestion
  extends UnsavedQuestionBase,
    QuestionWithRandomize,
    QuestionWithOptions<"unsaved">,
    IQuestionType<QuestionType.checkboxes> {}
export interface UnsavedDropdownQuestion
  extends UnsavedQuestionBase,
    QuestionWithRandomize,
    QuestionWithOptions<"unsaved">,
    IQuestionType<QuestionType.dropdown> {}

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
    UnsavedQuestionBase,
    IQuestionType<QuestionType.textbox> {}
export interface CheckboxesQuestion
  extends SavedQuestionBase,
    UnsavedQuestionBase,
    IQuestionType<QuestionType.checkboxes>,
    QuestionWithRandomize,
    QuestionWithOptions<"saved"> {}
export interface DropdownQuestion
  extends SavedQuestionBase,
    UnsavedQuestionBase,
    IQuestionType<QuestionType.dropdown>,
    QuestionWithRandomize,
    QuestionWithOptions<"saved"> {}
export interface MultichoiceQuestion
  extends SavedQuestionBase,
    UnsavedQuestionBase,
    IQuestionType<QuestionType.multiple_choice>,
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

export interface QuestionsResponseData {
  questions: Question[];
  page: string;
}
