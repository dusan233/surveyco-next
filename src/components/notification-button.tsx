import { BellIcon } from "lucide-react";
import React from "react";

const NotificationButton = () => {
  return (
    <button className=" text-white hover:text-secondary w-8 h-8 flex justify-center items-center rounded-full">
      <BellIcon className="h-6 w-6" />
    </button>
  );
};

export default NotificationButton;
