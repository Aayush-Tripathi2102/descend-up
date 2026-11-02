import CoreFeatures from "@/components/CoreFeatures";
import FAQ from "@/components/FAQ";
import FoundingCreator from "@/components/FoundingCreator";
import Hero from "@/components/Hero";
import TheFlow from "@/components/TheFlow";

export default function Home() {
  return (
    <>
      <Hero />
      <TheFlow />
      <CoreFeatures />
      <FoundingCreator />
      <FAQ />
    </>
  );
}
