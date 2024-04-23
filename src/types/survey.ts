import { createSurveySchema, placePageSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import { Collector } from "./collector";
import { Timestamps, WeekDays } from "./common";

export type CreateSurveyData = z.infer<typeof createSurveySchema>;

export type PlacePageData = z.infer<typeof placePageSchema>;

export interface SurveyPage extends Timestamps {
  id: string;
  surveyId: string;
  number: number;
  totalQuestions: number;
}

export interface SurveyBase extends Timestamps {
  id: string;
  title: string;
  category: SurveyCategory;
}

export interface Survey extends SurveyBase, Timestamps {
  creatorId: string;
  responses_count: number;
  question_count: number;
  page_count: number;
  survey_status: SurveyStatus;
}
export enum SurveyStatus {
  open = "open",
  close = "close",
  draft = "draft",
}

export enum SurveyResponseStatus {
  incomplete = "incomplete",
  complete = "complete",
}

export interface VolumeByDay {
  day: WeekDays;
  response_count: number;
}

export interface SurveyResponsesResData {
  data: SurveyResponse[];
  responses_count: number;
  total_pages: number;
}

export interface UserSurveysResData {
  data: Survey[];
  total_pages: number;
}

export interface SurveyCollectorsResData {
  data: Collector[];
  total_pages: number;
  collector_count: number;
}

export interface SurveyResponse extends Timestamps {
  id: string;
  surveyId: string;
  collectorId: string;
  collector: Collector;
  ip_address: string;
  status: SurveyResponseStatus;
  display_number: number;
}

export enum SurveyCategory {
  market_research = "market_research",
  academic_research = "academic_research",
  student_feedback = "student_feedback",
  event_feedback = "event_feedback",
  customer_feedback = "customer_feedback",
}
