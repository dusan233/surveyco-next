"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type NavbarLinkProps = {
  href: string;
  children: ReactNode;
  disabled?: boolean;
};

const NavbarLink = ({ href, children, disabled }: NavbarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      className={`px-1 py-2 border-y-4 hover:border-b-slate-100 border-transparent text-sm ${
        isActive ? "text-secondary border-b-white" : "text-slate-100"
      } ${disabled && "pointer-events-none"}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavbarLink;
