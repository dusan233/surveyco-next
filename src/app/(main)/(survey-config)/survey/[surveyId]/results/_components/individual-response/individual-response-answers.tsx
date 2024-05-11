import { Question, QuestionResponse, QuestionType } from "@/types/question";
import { convert } from "html-to-text";
import DOMPurify from "isomorphic-dompurify";
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
        const questionResponse = questionResponses.find(
          (response) => response.questionId === question.id
        );
        const questionSkipped = !questionResponse;

        const answer =
          question.type === QuestionType.textbox
            ? questionResponse?.answer[0].textAnswer
            : questionResponse?.answer.map((qAnswer) => {
                const choiceContent = question.options.find(
                  (choice) => choice.id === qAnswer.questionOptionId
                );
                return (
                  <div
                    className="break-all"
                    key={qAnswer.id}
                    dangerouslySetInnerHTML={{
                      __html:
                        "-" + DOMPurify.sanitize(choiceContent!.description),
                    }}
                  />
                );
              });

        return (
          <div key={question.id}>
            <div className="flex gap-2 items-start">
              <span className="font-bold">Q{question.number}</span>
              <h4 className="break-all w-full min-w-[1%]">
                {convert(question.description.replace(/<img[^>]*>/g, ""))}
              </h4>
            </div>
            {questionSkipped ? (
              <div className="text-sm mt-2 text-gray-400">
                Respondent skipped this question
              </div>
            ) : (
              <div className="text-sm mt-2 break-all text-gray-500 flex flex-col gap-1">
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
