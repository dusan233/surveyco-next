"use client";

import QuestionResponseComp from "@/components/questions/response/question-response";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useSaveSurveyResponse from "@/lib/hooks/useSaveSurveyResponse";
import {
  Question,
  QuestionType,
  QuestionsResponsesData,
  SurveyPage,
} from "@/lib/types";
import { questionsResponsesSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

type SurveyResponseFormProps = {
  questions: Question[];
  surveyPages: SurveyPage[];
  surveyId: string;
  collectorId: string;
  displayPageNum: number;
  isFetchingPage: boolean;
  surveyResposneStartTime: Date;
  onSurveyChange: () => void;
  onSubmit: (data: QuestionsResponsesData, submitted: boolean) => void;
  setSelectedPageNum: React.Dispatch<React.SetStateAction<number>>;
  initialResponses: {
    id?: string;
    questionId: string;
    answer: string | string[];
    questionType: QuestionType;
  }[];
};

const SurveyResponseForm = ({
  questions,
  surveyPages,
  setSelectedPageNum,
  isFetchingPage,
  displayPageNum,
  surveyId,
  collectorId,
  surveyResposneStartTime,
  onSurveyChange,
  initialResponses,
  onSubmit,
}: SurveyResponseFormProps) => {
  const { saveResponseMutation, isPending } = useSaveSurveyResponse();
  const form = useForm<QuestionsResponsesData>({
    resolver: zodResolver(questionsResponsesSchema),
    defaultValues: {
      questionResponses: initialResponses,
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "questionResponses",
    keyName: "qId",
  });

  const handleSubmit = async (values: QuestionsResponsesData) => {
    const submit =
      surveyPages[surveyPages.length - 1].number === displayPageNum;
    saveResponseMutation(
      {
        surveyId,
        data: values,
        collectorId,
        submit,
        surveyResposneStartTime,
      },
      {
        onSuccess(data) {
          onSubmit(values, data.submitted);
        },
        onError(error) {
          if (error.name === "CONFLICT") {
            onSurveyChange();
          }
        },
      }
    );
  };

  const showNextBtn =
    surveyPages.findIndex((page) => page.number > displayPageNum) !== -1;
  const showPrevBtn =
    surveyPages.findIndex((page) => page.number < displayPageNum) !== -1;
  const showSendBtn = displayPageNum === surveyPages.length;

  const handlePrevPage = () => {
    setSelectedPageNum((selectedPageNum) => selectedPageNum - 1);
  };

  const buttonsInactive = isFetchingPage || isPending;

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col gap-6">
            {fields.map((questionField, index) => {
              const questionData = questions[index];

              return (
                <QuestionResponseComp
                  key={questionField.qId}
                  question={questionData}
                  index={index}
                  defaultValue={questionField.answer}
                />
              );
            })}
          </div>
          <div className="flex justify-end gap-2 mt-10">
            {showPrevBtn && (
              <Button
                disabled={buttonsInactive}
                onClick={handlePrevPage}
                size="lg"
                type="button"
              >
                Previous
              </Button>
            )}
            {showNextBtn && (
              <Button disabled={buttonsInactive} size="lg" type="submit">
                Next
              </Button>
            )}
            {showSendBtn && (
              <Button disabled={buttonsInactive} size="lg" type="submit">
                Send
              </Button>
            )}
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};

export default SurveyResponseForm;

// "use client";

// import {
//   Question,
//   QuestionType,
//   QuestionsResponsesData,
//   SurveyPage,
// } from "@/lib/types";
// import React from "react";
// import { FormProvider, useFieldArray, useForm } from "react-hook-form";

// import { Form } from "../ui/form";
// import { Button } from "../ui/button";

// import QuestionResponse from "../questions/response/question-response";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { questionsResponsesSchema } from "@/lib/validationSchemas";
// import useSaveSurveyResponse from "@/lib/hooks/useSaveSurveyResponse";

// type SurveResponseFormProps = {
//   surveyId: string;
//   collectorId: string;
//   questions: Question[];
//   surveyPages: SurveyPage[];
//   displayPageNum: number;
//   onSurveyChange: () => void;
//   onSubmit: (data: QuestionsResponsesData, submitted?: boolean) => void;
//   setSelectedPageNum: React.Dispatch<React.SetStateAction<number>>;
//   isFetchingPage: boolean;
//   surveyResposneStartTime: Date;
//   initialValue: {
//     questionId: string;
//     answer: string | string[];
//     questionType: QuestionType;
//   }[];
// };

// const SurveyResponseForm = ({
//   surveyId,
//   collectorId,
//   questions,
//   surveyPages,
//   displayPageNum,
//   setSelectedPageNum,
//   isFetchingPage,
//   initialValue,
//   surveyResposneStartTime,
//   onSurveyChange,
//   onSubmit,
// }: SurveResponseFormProps) => {
//   const { saveResponseMutation, isPending } = useSaveSurveyResponse();
//   const form = useForm({
//     resolver: zodResolver(questionsResponsesSchema),
//     defaultValues: {
//       questionResponses: initialValue,
//     },
//   });
//   const { fields } = useFieldArray({
//     control: form.control,
//     name: "questionResponses",
//     keyName: "qId",
//   });

//   const showNextBtn =
//     surveyPages.findIndex((page) => page.number > displayPageNum) !== -1;
//   const showPrevBtn =
//     surveyPages.findIndex((page) => page.number < displayPageNum) !== -1;
//   const showSendBtn = displayPageNum === surveyPages.length;

//   const handleSubmit = async (values: QuestionsResponsesData) => {
//     const submit =
//       surveyPages[surveyPages.length - 1].number === displayPageNum;
//     saveResponseMutation(
//       {
//         surveyId,
//         data: values,
//         collectorId,
//         submit,
//         surveyResposneStartTime,
//       },
//       {
//         onSuccess(data, variables, context) {
//           onSubmit(values, data.submitted);
//         },
//         onError(error, variables, context) {
//           if (error.name === "CONFLICT") {
//             onSurveyChange();
//           }
//         },
//       }
//     );
//   };

//   const handlePrevPage = () => {
//     setSelectedPageNum((selectedPageNum) => selectedPageNum - 1);
//   };

//   return (
//     <FormProvider {...form}>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)}>
//           <div className="flex flex-col gap-6">
//             {fields.map((questionField, index) => {
//               const questionData = questions[index];

//               return (
//                 <QuestionResponse
//                   key={questionField.qId}
//                   question={questionData}
//                   index={index}
//                   defaultValue={questionField.answer}
//                 />
//               );
//             })}
//           </div>
//           <div className="flex justify-end gap-2 mt-10">
//             {showPrevBtn && (
//               <Button
//                 disabled={isFetchingPage}
//                 onClick={handlePrevPage}
//                 size="lg"
//               >
//                 Previous
//               </Button>
//             )}
//             {showNextBtn && (
//               <Button disabled={isFetchingPage} size="lg" type="submit">
//                 Next
//               </Button>
//             )}
//             {showSendBtn && (
//               <Button disabled={isFetchingPage} size="lg" type="submit">
//                 Send
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>
//     </FormProvider>
//   );
// };

// export default SurveyResponseForm;
