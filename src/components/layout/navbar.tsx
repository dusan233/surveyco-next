"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateSurveyDialog from "../survey/create-survey-dialog";
import AppLogo from "./logo";
import { BellIcon } from "lucide-react";
import NavbarLink from "../navbar-link";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [createSurveyOpen, setCreateSurveyOpen] = useState(false);

  return (
    <header className="bg-slate-800">
      <div className="flex py-2.5 px-7 gap-7 items-center">
        <CreateSurveyDialog
          isOpen={createSurveyOpen}
          onOpenChange={setCreateSurveyOpen}
        />
        <div className="max-w-xs font-bold">
          <AppLogo theme="dark" />
        </div>
        <div className="flex-1 gap-5 flex items-center">
          {isSignedIn && <NavbarLink href="/library">My surveys</NavbarLink>}
          <NavbarLink href="/pricing">Plans & Pricing</NavbarLink>
        </div>
        <div className="flex-1 gap-7 flex items-center justify-end">
          {isSignedIn && (
            <Button
              onClick={() => setCreateSurveyOpen(true)}
              size="sm"
              variant="outline"
            >
              Create survey
            </Button>
          )}

          <div className="flex gap-4 items-center">
            {isSignedIn ? (
              <>
                <Button
                  onClick={() => setCreateSurveyOpen(true)}
                  size="icon"
                  variant="icon"
                >
                  <BellIcon className="h-4 w-4" />
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
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
