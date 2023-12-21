import "../../styles/global.css";

export default function SurveyResponseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-slate-100">{children}</div>;
}
