import "../../styles/global.css";
export default function SurveyResponseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-100 min-h-screen p-5 sm:p-10">{children}</div>
  );
}
