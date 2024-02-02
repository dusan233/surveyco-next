import { CheckCircle } from "lucide-react";

const SurveyTakenPage = () => {
  return (
    <div className="flex min-h-screen bg-indigo-700 flex-col items-center justify-center sm:p-24 p-3">
      <CheckCircle className="w-12 h-12 mb-5 text-white" />
      <h1 className="text-5xl text-center text-white font-medium max-w-3xl">
        You have already taken this survey!
      </h1>
    </div>
  );
};

export default SurveyTakenPage;
