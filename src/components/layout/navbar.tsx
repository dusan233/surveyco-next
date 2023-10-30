"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="flex p-4 items-center">
      <div className="text-3xl max-w-xs font-bold py-2">Fast Notes ★</div>
      <div className="flex-1 gap-3 flex justify-end">
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            Create survey
          </Button>
          <Button size="sm" variant="ghost">
            Just something
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
