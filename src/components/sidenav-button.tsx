import { MenuIcon } from "lucide-react";
import React from "react";

export interface SidenavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SidenavButton = (props: SidenavButtonProps) => {
  return (
    <button
      {...props}
      className="w-8 h-8 flex rounded-full text-white justify-center items-center"
    >
      <MenuIcon className="w-6 h-6" />
    </button>
  );
};

export default SidenavButton;
