"use client";

import React from "react";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Button } from "../ui/button";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";

type NavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const NavDrawer = ({ open, onClose }: NavDrawerProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className="h-[85%] border-none bg-white">
        <div className="w-full p-4 space-y-5">
          {isLoaded && isSignedIn && (
            <div className="flex items-center gap-3">
              <div
                style={{ backgroundImage: `url(${user!.imageUrl})` }}
                className="w-10 h-10 rounded-full bg-cover bg-no-repeat"
              />
              <div>
                <div>{user!.fullName}</div>
                <div className="text-xs font-normal">
                  {user!.emailAddresses[0].emailAddress}
                </div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {isSignedIn && (
              <Link
                onClick={() => onClose()}
                className="block p-2 rounded-sm"
                href="/library"
              >
                My surveys
              </Link>
            )}
            <Link
              onClick={() => onClose()}
              className="block p-2 rounded-sm"
              href="/price"
            >
              Plans & Price
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {isSignedIn ? (
              <>
                <Button asChild variant="secondary" className="w-full">
                  <Link onClick={() => onClose()} href="/library">
                    Create survey
                  </Link>
                </Button>

                <Button
                  onClick={async () => {
                    await signOut();
                    onClose();
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="w-full">
                  <Link onClick={() => onClose()} href="/sign-up">
                    Sign up
                  </Link>
                </Button>

                <Button asChild className="w-full" variant="neutral">
                  <Link onClick={() => onClose()} href="/login">
                    Log in
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
