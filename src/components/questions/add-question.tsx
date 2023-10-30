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
  addNewQuestion: (type: QuestionType) => void;
};

const AddQuestion = ({ addNewQuestion }: AddQuestionProps) => {
  const [open, setOpen] = useState(false);

  return (
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
  );
};

export default AddQuestion;
