import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-accent">{children}</main>
      <Footer />
    </div>
  );
}
