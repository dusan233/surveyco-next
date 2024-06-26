import AppLogo from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Surveyco - Survey taken",
  description:
    "Survey taken page where users get redirect after trying to take survey that he already finished.",
};

const SurveyTakenPage = () => {
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col bg-slate-800 p-4 sm:p-10">
        <div className="flex flex-1 h-full justify-center flex-col items-center gap-6">
          <div className="justify-self-start">
            <AppLogo theme="dark" />
          </div>
          <div className="flex  flex-col justify-center items-center ">
            <CheckCircle className="w-12 h-12 mb-5 text-white" />
            <h1 className="text-4xl sm:text-5xl  text-white text-center font-medium max-w-3xl">
              You have already taken this survey!
            </h1>
          </div>

          <Button asChild variant="secondary">
            <Link href="/login">Create survey </Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-secondary p-4 sm:p-10"></div>
    </div>
  );
};

export default SurveyTakenPage;
