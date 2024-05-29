import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppLogo from "@/components/layout/logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surveyco - Survey thanks",
  description:
    "Survey thanks page where users get redirect after successfully finishing survey.",
};

const SurveyThanksPage = () => {
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col bg-slate-800 p-4 sm:p-10">
        <div className="flex flex-1 h-full justify-center flex-col items-center gap-6">
          <div className="justify-self-start">
            <AppLogo theme="dark" />
          </div>
          <h1 className="text-white text-center text-4xl sm:text-5xl">
            Thank you for taking this survey!
          </h1>
          <p className="text-2xl text-center text-slate-300">
            Get answers with surveys
          </p>
          <Link href="/login">
            <Button variant="secondary">Create survey</Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-accent p-4 sm:p-10"></div>
    </div>
  );
};

export default SurveyThanksPage;
