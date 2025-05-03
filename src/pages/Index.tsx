
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { DoctorSpecialties } from "@/components/home/DoctorSpecialties";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <DoctorSpecialties />
      <HowItWorks />
      <CTASection />
    </Layout>
  );
};

export default Index;
