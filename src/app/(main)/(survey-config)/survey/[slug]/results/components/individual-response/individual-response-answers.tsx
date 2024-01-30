import {
  MultipleChoiceQuestion,
  Question,
  QuestionResponse,
  QuestionType,
} from "@/lib/types";
import { convert } from "html-to-text";
import React from "react";

type IndividualResponseAnswersProps = {
  questions: Question[];
  questionResponses: QuestionResponse[];
};

const IndividualResponseAnswers = ({
  questionResponses,
  questions,
}: IndividualResponseAnswersProps) => {
  return (
    <div className="flex flex-col gap-5 ">
      {questions.map((question) => {
        console.log(questionResponses);
        const questionResponse = questionResponses.find(
          (response) => response.questionId === question.id
        );
        const questionSkipped = !questionResponse;

        const answer =
          question.type === QuestionType.textbox
            ? questionResponse?.answer[0].textAnswer
            : questionResponse?.answer.map((qAnswer) => {
                const choiceContent = (
                  question as MultipleChoiceQuestion
                ).options.find(
                  (choice) => choice.id === qAnswer.questionOptionId
                );
                return (
                  <div key={qAnswer.id}>
                    - {convert(choiceContent!.description)}
                  </div>
                );
              });

        return (
          <div key={question.id}>
            <div className="flex items-start gap-3">
              <span className="font-bold">Q{question.number}</span>
              <h4 className="flex-1 ">{convert(question.description)}</h4>
            </div>
            {questionSkipped ? (
              <div className="text-sm mt-2 text-gray-400">
                Respondent skipped this question
              </div>
            ) : (
              <div className="text-sm mt-2 text-gray-500 flex flex-col gap-1">
                {answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IndividualResponseAnswers;
