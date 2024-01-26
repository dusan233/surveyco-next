import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { HiSelector } from "react-icons/hi";
import { FaListUl } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiTextboxBold } from "react-icons/pi";
import { CollectorType, QuestionType } from "./types";
import { Link } from "lucide-react";
import { isClerkAPIResponseError } from "@clerk/nextjs";

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

export const getQuestionChartTypes = (qType: QuestionType) => {
  if (qType === QuestionType.checkboxes)
    return [{ label: "Bar chart", value: "bar" }];
  if (qType !== QuestionType.textbox)
    return [
      { label: "Bar chart", value: "bar" },
      { label: "Pie chart", value: "pie" },
    ];

  return [];
};

export const getAuthErrorMessage = (err: any) => {
  if (isClerkAPIResponseError(err)) {
    console.log(err.errors);
    let errorMsg = "";
    if (err.status === 500) {
      errorMsg = "Something went wrong! Please try again.";
    } else if (err.status === 429) {
      errorMsg =
        "Sorry, too many requests. For security reasons, please wait for a while before trying again.";
    } else if (err.status === 422 || err.status === 400) {
      if (err.errors[0].code === "form_password_pwned") {
        errorMsg =
          "Password has been found in an online data breach.  For account safety, please use a different password.";
      } else {
        errorMsg =
          "Your login info is invalid. Please try again with correct credentials.";
      }
    } else if (err.status === 403 && err.errors[0].code === "user_locked") {
      errorMsg =
        "Sorry, too many incorrect login attempts. For security reasons, please wait 59 minutes before trying again.";
    }
    return errorMsg;
  } else {
    return "Something went wrong! Please try again.";
  }
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
