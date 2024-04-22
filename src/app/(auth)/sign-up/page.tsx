import SignUp from "@/app/(auth)/sign-up/_components/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surveyco - Create an account",
  description: "Page where users can create an account.",
};

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center">
      <SignUp />
    </div>
  );
}
