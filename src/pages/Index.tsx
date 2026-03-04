import { useState, useEffect } from "react";
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
import SplashScreen from "@/components/SplashScreen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  // Use sessionStorage to only show splash screen once per session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem("hasSeenSplash", "true");
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* 
        Instead of unmounting the main content, we render it so it pre-loads 
        images and layout, but we could hide its scrollbar or keep it behind.
        Since we set overflow-hidden in SplashScreen effect, it works beautifully.
      */}
      <div
        className={`transition-opacity duration-700 ${showSplash ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}
      >
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
    </div>
  );
};

export default Index;

