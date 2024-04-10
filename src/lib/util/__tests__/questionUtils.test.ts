import { describe, it, expect } from "@jest/globals";
import {
  createMultichoiceQuestion,
  createNewQuestion,
  createTextboxQuestion,
  getQuestionChartTypes,
  getQuestionTypeLable,
  getQuestionTypes,
} from "../questionUtils";
import { QuestionType } from "@/lib/types";
import { QUESTION_TYPES } from "@/lib/constants";

describe("createTextboxQuestion", () => {
  it("should return new question of type textbox", () => {
    const questionOneNumber = 1;
    const questionTwoNumber = 54;

    const questionOneData = {
      type: "textbox",
      description: "",
      description_image: null,
      required: false,
      number: questionOneNumber,
    };
    const questionTwoData = {
      type: "textbox",
      description: "",
      description_image: null,
      required: false,
      number: questionTwoNumber,
    };

    const questionOne = createTextboxQuestion(questionOneNumber);
    const questionTwo = createTextboxQuestion(questionTwoNumber);

    expect(questionOne).toEqual(questionOneData);
    expect(questionTwo).toEqual(questionTwoData);
  });
});

describe("createMultichoiceQuestion", () => {
  it("should return correct default data for newly created question of multi-choice type", () => {
    const questionOneNumber = 1;
    const questionTwoNumber = 54;
    const questionThreeNumber = 76;
    const questionDefaults = {
      description: "",
      description_image: null,
      required: false,
      randomize: false,
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
    };

    const questionOneData = {
      ...questionDefaults,
      type: QuestionType.checkboxes,
      number: questionOneNumber,
    };
    const questionTwoData = {
      ...questionDefaults,
      type: QuestionType.multiple_choice,
      number: questionTwoNumber,
    };
    const questionThreeData = {
      ...questionDefaults,
      type: QuestionType.dropdown,
      number: questionThreeNumber,
    };

    const questionOne = createMultichoiceQuestion(
      questionOneNumber,
      QuestionType.checkboxes
    );
    const questionTwo = createMultichoiceQuestion(
      questionTwoNumber,
      QuestionType.multiple_choice
    );
    const questionThree = createMultichoiceQuestion(
      questionThreeNumber,
      QuestionType.dropdown
    );

    expect(questionOne).toEqual(questionOneData);
    expect(questionTwo).toEqual(questionTwoData);
    expect(questionThree).toEqual(questionThreeData);
  });
});

describe("getQuestionTypes", () => {
  it("should return list of possible question types", () => {
    const allQuestionTypes = getQuestionTypes();

    expect(allQuestionTypes).toEqual(QUESTION_TYPES);
  });
});

describe("getQuestionTypeLable", () => {
  it("should return label for provided question type", () => {
    const questionType1 = QuestionType.checkboxes;
    const questionType2 = QuestionType.dropdown;
    const questionType3 = QuestionType.textbox;

    const questionLabel1 = QUESTION_TYPES.find(
      (qType) => qType.type === questionType1
    )?.title;
    const questionLabel2 = QUESTION_TYPES.find(
      (qType) => qType.type === questionType2
    )?.title;
    const questionLabel3 = QUESTION_TYPES.find(
      (qType) => qType.type === questionType3
    )?.title;

    const labelResult1 = getQuestionTypeLable(questionType1);
    const labelResult2 = getQuestionTypeLable(questionType2);
    const labelResult3 = getQuestionTypeLable(questionType3);

    expect(labelResult1).toBe(questionLabel1);
    expect(labelResult2).toBe(questionLabel2);
    expect(labelResult3).toBe(questionLabel3);
  });
});

describe("createNewQuestion", () => {
  it("should return correct default data for newly created question", () => {
    const questionDefaults = {
      description: "",
      description_image: null,
      required: false,
    };
    const questionData1 = {
      ...questionDefaults,
      type: QuestionType.textbox,
      number: 5,
    };
    const questionData2 = {
      ...questionDefaults,
      type: QuestionType.multiple_choice,
      randomize: false,
      number: 14,
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
    };

    const question1 = createNewQuestion(
      questionData1.type,
      questionData1.number
    );
    const question2 = createNewQuestion(
      questionData2.type,
      questionData2.number
    );

    expect(question1).toEqual(questionData1);
    expect(question2).toEqual(questionData2);
  });
});

describe("getQuestionChartTypes", () => {
  it("should return correct chart types for questions", () => {
    const checkboxQChartTypes = [{ label: "Bar chart", value: "bar" }];
    const multiChoiceQChartTypes = [
      { label: "Bar chart", value: "bar" },
      { label: "Pie chart", value: "pie" },
    ];
    const otherQChartTypes = [] as const;

    const chartTypes1 = getQuestionChartTypes(QuestionType.checkboxes);
    const chartTypes2 = getQuestionChartTypes(QuestionType.multiple_choice);
    const chartTypes3 = getQuestionChartTypes(QuestionType.textbox);

    expect(chartTypes1).toEqual(checkboxQChartTypes);
    expect(chartTypes2).toEqual(multiChoiceQChartTypes);
    expect(chartTypes3).toEqual(otherQChartTypes);
  });
});
