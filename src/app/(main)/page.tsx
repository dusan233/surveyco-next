import HomeHeroSection from "@/components/home-hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surveyco: Online Survey creator",
  description:
    "Home page for Surveyco - online tool for creating and taking surveys.",
};

export default function Home() {
  return (
    <div className="">
      <HomeHeroSection />
    </div>
  );
}
