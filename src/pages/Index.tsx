import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResultsSection from "@/components/ResultsSection";
import TeamSection from "@/components/TeamSection";
import DocumentsSection from "@/components/DocumentsSection";
import PartnershipSection from "@/components/PartnershipSection";
import ParticipateSection from "@/components/ParticipateSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <ProjectsSection />
      <ResultsSection />
      <TeamSection />
      <DocumentsSection />
      <PartnershipSection />
      <ParticipateSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default Index;
