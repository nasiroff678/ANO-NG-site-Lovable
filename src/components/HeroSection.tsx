import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Award, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-hiking.jpg";

const HeroSection = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
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
            Новые горизонты здоровья и приключений для детей и молодёжи Башкортостана
          </h1>
          <p className="text-primary-foreground/85 text-base sm:text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
            Туризм, физическая культура и массовый спорт как инструмент социальной поддержки многодетных семей, сирот и подростков в трудной жизненной ситуации
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10 text-primary-foreground/70 text-sm">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Зарегистрировано 20.12.2023</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> ОГРН 1230200047230</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> Готовы к президентским грантам по ЗОЖ</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-orange text-accent-foreground font-bold text-base px-8 hover:opacity-90 transition-opacity"
              onClick={() => scrollTo("#participate")}
            >
              Записаться на ближайший поход
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8"
              onClick={() => scrollTo("#partners")}
            >
              Поддержать проект
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8"
              onClick={() => scrollTo("#documents")}
            >
              Для партнёров и грантов
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
