import React from "react";
import { Button } from "./ui/button";
import TypeEffectHeading from "./type-effect-heading";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

const HomeHeroSection = () => {
  const { userId } = auth();
  return (
    <div className="p-4 sm:p-10 min-h-[600px] bg-secondary text-center bg-grid-black/[0.07] relative flex flex-col gap-4 items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <TypeEffectHeading
        sentences={[
          "Will my product be a success or a flop?",
          "Are my employees happy at work?",
          "Do people like attending my events?",
          "Are my customers actually satisfied?",
        ]}
      />
      <p className="text-primary text-lg">
        Create surveys that break the norm.
      </p>
      {!userId ? (
        <Link href="/sign-up">
          <Button size="lg" className="mt-8 w-36" variant="default">
            Get started
          </Button>
        </Link>
      ) : (
        <Link href="/library">
          <Button size="lg" className="mt-8 w-36" variant="default">
            My surveys
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HomeHeroSection;
