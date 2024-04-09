import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { HiSelector } from "react-icons/hi";
import { FaListUl } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiTextboxBold } from "react-icons/pi";
import { QuestionType, SurveyCategory } from "./types";
import { auth, isClerkAPIResponseError } from "@clerk/nextjs";
import { Editor } from "@tiptap/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createTextboxQuestion = (number: number) => ({
  type: QuestionType.textbox,
  description: "",
  description_image: null,
  required: false,
  number,
});

export const getResponseData = async <T>(res: Response): Promise<T> => {
  try {
    return await res.json();
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};

export const editorHasImage = (editor: Editor) => {
  let imageExists = false;
  editor.state.doc.content.descendants((node) => {
    if (node.type.name === "image") {
      imageExists = true;
    }
  });

  return imageExists;
};

export const createMultichoiceQuestion = (
  number: number,
  type: QuestionType
) => ({
  type: type,
  description: "",
  description_image: null,
  required: false,
  randomize: false,
  number,
  options: [
    {
      description: "",
      description_image: null,
      number: 1,
    },
    {
      description: "",
      description_image: null,
      number: 2,
    },
  ],
});

export const createNewQuestion = (type: QuestionType, number: number) => {
  const createdQuestion =
    type === QuestionType.textbox
      ? createTextboxQuestion(number)
      : createMultichoiceQuestion(number, type);

  return createdQuestion;
};

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
      } else if (err.errors[0].code === "form_identifier_exists") {
        errorMsg = "Account with that email address already exists.";
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

export const surveyCategoriesList = [
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
