"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateSurveyModal from "../survey/create-survey-modal";
import AppLogo from "./logo";
import NavbarLink from "../navbar-link";
import UserMenu from "../user-menu";
import NotificationButton from "../notification-button";
import SidenavButton from "../sidenav-button";
import { useDisclosure } from "@/hooks/useDisclosure";
import NavDrawer from "./nav-drawer";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const {
    isOpen: drawerIsOpen,
    onClose: onCloseDrawer,
    onOpen: onOpenDrawer,
  } = useDisclosure();
  const {
    isOpen: createSurveyOpen,
    onClose: onCloseCreateSurvey,
    onOpen: onOpenCreateSurvey,
  } = useDisclosure();

  //close drawer if not mobile screen
  useEffect(() => {
    const onWindowResize = (_: Event) => {
      if (window.innerWidth >= 640) onCloseDrawer();
    };

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, [onCloseDrawer]);

  return (
    <header className="bg-slate-800">
      <div className="flex py-2.5 p-4 sm:px-7 gap-7 items-center">
        <NavDrawer open={drawerIsOpen} onClose={onCloseDrawer} />
        <CreateSurveyModal
          isOpen={createSurveyOpen}
          onClose={onCloseCreateSurvey}
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
                onClick={onOpenCreateSurvey}
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
                  <SidenavButton onClick={() => onOpenDrawer()} />
                </div>
                <div className="hidden sm:block">
                  <UserMenu />
                </div>
              </>
            ) : (
              <>
                <Button asChild size="sm" variant="secondary">
                  <Link href="/login">Sign in</Link>
                </Button>

                <Button asChild variant="neutral" size="sm">
                  <Link href="/sign-up">Sign up </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
