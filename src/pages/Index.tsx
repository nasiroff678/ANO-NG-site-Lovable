import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import ProjectsSection from "@/components/ProjectsSection";
import PastEventsSection from "@/components/PastEventsSection";
import ResultsSection from "@/components/ResultsSection";
import TeamSection from "@/components/TeamSection";
import DocumentsSection from "@/components/DocumentsSection";
import PartnershipSection from "@/components/PartnershipSection";
import ParticipateSection from "@/components/ParticipateSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import ChatConsultant from "@/components/ChatConsultant";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ActivitiesSection />
      <ProjectsSection />
      <PastEventsSection />
      <ResultsSection />
      <TeamSection />
      <DocumentsSection />
      <PartnershipSection />
      <ParticipateSection />
      <ContactSection />
      <FooterSection />
      <ScrollToTop />
      <ChatConsultant />
    </div>
  );
};

export default Index;
