"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateSurveyDialog from "../survey/create-survey-dialog";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [createSurveyOpen, setCreateSurveyOpen] = useState(false);

  return (
    <div className="flex p-4 items-center">
      <CreateSurveyDialog
        isOpen={createSurveyOpen}
        onOpenChange={setCreateSurveyOpen}
      />
      <div className="text-3xl max-w-xs font-bold py-2">Surveyco</div>
      <div className="flex-1 gap-3 flex justify-end">
        <div className="flex gap-2">
          <Button
            onClick={() => setCreateSurveyOpen(true)}
            size="sm"
            variant="ghost"
          >
            Create survey
          </Button>
          <Button size="sm" variant="ghost">
            My surveys
          </Button>
        </div>
        <div className="flex gap-2">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Link href="/sign-in">
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
  );
};

export default Navbar;
