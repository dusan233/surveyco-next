import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { HiSelector } from "react-icons/hi";
import { FaListUl } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiTextboxBold } from "react-icons/pi";
import { QuestionType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const questionTypesData = [
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

export const getQuestionTypes = () => {
  return questionTypesData;
};

export const getQuestionTypeLable = (type: QuestionType) => {
  return questionTypesData.find((qType) => qType.type === type)!.title;
};
