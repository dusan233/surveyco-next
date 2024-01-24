import { Cinzel } from "next/font/google";
import Link from "next/link";
import React from "react";

const cinzelFont = Cinzel({
  weight: ["400", "500", "600", "800"],
  subsets: ["latin"],
});

const AppLogo = () => {
  return (
    <Link href={"/"}>
      <span
        className={`${cinzelFont.className} text-2xl flex justify-center items-center text-secondary`}
      >
        <span className="text-primary font-bold text-4xl">Surv</span>
        <span className="">eyco</span>
      </span>
    </Link>
  );
};

export default AppLogo;
