import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

type OauthProviderButtonProps = {
  onClick: () => any;
  children: React.ReactNode;
  provider: "google" | "facebook" | "microsoft";
  direction?: "row" | "col";
};

const OauthProviderButton = ({
  onClick,
  children,
  provider,
  direction,
}: OauthProviderButtonProps) => {
  const providerImagePath =
    provider === "google"
      ? "/google_icon.png"
      : provider === "facebook"
      ? "/facebook_icon.png"
      : "/microsoft_icon.png";
  return direction === "col" ? (
    <Button
      onClick={onClick}
      style={{
        backgroundImage: `url(${providerImagePath})`,
      }}
      className="border bg-contain bg-no-repeat bg-left bg-origin-content border-gray-300 bg-white hover:border-gray-500 hover:bg-gray-50 text-black gap-2 w-full inline-flex items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </Button>
  ) : (
    <Button
      onClick={onClick}
      className="border min-w-[100px] flex-1 gap-0.5 h-full flex-col  border-gray-300 bg-white hover:border-gray-500 hover:bg-gray-50 text-black  w-full inline-flex items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <Image
        src={providerImagePath}
        width={20}
        height={20}
        alt="oauth provider icon"
      />
      <div>{children}</div>
    </Button>
  );
};

export default OauthProviderButton;
