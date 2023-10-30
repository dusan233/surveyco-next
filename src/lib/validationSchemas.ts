import { z } from "zod";

export const multiChoiceQuestionSchema = z.object({
  question_description: z.string().min(1, "You must enter question text."),
  options: z
    .array(
      z.object({
        description: z.string().min(1, "You must enter option text."),
      })
    )
    .nonempty("You must add at least one option."),
});

export const textboxQuestionSchema = z.object({
  question_description: z.string().min(1, "You must enter question text."),
});
