import "../styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surveyco",
  description: "",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <div>
              <div>{children}</div>
              <Toaster />
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
