"use client";

import SurveyResponseForm from "@/components/survey/survey-response-form";
import Spinner from "@/components/ui/spinner";
import React from "react";
import PreviewEnd from "./components/preview-end";
import useSurveyPreview from "./useSurveyPreview";

const SurveyPreviewPage = ({ params }: { params: { slug: string } }) => {
  const surveyId = params.slug;
  const {
    isLoading,
    isPreviewFinished,
    restartPreview,
    handlePreviousPage,
    handleSuccessfullPageSubmission,
    handleSurveyDataChanged,
    surveyResposneStartTime,
    getInitialQuestionResponses,
    surveyPages,
    questions,
    pageId,
    fetchingPageQuestions,
    isError,
    selectedPageNum,
  } = useSurveyPreview(surveyId);

  if (isError)
    return (
      <div className="mx-auto space-y-4 max-w-sm text-center p-5 sm:p-10">
        <h1 className="text-2xl font-medium">Internal Server Error</h1>
        <p className="text-lg">
          Sorry, we had some tehnical problems during your last operation.
          Please try again in a bit.
        </p>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center p-5 sm:p-10">
        <Spinner size="xl" />
      </div>
    );

  if (isPreviewFinished)
    return (
      <div className="max-w-3xl mx-auto mt-10 p-5 sm:p-10">
        <PreviewEnd restartPreview={restartPreview} surveyId={surveyId} />
      </div>
    );

  return (
    <div className="bg-slate-100 p-5 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <SurveyResponseForm
          onSurveyChange={handleSurveyDataChanged}
          onSuccessfulSubmit={handleSuccessfullPageSubmission}
          surveyResposneStartTime={surveyResposneStartTime}
          surveyId={surveyId}
          collectorId="preview"
          key={pageId!}
          displayPageId={pageId!}
          onPreviousPage={handlePreviousPage}
          surveyPages={surveyPages!}
          questions={questions!}
          isFetchingPage={fetchingPageQuestions}
          initialResponses={getInitialQuestionResponses()}
        />
      </div>
    </div>
  );
};

export default SurveyPreviewPage;

// "use client";

// import SurveyResponseForm from "@/components/survey/survey-response-form";
// import Spinner from "@/components/ui/spinner";
// import useSurveyPages from "@/lib/hooks/useSurveyPages";
// import useSurveyQuestions from "@/lib/hooks/useSurveyQuestions";
// import { Question, QuestionType, QuestionsResponsesData } from "@/lib/types";

// import React, { useEffect, useState } from "react";
// import PreviewEnd from "./components/preview-end";
// import {  useQueryClient } from "@tanstack/react-query";

// const SurveyPreviewPage = ({ params }: { params: { slug: string } }) => {
//   const queryClient = useQueryClient();
//   const surveyId = params.slug;
//   const [isPreviewFinished, setIsPreviewFinished] = useState(false);
//   const [selectedPageNum, setSelectedPageNum] = useState(1);
//   const [displayPageNum, setDisplayPageNum] = useState(-1);
//   const [surveyResposneStartTime, setSurveyResponseStartTime] = useState(
//     new Date()
//   );
//   const [questions, setQuestions] = useState<Question[] | undefined>([]);
//   const { surveyPages, isLoading: loadingPages } = useSurveyPages(surveyId);
//   const {
//     questions: questionsData,
//     isLoading: loadingQuestions,
//     isFetching,
//   } = useSurveyQuestions(surveyId, selectedPageNum);
//   const [questionsResponses, setQuestionsResponses] = useState<
//     {
//       pageNum: number;
//       questionsResponses: {
//         questionId: string;
//         answer: string | string[];
//         questionType: QuestionType;
//       }[];
//     }[]
//   >([]);

//   const saveQuestionsResponsesData = (
//     questionsResponsesData: {
//       questionId: string;
//       answer: string | string[];
//       questionType: QuestionType;
//     }[]
//   ) => {
//     setQuestionsResponses((currentQuestionsResponses) => {
//       const pageQuestionsResponsesExist = currentQuestionsResponses.find(
//         (page) => page.pageNum === displayPageNum
//       );

//       if (pageQuestionsResponsesExist) {
//         return currentQuestionsResponses.map((page) => {
//           if (page.pageNum === displayPageNum)
//             return { ...page, questionsResponses: questionsResponsesData };
//           return page;
//         });
//       } else {
//         return [
//           ...currentQuestionsResponses,
//           {
//             pageNum: selectedPageNum,
//             questionsResponses: questionsResponsesData,
//           },
//         ];
//       }
//     });
//   };

//   const restartPreview = () => {
//     queryClient.clear();
//     setIsPreviewFinished(false);
//     setSelectedPageNum(1);
//     setQuestionsResponses([]);
//     setQuestions([]);
//     setSurveyResponseStartTime(new Date());
//   };

//   const onSurveyChange = () => {
//     setSelectedPageNum(1);
//     restartPreview();
//   };

//   const onSubmit = (
//     data: QuestionsResponsesData,
//     submitted: boolean = false
//   ) => {
//     if (submitted) {
//       setIsPreviewFinished(true);
//       saveQuestionsResponsesData(data.questionResponses);
//     } else {
//       saveQuestionsResponsesData(data.questionResponses);
//       setSelectedPageNum((selectedPageNum) => selectedPageNum + 1);
//     }
//   };

//   useEffect(() => {
//     if (!isFetching) {
//       setQuestions(questionsData);
//       setDisplayPageNum(selectedPageNum);
//     }
//   }, [isFetching, selectedPageNum, questionsData]);

//   if (loadingPages || loadingQuestions)
//     return (
//       <div className="flex justify-center pt-10">
//         <Spinner size="xl" />
//       </div>
//     );

//   if (isPreviewFinished)
//     return (
//       <div className="max-w-3xl mx-auto mt-10">
//         <PreviewEnd restartPreview={restartPreview} surveyId={surveyId} />
//       </div>
//     );

//   return (
//     <div className="bg-slate-100 p-5 sm:p-10">
//       <div className="max-w-3xl mx-auto">
//         {surveyPages!.map((page) => {
//           const pageQuestionsResponsesExist = questionsResponses.find(
//             (page) => page.pageNum === displayPageNum
//           );
//           const initialResponses = pageQuestionsResponsesExist
//             ? pageQuestionsResponsesExist.questionsResponses
//             : questions!.map((question) => {
//                 return {
//                   questionId: question.id,
//                   required: question.required,
//                   answer:
//                     question.type === QuestionType.checkboxes
//                       ? ([] as string[])
//                       : "",
//                   questionType: question.type,
//                 };
//               });

//           return page.number === displayPageNum ? (
//             <SurveyResponseForm
//               onSurveyChange={onSurveyChange}
//               onSubmit={onSubmit}
//               surveyResposneStartTime={surveyResposneStartTime}
//               surveyId={surveyId}
//               collectorId="preview"
//               key={page.id}
//               displayPageNum={displayPageNum}
//               setSelectedPageNum={setSelectedPageNum}
//               surveyPages={surveyPages!}
//               questions={questions!}
//               isFetchingPage={isFetching || selectedPageNum !== displayPageNum}
//               initialResponses={initialResponses}
//             />
//           ) : null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default SurveyPreviewPage;
