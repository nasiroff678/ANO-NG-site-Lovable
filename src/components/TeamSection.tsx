import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import directorPhoto from "@/assets/director-photo.jpg";
import { useContent } from "@/hooks/useContent";

const TeamSection = () => {
  const { content, isVisible } = useContent('team');

  if (isVisible === false) return null;

  const heading = content?.heading || "Наша команда";
  const volunteerTitle = content?.volunteer_title || "Присоединяйся волонтёром!";
  const volunteerText = content?.volunteer_text || "Мы ищем инструкторов, вожатых, фотографов и всех неравнодушных людей";
  const volunteerCta = content?.volunteer_cta || "Стать волонтёром";

  // Fallback for old structure or if no members array
  const defaultMember = {
    name: content?.director_name || "Насыров Рустам Ралифович",
    title: content?.director_title || "Директор АНО «НОВЫЕ ГОРИЗОНТЫ»",
    bio: content?.director_bio || "Руководит организацией с момента основания. Опытный организатор туристических и спортивных мероприятий. Убеждён, что каждый ребёнок заслуживает возможность открыть для себя новые горизонты.",
    photo: content?.director_photo || directorPhoto
  };

  const members = content?.members || [defaultMember];

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
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{heading}</h2>
          <div className="w-16 h-1 bg-gradient-forest mx-auto rounded-full" />
        </motion.div>

        <div className={`grid gap-12 ${members.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-2xl mx-auto'}`}>
          {members.map((member: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 shadow-card border-4 border-primary/20">
                <img src={member.photo || directorPhoto} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground">{member.name}</h3>
              <p className="text-muted-foreground mb-4">{member.title}</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-16"
        >
          <div className="bg-muted rounded-xl p-6 border border-border text-center">
            <h4 className="font-heading font-semibold text-foreground mb-2">{volunteerTitle}</h4>
            <p className="text-sm text-muted-foreground mb-4">{volunteerText}</p>
            <Button
              className="bg-gradient-orange text-accent-foreground font-semibold hover:opacity-90"
              onClick={() => scrollTo("#participate")}
            >
              {volunteerCta}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
