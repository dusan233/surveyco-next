import {
  Question,
  QuestionOption,
  QuestionType,
  UnsavedCheckboxesQuestion,
  UnsavedDropdownQuestion,
  UnsavedMultichoiceQuestion,
  UnsavedQuestion,
  UnsavedQuestionOption,
  UnsavedTextboxQuestion,
} from "@/types/question";
import { QUESTION_TYPES } from "../constants";

export const createTextboxQuestion = (
  number: number
): UnsavedTextboxQuestion => ({
  type: QuestionType.textbox,
  description: "",
  description_image: null,
  required: false,
  number,
});

export const createMultichoiceQuestion = (
  number: number,
  type:
    | QuestionType.checkboxes
    | QuestionType.dropdown
    | QuestionType.multiple_choice
):
  | UnsavedDropdownQuestion
  | UnsavedMultichoiceQuestion
  | UnsavedCheckboxesQuestion => ({
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

export const getQuestionTypes = () => {
  return QUESTION_TYPES;
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

export const getQuestionTypeLable = (type: QuestionType) => {
  return QUESTION_TYPES.find((qType) => qType.type === type)!.title;
};

export const isSavedQuestionChoice = (
  choice: QuestionOption | UnsavedQuestionOption
): choice is QuestionOption => {
  return "id" in choice;
};

export const isSavedQuestion = (
  question: Question | UnsavedQuestion
): question is Question => {
  return "id" in question;
};
