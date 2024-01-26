import React from "react";
import { Button } from "../ui/button";

type OauthProviderButtonProps = {
  onClick: () => any;
  children: React.ReactNode;
  provider: "google" | "facebook";
};

const OauthProviderButton = ({
  onClick,
  children,
  provider,
}: OauthProviderButtonProps) => {
  const providerImagePath =
    provider === "google" ? "/google_icon.png" : "/facebook_icon.png";
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundImage: `url(${providerImagePath})`,
      }}
      className="border bg-contain bg-no-repeat bg-left bg-origin-content border-gray-300 bg-white hover:border-gray-500 hover:bg-gray-50 text-black gap-2 w-full inline-flex items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      {children}
    </Button>
  );
};

export default OauthProviderButton;
