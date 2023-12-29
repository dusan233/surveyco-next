import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { HiSelector } from "react-icons/hi";
import { FaListUl } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiTextboxBold } from "react-icons/pi";
import { CollectorType, QuestionType } from "./types";
import { Link } from "lucide-react";

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

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement["addEventListener"]>)
    );
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T["removeEventListener"]>
    | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement["removeEventListener"]>)
    );
  }
}
