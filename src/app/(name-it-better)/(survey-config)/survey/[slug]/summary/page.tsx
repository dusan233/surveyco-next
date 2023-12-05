import React from "react";

const SurveySummary = () => {
  return <div>SurveySummary</div>;
};

export default SurveySummary;

// "use client";

// import React from "react";
// import {
//   MultipleChoiceQuestion,
//   OperationPosition,
//   Question,
//   QuestionType,
//   QuestionsResponseData,
//   TextboxQuestion,
//   UnsavedQuestion,
// } from "../../lib/types";
// import MultiChoiceQuestion from "./multichoice-question";
// import TextboxQuestionn from "./textbox-question";
// import EditQuestion from "./edit-question";
// import QuestionPreview from "./question-preview";
// import { StrictModeDroppable } from "../strict-mode-droppable";
// import {
//   DragDropContext,
//   DropResult,
//   ResponderProvided,
// } from "react-beautiful-dnd";
// import useMoveQuestion from "@/lib/hooks/useMoveQuestion";
// import { useLoadingToast } from "@/lib/hooks/useLoadingToast";
// import { useQueryClient } from "@tanstack/react-query";

// type BuildQuestionsListProps = {
//   questions: (Question | UnsavedQuestion)[];
//   selectedQuestion: string | number | null;
//   surveyId: string;
//   addingQuestion: boolean;
//   currentPageId: string;
//   currentPageNumber: number;
// };

// const BuildQuestionsList = ({
//   questions,
//   selectedQuestion,
//   addingQuestion,
//   surveyId,
//   currentPageId,
//   currentPageNumber,
// }: BuildQuestionsListProps) => {
//   const { isPending, moveQuestionMutation } = useMoveQuestion();
//   const lastQuestionIndex = questions.length - 1;
//   const queryClient = useQueryClient();

//   const renderQuestion = (
//     question: Question | UnsavedQuestion,
//     index: number
//   ) => {
//     return question.id === selectedQuestion ||
//       (lastQuestionIndex === index && addingQuestion) ? (
//       <EditQuestion
//         key={question.id}
//         question={question}
//         questionIndex={index}
//         lastQuestionIndex={lastQuestionIndex}
//         addingQuestion={addingQuestion}
//         surveyId={surveyId}
//       />
//     ) : (
//       <QuestionPreview
//         index={index}
//         key={question.id}
//         surveyId={surveyId}
//         question={question as Question}
//       />
//     );
//   };

//   useLoadingToast(isPending);

//   const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
//     console.log(result);

//     if (!result.destination || result.destination.index === result.source.index)
//       return;

//     const movingQuestionId = result.draggableId;
//     const destinationIndex = result.destination?.index;
//     const sourceIndex = result.source.index;

//     const position =
//       sourceIndex > destinationIndex
//         ? OperationPosition.before
//         : OperationPosition.after;

//     const targetQuestion = questions.find(
//       (_, index) => index === destinationIndex
//     ) as Question;

//     moveQuestionMutation({
//       surveyId,
//       questionId: movingQuestionId,
//       pageNumber: currentPageNumber,
//       data: {
//         position,
//         questionId: targetQuestion.id,
//         pageId: currentPageId,
//       },
//     });
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <StrictModeDroppable droppableId="list">
//         {(provided) => {
//           const lastQuestion = questions[questions.length - 1];
//           const filteredQuestions = addingQuestion
//             ? questions.filter((q) => q.id)
//             : questions;
//           return (
//             <>
//               <div ref={provided.innerRef} {...provided.droppableProps}>
//                 <div className="rounded-sm  bg-slate-100">
//                   {filteredQuestions.map((question, index) => {
//                     return renderQuestion(question, index);
//                   })}
//                   {provided.placeholder}
//                   {addingQuestion &&
//                     renderQuestion(lastQuestion, questions.length - 1)}
//                 </div>
//               </div>
//             </>
//           );
//         }}
//       </StrictModeDroppable>
//     </DragDropContext>
//   );
// };

// export default BuildQuestionsList;
