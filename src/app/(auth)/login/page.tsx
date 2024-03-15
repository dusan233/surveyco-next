import { Metadata } from "next";
import Login from "./components/login";

export const metadata: Metadata = {
  title: "Surveyco - Log in",
  description: "Page where users can log in to their accounts.",
};

const LogInPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Login />
    </div>
  );
};

export default LogInPage;
