import { z } from "zod";
import { OperationPosition } from "./types";

export const multiChoiceQuestionSchema = z.object({
  description: z.string().min(1, "You must enter question text."),
  options: z
    .array(
      z.object({
        id: z.string().optional(),
        description: z.string().min(1, "You must enter option text."),
      })
    )
    .nonempty("You must add at least one option."),
});

export const textboxQuestionSchema = z.object({
  description: z.string().min(1, "You must enter question text."),
});

export const placeQuestionSchema = z.object({
  pageId: z.string(),
  position: z.nativeEnum(OperationPosition),
  questionId: z.string(),
});
