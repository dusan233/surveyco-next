"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { getQuestionTypes } from "@/lib/utils";
import { QuestionType } from "@/lib/types";

type AddQuestionProps = {
  addQuestion: (type: QuestionType) => void;
};

const AddQuestion = ({ addQuestion }: AddQuestionProps) => {
  const [open, setOpen] = useState(false);
  // const [question, setQuestion] = useState<UnsavedQuestion | null>(null);

  // const addNewQuestion = (type: QuestionType) => {
  //   const newQuestion =
  //     type === QuestionType.textbox
  //       ? {
  //           type: type,
  //           description: "",
  //           updated_at: null,
  //         }
  //       : {
  //           type: type,
  //           description: "",
  //           updated_at: null,
  //           options: [
  //             {
  //               description: "",
  //             },
  //             {
  //               description: "",
  //             },
  //           ],
  //         };
  //   setQuestion(newQuestion);
  //   setSelectedQuestion(null);
  // };

  return (
    <>
      {/* <div className="p-3 pt-0">
        {question &&
          addingQuestion &&
          ([
            QuestionType.dropdown,
            QuestionType.checkboxes,
            QuestionType.multiple_choice,
          ].includes(question.type) ? (
            <MultiChoiceQuestion
              index={index}
              surveyId={surveyId}
              question={question as UnsavedMultiChoiceQuestion}
            />
          ) : (
            <TextboxQuestion
              index={index}
              question={question as UnsavedTextQuestion}
            />
          ))}
      </div> */}
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
                      addQuestion(questionType.type);
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
