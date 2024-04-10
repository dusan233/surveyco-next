import { QUESTION_TYPES } from "../constants";
import { QuestionType } from "../types";

export const createTextboxQuestion = (number: number) => ({
  type: QuestionType.textbox,
  description: "",
  description_image: null,
  required: false,
  number,
});

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
