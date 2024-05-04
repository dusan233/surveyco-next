import { PropsWithChildren } from "react";
import "../../styles/global.css";
export default function SurveyResponseLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-slate-100 min-h-screen p-5 sm:p-10">{children}</div>
  );
}
