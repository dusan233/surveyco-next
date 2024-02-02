import { Button } from "@/components/ui/button";
import "../../styles/global.css";
import Link from "next/link";
import AppLogo from "@/components/layout/logo";

const SurveyThanksPage = () => {
  return (
    <div className="bg-slate-800 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col bg-slate-800 p-4 sm:p-10">
        <div className="flex flex-1 h-full justify-center flex-col items-center gap-6">
          <div className="justify-self-start">
            <AppLogo theme="dark" />
          </div>
          <h1 className="text-white text-5xl">
            Thank you for taking this survey!
          </h1>
          <p className="text-2xl text-white">Get answers with surveys</p>
          <Link href="/login">
            <Button variant="secondary">Create survey</Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-accent p-4 sm:p-10"></div>
      {/* <div className="flex justify-center sm:justify-start mb-5 sm:mb-10">
        <AppLogo theme="dark" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-4 justify-center sm:p-24 p-3">
        <h1 className="text-3xl sm:text-5xl text-center text-white font-medium max-w-3xl">
          Thank you for taking this survey!
        </h1>
        <Link href="/login">
          <Button variant="secondary">Create survey</Button>
        </Link>
      </div> */}
    </div>
  );
};

export default SurveyThanksPage;
