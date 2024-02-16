"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";

const UserMenu = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          style={{ backgroundImage: `url(${user!.imageUrl})` }}
          className="w-10 h-10 rounded-full bg-cover bg-no-repeat"
        ></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px]">
        <DropdownMenuLabel className="flex items-center gap-3">
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
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href={`/library`}>
            <DropdownMenuItem>
              My Surveys
              <DropdownMenuShortcut></DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>
          Log out
          <DropdownMenuShortcut></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
