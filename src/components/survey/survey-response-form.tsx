import { Question } from "@/lib/types";
import React from "react";
import { useForm } from "react-hook-form";

type SurveResponseFormProps = {
  questions: Question[];
};

const SurveyResponseForm = ({ questions }: SurveResponseFormProps) => {
  // const form = useForm<z.infer<typeof multiChoiceQuestionSchema>>({
  //     resolver: zodResolver(multiChoiceQuestionSchema),
  //     defaultValues: {
  //       description: question.description,
  //       options: question.options,
  //     },
  //   });

  return <div>SurveyResponseForm</div>;
};

export default SurveyResponseForm;
