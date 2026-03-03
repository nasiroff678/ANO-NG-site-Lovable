import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Award, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-hiking.jpg";
import { useContent } from "@/hooks/useContent";

const HeroSection = () => {
  const { content, isVisible } = useContent('hero');

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (isVisible === false) return null;

  const heading = content?.heading || "Новые горизонты здоровья и приключений для детей и молодёжи Башкортостана";
  const subheading = content?.subheading || "Туризм, физическая культура и массовый спорт как инструмент социальной поддержки многодетных семей, сирот и подростков в трудной жизненной ситуации";
  const badgeDate = content?.badge_date || "Зарегистрировано 20.12.2023";
  const badgeOgrn = content?.badge_ogrn || "ОГРН 1230200047230";
  const badgeGrant = content?.badge_grant || "Готовы к президентским грантам по ЗОЖ";
  const ctaPrimaryText = content?.cta_primary_text || "Записаться на ближайший поход";
  const ctaPrimaryHref = content?.cta_primary_href || "#participate";
  const ctaSecondaryText = content?.cta_secondary_text || "Поддержать проект";
  const ctaSecondaryHref = content?.cta_secondary_href || "#partners";
  const ctaTertiaryText = content?.cta_tertiary_text || "Для партнёров и грантов";
  const ctaTertiaryHref = content?.cta_tertiary_href || "#documents";
  const bgImage = content?.background_image || heroImage;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative z-10 container py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground leading-tight mb-6">
            {heading}
          </h1>
          <p className="text-primary-foreground/85 text-base sm:text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
            {subheading}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10 text-primary-foreground/70 text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {badgeDate}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> {badgeOgrn}</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> {badgeGrant}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-orange text-accent-foreground font-bold text-base px-8 hover:opacity-90 transition-opacity"
              onClick={() => scrollTo(ctaPrimaryHref)}
            >
              {ctaPrimaryText}
            </Button>
            <Button
              size="lg"
              className="bg-white/95 text-gray-800 border-2 border-white font-semibold text-base px-8 hover:bg-white transition-colors"
              onClick={() => scrollTo(ctaSecondaryHref)}
            >
              {ctaSecondaryText}
            </Button>
            <Button
              size="lg"
              className="bg-white/95 text-gray-800 border-2 border-white font-semibold text-base px-8 hover:bg-white transition-colors"
              onClick={() => scrollTo(ctaTertiaryHref)}
            >
              {ctaTertiaryText}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
