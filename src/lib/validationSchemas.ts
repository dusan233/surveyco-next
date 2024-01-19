import { z } from "zod";
import { OperationPosition, QuestionType, SurveyCategory } from "./types";

export const multiChoiceQuestionSchema = z.object({
  description: z.string().min(1, "You must enter question text."),
  descriptionImage: z.any().refine(
    (value) => {
      // Add your image file validation logic here
      // For example, you can check if the file extension is an image format
      const supportedImageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
      const fileExtension = value.split(".").pop()?.toLowerCase();

      return (
        !!fileExtension && supportedImageExtensions.includes(fileExtension)
      );
    },
    {
      message:
        "Invalid image file. Supported formats: jpg, jpeg, png, gif, bmp",
    }
  ),
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
