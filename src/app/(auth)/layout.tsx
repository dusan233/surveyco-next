import "../../styles/global.css";
import AppLogo from "@/components/layout/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white sm:bg-slate-100 py-5  min-h-screen">
      <div className="flex justify-center sm:justify-start mb-5 sm:mb-10 sm:px-7 p-3">
        <AppLogo />
      </div>
      {children}
    </div>
  );
}
