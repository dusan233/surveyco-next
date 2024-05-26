import { textboxQuestionSchema } from "@/lib/validationSchemas";
import { TextboxQuestionFormData } from "@/types/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useTextboxQuestionForm(
  defaultValues: Partial<TextboxQuestionFormData>
) {
  const form = useForm<TextboxQuestionFormData>({
    resolver: zodResolver(textboxQuestionSchema),
    defaultValues,
  });

  return form;
}
