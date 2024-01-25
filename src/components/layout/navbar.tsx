"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateSurveyDialog from "../survey/create-survey-dialog";
import AppLogo from "./logo";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [createSurveyOpen, setCreateSurveyOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="flex py-2.5 px-7 items-center">
        <CreateSurveyDialog
          isOpen={createSurveyOpen}
          onOpenChange={setCreateSurveyOpen}
        />
        <div className="max-w-xs font-bold">
          <AppLogo />
        </div>
        <div className="flex-1 gap-3 flex justify-end">
          <div className="flex gap-2">
            <Button
              onClick={() => setCreateSurveyOpen(true)}
              size="sm"
              variant="ghost"
            >
              Create survey
            </Button>
            <Link href={`/library`}>
              <Button size="sm" variant="ghost">
                My surveys
              </Button>
            </Link>
          </div>
          <div className="flex gap-2">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm" variant="outline">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
