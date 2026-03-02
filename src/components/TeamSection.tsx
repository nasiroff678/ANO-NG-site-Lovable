import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import directorPhoto from "@/assets/director-photo.jpg";

const TeamSection = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Наша команда</h2>
          <div className="w-16 h-1 bg-gradient-forest mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 shadow-card border-4 border-primary/20">
              <img src={directorPhoto} alt="Насыров Рустам Ралифович" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground">Насыров Рустам Ралифович</h3>
            <p className="text-muted-foreground mb-6">Директор АНО «НОВЫЕ ГОРИЗОНТЫ»</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-lg mx-auto">
              Руководит организацией с момента основания. Опытный организатор туристических и спортивных мероприятий. 
              Убеждён, что каждый ребёнок заслуживает возможность открыть для себя новые горизонты.
            </p>

            <div className="bg-muted rounded-xl p-6 border border-border">
              <h4 className="font-heading font-semibold text-foreground mb-2">Присоединяйся волонтёром!</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Мы ищем инструкторов, вожатых, фотографов и всех неравнодушных людей
              </p>
              <Button
                className="bg-gradient-orange text-accent-foreground font-semibold hover:opacity-90"
                onClick={() => scrollTo("#participate")}
              >
                Стать волонтёром
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
