import { Cinzel } from "next/font/google";
import Link from "next/link";
import React from "react";

const cinzelFont = Cinzel({
  weight: ["400", "500", "600", "800"],
  subsets: ["latin"],
});

type AppLogoProps = {
  theme?: "light" | "dark" | "light-white";
};

const AppLogo = ({ theme = "light" }: AppLogoProps) => {
  return (
    <Link href={"/"}>
      <span
        className={`${cinzelFont.className} text-2xl flex justify-center items-center text-secondary`}
      >
        <span
          className={`${
            theme === "light" ? "text-primary" : theme=== "dark"? "text-slate-100" : "text-white"
          } font-bold text-4xl`}
        >
          Surv
        </span>
        <span className="font-bold">eyco</span>
      </span>
    </Link>
  );
};

export default AppLogo;
