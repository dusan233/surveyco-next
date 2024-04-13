import { screen, render } from "@testing-library/react";
import {
  BuildQuestionsContext,
  BuildQuestionsProvider,
} from "../build-questions-provider";
import { Question, QuestionType } from "@/lib/types";
import { expect, describe, it } from "@jest/globals";

describe("BuildQuestionsProvider", () => {
  it("renders children", () => {
    const questions: Question[] = [
      {
        quizId: "surveyId",
        id: "questionId",
        type: QuestionType.textbox,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        description: "",
        description_image: null,
        number: 1,
        surveyPageId: "pageId",
        required: false,
        hasResponses: false,
      },
    ];
    const currentPage = {
      id: "pageId",
      created_at: new Date(),
      updated_at: new Date(),
      surveyId: "surveyId",
      number: 1,
      totalQuestions: 1,
    };

    render(
      <BuildQuestionsProvider questions={questions} currentPage={currentPage}>
        <BuildQuestionsContext.Consumer>
          {(value) => {
            const contextQuestions = value?.getState().questions;
            const contextCurrentPage = value?.getState().currentPage;

            expect(contextQuestions).toEqual(questions);
            expect(contextCurrentPage).toEqual(currentPage);

            return <div>Mock Component</div>;
          }}
        </BuildQuestionsContext.Consumer>
      </BuildQuestionsProvider>
    );

    //@ts-ignore
    expect(screen.getByText("Mock Component")).toBeInTheDocument();
  });
});
