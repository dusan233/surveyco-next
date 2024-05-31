import { SurveyCategory } from "@/types/survey";
import { QuestionType } from "@/types/question";
import { ChevronDown, List, TextCursorInput, ListChecks } from "lucide-react";

export const SURVEY_CATEGORIES = [
  {
    value: SurveyCategory.customer_feedback,
    label: "Customer feedback",
  },
  {
    value: SurveyCategory.event_feedback,
    label: "Event feedback",
  },
  {
    value: SurveyCategory.student_feedback,
    label: "Student feedback",
  },
  {
    value: SurveyCategory.academic_research,
    label: "Academic research",
  },
  {
    value: SurveyCategory.market_research,
    label: "General market research",
  },
];

export const QUESTION_TYPES = [
  {
    title: "Multiple Choice",
    icon: List,
    type: QuestionType.multiple_choice,
  },
  {
    title: "Checkboxes",
    icon: ListChecks,
    type: QuestionType.checkboxes,
  },
  { title: "Dropdown", icon: ChevronDown, type: QuestionType.dropdown },
  { title: "Textbox", icon: TextCursorInput, type: QuestionType.textbox },
];
