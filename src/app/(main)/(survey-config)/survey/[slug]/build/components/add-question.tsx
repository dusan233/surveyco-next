"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getQuestionTypes } from "@/lib/utils";
import { Question, QuestionType } from "@/lib/types";
import useBuildQuestionsContext from "../useBuildQuestionsContext";

const AddQuestion = () => {
  const [open, setOpen] = useState(false);
  const questions = useBuildQuestionsContext((s) => s.questions);
  const updateQuestions = useBuildQuestionsContext((s) => s.updateQuestions);
  const setAddingQuestion = useBuildQuestionsContext(
    (s) => s.setAddingQuestion
  );
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);

  const addNewQuestion = (type: QuestionType) => {
    const lastQuestionNumber = questions.length
      ? (questions[questions.length - 1] as Question).number
      : 0;
    updateQuestions((questions) => {
      const newQuestion =
        type === QuestionType.textbox
          ? {
              type: type,
              description: "",
              description_image: null,
              updated_at: null,
              required: false,
              number: lastQuestionNumber + 1,
            }
          : {
              type: type,
              description: "",
              description_image: null,
              updated_at: null,
              required: false,
              randomize: false,
              number: lastQuestionNumber + 1,
              options: [
                {
                  description: "",
                  description_image: null,
                },
                {
                  description: "",
                  description_image: null,
                },
              ],
            };
      const filteredQuestions = questions.filter((question) => question.id);
      const newQuestions = [...filteredQuestions, newQuestion];

      return newQuestions;
    });
    setQueueQuestion(null);
    setAddingQuestion(true);
  };

  return (
    <>
      <div className="flex justify-center p-4">
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              <span className="mr-2">
                <FaPlus />
              </span>
              New Question
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader hidden>
              <DialogTitle>Add Question</DialogTitle>
            </DialogHeader>
            <div className="grid gap-2 grid-cols-2">
              {getQuestionTypes().map((questionType, index) => {
                const Icon = questionType.icon;
                return (
                  <button
                    onClick={() => {
                      addNewQuestion(questionType.type);
                      setOpen(false);
                    }}
                    className="flex gap-2 hover:bg-slate-100 items-center p-2"
                    key={index}
                  >
                    <div>
                      <Icon />
                    </div>
                    <div>{questionType.title}</div>
                  </button>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddQuestion;
