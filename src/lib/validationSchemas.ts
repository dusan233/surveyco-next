import { z } from "zod";
import { OperationPosition, QuestionType, SurveyCategory } from "./types";

const MAX_FILE_SIZE = 6000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const uploadQuestionImageSchema = z
  .any()
  .refine(
    (file) => file?.size <= MAX_FILE_SIZE,
    `Max allowed image size is 1MB.`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Accepted files: .png, .jpg, .jpge, .webp"
  );

export const multiChoiceQuestionSchema = z.object({
  description: z.string().min(1, "You must enter question text."),
  descriptionImage: z.string().or(z.null()),
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

export const createSurveySchema = z.object({
  title: z.string().min(1, "You must enter survey title."),
  category: z.nativeEnum(SurveyCategory).or(z.literal("")),
});

export const placeQuestionSchema = z.object({
  pageId: z.string(),
  position: z.nativeEnum(OperationPosition).optional(),
  questionId: z.string().optional(),
});
export const placePageSchema = z.object({
  position: z.nativeEnum(OperationPosition),
  pageId: z.string(),
});

export const updateCollectorNameSchema = z.object({
  name: z
    .string()
    .min(1, "You must enter at least one character for your collector name."),
});

export const questionsResponsesSchema = z.object({
  questionResponses: z.array(
    z.object({
      id: z.string().optional(),
      questionId: z.string(),
      answer: z.string().or(z.array(z.string())),
      questionType: z.nativeEnum(QuestionType),
    })
  ),
});
