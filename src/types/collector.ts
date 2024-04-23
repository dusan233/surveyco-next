import { Timestamps } from "./common";
import { SurveyBase } from "./survey";

export enum CollectorType {
  web_link = "web_link",
}

export enum CollectorStatus {
  open = "open",
  closed = "closed",
}

export interface Collector extends Timestamps {
  id: string;
  type: CollectorType;
  status: CollectorStatus;
  surveyId: string;
  name: string;
  total_responses: number;
  survey: SurveyBase;
}
