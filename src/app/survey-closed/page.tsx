import { Button } from "@/components/ui/button";
import "../../styles/global.css";
import Link from "next/link";
import AppLogo from "@/components/layout/logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surveyco - Survey closed",
  description:
    "Page where users get redirect after trying to access survey collector that has been closed.",
};

const SurveyClosedPage = () => {
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col bg-slate-800 p-4 sm:p-10">
        <div className="flex flex-1 h-full justify-center flex-col items-center gap-6">
          <div className="justify-self-start">
            <AppLogo theme="dark" />
          </div>
          <h1 className="text-white text-center text-4xl sm:text-5xl">
            Survey closed!
          </h1>
          <p className="text-2xl text-center max-w-xl text-slate-300">
            This survey is currently closed. Please contact the author of this
            survey for further assistance.
          </p>
          <Link href="/login">
            <Button variant="secondary">Create survey</Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-indigo-300 p-4 sm:p-10"></div>
    </div>
  );
};

export default SurveyClosedPage;
