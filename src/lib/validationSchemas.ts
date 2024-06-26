import { OperationPosition } from "@/types/common";
import { QuestionType } from "@/types/question";
import { SurveyCategory } from "@/types/survey";
import { z } from "zod";

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
  description: z
    .string()
    .trim()
    .min(1, "You must enter question text.")
    .max(2500, "Description can have max of 2500 characters."),
  descriptionImage: z.string().or(z.null()),
  required: z.boolean(),
  randomize: z.boolean(),
  options: z
    .array(
      z.object({
        id: z.string().optional(),
        description: z
          .string()
          .trim()
          .min(1, "You must enter option text.")
          .max(2500, "Description can have max of 2500 characters."),
        descriptionImage: z.string().or(z.null()),
        number: z.number().positive(),
      })
    )
    .nonempty("You must add at least one option.")
    .max(30, "Max. number of options is 30."),
});

export const textboxQuestionSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "You must enter question text.")
    .max(2500, "Description can have max of 2500 characters."),
  descriptionImage: z.string().or(z.null()),
  required: z.boolean(),
});

export const createSurveySchema = z.object({
  title: z.string().trim().min(1, "You must enter survey title."),
  category: z.nativeEnum(SurveyCategory).optional(),
});

export const verifyEmailAddressSchema = z.object({
  code: z
    .string()
    .trim()
    .length(
      6,
      "Please enter the 6-digit number that was sent to your email address."
    ),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address."),
  password: z.string().trim().min(1, "Please provide password."),
});

export const signUpSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long."),
  fullName: z.string().trim().min(1, "Please provide your full name."),
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
    .trim()
    .min(1, "You must enter at least one character for your collector name."),
});

export const questionsResponsesSchema = z.object({
  questionResponses: z.array(
    z
      .object({
        id: z.string().optional(),
        questionId: z.string(),
        required: z.boolean(),
        answer: z.string().or(z.array(z.string())),
        questionType: z.nativeEnum(QuestionType),
      })
      .refine((question) => {
        if (
          question.questionType === QuestionType.textbox &&
          question.required
        ) {
          if (question.answer === "") return false;
        } else {
          if (question.required && question.answer.length === 0) return false;
        }
        return true;
      }, "Answer for this question is required")
  ),
});
