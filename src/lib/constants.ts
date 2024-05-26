import { FaListUl } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { HiSelector } from "react-icons/hi";
import { PiTextboxBold } from "react-icons/pi";
import { SurveyCategory } from "@/types/survey";
import { QuestionType } from "@/types/question";

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
    icon: FaListUl,
    type: QuestionType.multiple_choice,
  },
  {
    title: "Checkboxes",
    icon: IoMdCheckboxOutline,
    type: QuestionType.checkboxes,
  },
  { title: "Dropdown", icon: HiSelector, type: QuestionType.dropdown },
  { title: "Textbox", icon: PiTextboxBold, type: QuestionType.textbox },
];
