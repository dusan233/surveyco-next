import { MultiChoiceQuestionFormData } from "@/lib/types";
import { multiChoiceQuestionSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useMultiChoiceQuestionForm(
  defaultValues: Partial<{
    description: string;
    descriptionImage: string | null;
    options: {
      description: string;
      descriptionImage: string | null;
      id?: string | undefined;
    }[];
    required: boolean;
    randomize: boolean;
  }>
) {
  const form = useForm<MultiChoiceQuestionFormData>({
    resolver: zodResolver(multiChoiceQuestionSchema),
    defaultValues,
  });

  return form;
}
