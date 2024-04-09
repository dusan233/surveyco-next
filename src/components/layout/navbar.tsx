"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateSurveyDialog from "../survey/create-survey-dialog";
import AppLogo from "./logo";
import NavbarLink from "../navbar-link";
import UserMenu from "../user-menu";
import NotificationButton from "../notification-button";
import SidenavButton from "../sidenav-button";
import { useDisclosure } from "@/hooks/useDisclosure";
import NavDrawer from "./nav-drawer";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const [createSurveyOpen, setCreateSurveyOpen] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  //close drawer if not mobile screen
  useEffect(() => {
    const onWindowResize = (_: Event) => {
      if (window.innerWidth >= 640) onClose();
    };

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, [onClose]);

  return (
    <header className="bg-slate-800">
      <div className="flex py-2.5 p-4 sm:px-7 gap-7 items-center">
        <NavDrawer open={isOpen} onClose={onClose} />
        <CreateSurveyDialog
          isOpen={createSurveyOpen}
          onOpenChange={setCreateSurveyOpen}
        />
        <div className="max-w-xs font-bold">
          <AppLogo theme="dark" />
        </div>
        <div className="hidden sm:flex flex-1 gap-5 items-center">
          {isSignedIn && <NavbarLink href="/library">My surveys</NavbarLink>}
          <NavbarLink href="/pricing">Plans & Pricing</NavbarLink>
        </div>

        <div className="flex-1 flex gap-4 items-center justify-end">
          {isSignedIn && (
            <>
              <Button
                onClick={() => setCreateSurveyOpen(true)}
                size="sm"
                variant="secondary"
                className="hidden sm:inline-flex"
              >
                Create survey
              </Button>
            </>
          )}

          <div className="flex gap-4 items-center">
            {isSignedIn ? (
              <>
                <NotificationButton />
                <div className="sm:hidden">
                  <SidenavButton onClick={() => onOpen()} />
                </div>
                <div className="hidden sm:block">
                  <UserMenu />
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm" variant="secondary">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="neutral" size="sm">
                    Sign up
                  </Button>
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
