import { z } from "zod";
import { Timestamps } from "./common";
import { SurveyBase } from "./survey";
import { updateCollectorNameSchema } from "@/lib/validationSchemas";

export enum CollectorType {
  web_link = "web_link",
}

export enum CollectorStatus {
  open = "open",
  closed = "closed",
}
export type UpdateCollectorData = z.infer<typeof updateCollectorNameSchema>;

export interface Collector extends Timestamps {
  id: string;
  type: CollectorType;
  status: CollectorStatus;
  surveyId: string;
  name: string;
  total_responses: number;
  survey: SurveyBase;
}
