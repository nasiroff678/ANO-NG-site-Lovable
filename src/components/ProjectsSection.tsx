import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import activityHiking from "@/assets/activity-hiking.jpg";
import activityCamping from "@/assets/activity-camping.jpg";
import natureRiver from "@/assets/nature-river.jpg";
import activitySports from "@/assets/activity-sports.jpg";
import { useContent } from "@/hooks/useContent";

const defaultImages = [activityHiking, natureRiver, activityCamping, activitySports];

const defaultProjects = [
  { title: "«Тропами Башкирии»", desc: "Серия пеших походов по живописным маршрутам Южного Урала для детей из многодетных семей", audience: "Дети 10–16 лет", image: "" },
  { title: "«Река Белая — река дружбы»", desc: "Водный поход на байдарках с экологической и краеведческой программой", audience: "Подростки 14–17 лет", image: "" },
  { title: "«Лагерь новых горизонтов»", desc: "Палаточный лагерь с программой ЗОЖ, спортивными соревнованиями и творческими мастерскими", audience: "Дети 8–14 лет", image: "" },
  { title: "«Спорт для каждого»", desc: "Физкультурно-массовые мероприятия в школах и парках города Дюртюли и района", audience: "Дети и молодёжь 7–18 лет", image: "" },
];

const defaultEvents = [
  { date: "15 июня 2026", title: "Пеший поход «Инзер — жемчужина Урала»", location: "р. Инзер, Белорецкий район" },
  { date: "28 июня 2026", title: "Спортивный праздник «Здоровое лето»", location: "г. Дюртюли, городской парк" },
  { date: "12 июля 2026", title: "Водный поход по реке Белой", location: "р. Белая, Мелеузовский район" },
];

const ProjectsSection = () => {
  const { content, isVisible } = useContent('projects');

  if (isVisible === false) return null;

  const heading = content?.heading || "Проекты и мероприятия";
  const projects = content?.projects || defaultProjects;
  const upcomingEvents = content?.upcoming_events || defaultEvents;

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{heading}</h2>
          <div className="w-16 h-1 bg-gradient-sky mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {projects.map((p: any, i: number) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl overflow-hidden shadow-card border border-border flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img src={p.image || defaultImages[i % defaultImages.length]} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 flex-1">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {p.audience}
                  </span>
                  <Button
                    size="sm"
                    className="bg-gradient-orange text-accent-foreground font-semibold hover:opacity-90"
                    onClick={() => scrollTo("#participate")}
                  >
                    Участвовать
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl shadow-card border border-border p-6 md:p-8"
        >
          <h3 className="font-heading font-semibold text-xl text-foreground mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Ближайшие события
          </h3>
          <div className="space-y-4">
            {upcomingEvents.map((e: any) => (
              <div key={e.title} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-3 border-b border-border last:border-0">
                <span className="text-sm font-semibold text-accent min-w-[130px]">{e.date}</span>
                <span className="text-foreground font-medium flex-1">{e.title}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {e.location}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
