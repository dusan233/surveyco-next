import { z } from "zod";
import {
  createSurveySchema,
  loginSchema,
  multiChoiceQuestionSchema,
  placePageSchema,
  placeQuestionSchema,
  questionsResponsesSchema,
  signUpSchema,
  textboxQuestionSchema,
  verifyEmailAddressSchema,
} from "./validationSchemas";
import { Active, Collision, Translate, Over } from "@dnd-kit/core";

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
  description_image: string | null;
  number: number;
  surveyPageId: string;
  required: boolean;
  hasResponses: boolean;
}
export interface QuestionResultBase extends QuestionBase {
  answeredCount: number;
  skippedCount: number;
}
export type UnsavedQuestion = UnsavedMultiChoiceQuestion | UnsavedTextQuestion;
export type UnsavedMultiChoiceQuestion = {
  id?: string;
  type: QuestionType;
  description: string;
  description_image: null;
  options: Option[];
  number: number;
  required: boolean;
  randomize: boolean;
};
export type UnsavedTextQuestion = {
  id?: string;
  type: QuestionType;
  description: string;
  description_image: null;
  number: number;
  required: boolean;
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
export type PlaceQuestionData = z.infer<typeof placeQuestionSchema>;
export type PlacePageData = z.infer<typeof placePageSchema>;
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

export type VerifyEmailAddressData = z.infer<typeof verifyEmailAddressSchema>;
export type CreateSurveyData = z.infer<typeof createSurveySchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type SaveQuestionData = MultiChoiceQuestionData | TextQuestionData;
export type SortObject = {
  column: string;
  type: "asc" | "desc";
};

export type ApiError = {
  error: {
    message: string;
    code: string;
  };
};

export interface Option {
  description: string;
  description_image: string | null;
  number: number;
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

export interface MultipleChoiceQuestion extends QuestionBase, OptionsQuestion {
  randomize: boolean;
}

export interface CheckboxesQuestion extends QuestionBase, OptionsQuestion {
  options: Option[];
  randomize: boolean;
}

export interface DropdownQuestion extends QuestionBase, OptionsQuestion {
  randomize: boolean;
}

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
  question_count: number;
  page_count: number;
  survey_status: SurveyStatus;
}

export interface VolumeByDay {
  day: string;
  response_count: number;
}

export interface QuestionsResponseData {
  questions: Question[];
  page: string;
}

export interface SurveyResponse {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  surveyId: string;
  collectorId: string;
  collector: Collector;
  ip_address: string;
  status: "incomplete" | "complete";
  display_number: number;
}

export interface SurveyResponsesResData {
  current_page: number;
  data: SurveyResponse[];
  next_page: number | undefined;
  responses_count: number;
  total_pages: number;
}

export interface SurveyCollectorsResData {
  data: Collector[];
  total_pages: number;
  collector_count: number;
}

export interface UserSurveysResData {
  data: QuizResponseData[];
  total_pages: number;
}

export enum CollectorType {
  web_link = "web_link",
}

export enum SurveyStatus {
  open = "open",
  close = "close",
  draft = "draft",
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
export enum SurveyCategory {
  market_research = "market_research",
  academic_research = "academic_research",
  student_feedback = "student_feedback",
  event_feedback = "event_feedback",
  customer_feedback = "customer_feedback",
}
export interface MediaUploadResData {
  success: boolean;
  fileUrl: string;
}

interface DragEvent {
  activatorEvent: Event;
  active: Active;
  collisions: Collision[] | null;
  delta: Translate;
  over: Over;
}

export interface DragStartEvent extends Pick<DragEvent, "active"> {}
export interface DragMoveEvent extends DragEvent {}
export interface DragOverEvent extends DragMoveEvent {}
export interface DragEndEvent extends DragEvent {}
export interface DragCancelEvent extends DragEndEvent {}
