import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import activityHiking from "@/assets/activity-hiking.jpg";
import activityCamping from "@/assets/activity-camping.jpg";
import natureRiver from "@/assets/nature-river.jpg";
import activitySports from "@/assets/activity-sports.jpg";
import { useContent } from "@/hooks/useContent";
import { useContentItems } from "@/hooks/useContentItems";
import { EventRegistrationModal } from "@/components/EventRegistrationModal";
import { useState } from "react";

const defaultImages = [activityHiking, natureRiver, activityCamping, activitySports];

const defaultProjects = [
  { title: "«Тропами Башкирии»", desc: "Серия пеших походов по живописным маршрутам Южного Урала для детей из многодетных семей", audience: "Дети 10–16 лет", startDate: "1 июня 2026", endDate: "2026-08-31", image: "" },
  { title: "«Река Белая — река дружбы»", desc: "Водный поход на байдарках с экологической и краеведческой программой", audience: "Подростки 14–17 лет", startDate: "15 июля 2026", endDate: "2026-07-25", image: "" },
  { title: "«Лагерь новых горизонтов»", desc: "Палаточный лагерь с программой ЗОЖ, спортивными соревнованиями и творческими мастерскими", audience: "Дети 8–14 лет", startDate: "1 августа 2026", endDate: "2026-08-14", image: "" },
  { title: "«Спорт для каждого»", desc: "Физкультурно-массовые мероприятия в школах и парках города Дюртюли и района", audience: "Дети и молодёжь 7–18 лет", startDate: "Весь год", endDate: "2026-12-31", image: "" },
];

const defaultEvents = [
  { date: "15 июня 2026", endDate: "2026-06-15", title: "Пеший поход «Инзер — жемчужина Урала»", location: "р. Инзер, Белорецкий район" },
  { date: "28 июня 2026", endDate: "2026-06-28", title: "Спортивный праздник «Здоровое лето»", location: "г. Дюртюли, городской парк" },
  { date: "12 июля 2026", endDate: "2026-07-12", title: "Водный поход по реке Белой", location: "р. Белая, Мелеузовский район" },
];

const getSafeArray = <T,>(value: T[] | undefined | null, fallback: T[]) => {
  return Array.isArray(value) && value.length > 0 ? value : fallback;
};

export const getRemainingInfo = (endDateString?: string) => {
  if (!endDateString) return null;
  const end = new Date(endDateString);
  if (isNaN(end.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { text: "Завершено", isEnded: true, days: 0 };
  if (diffDays === 0) return { text: "Последний день", isEnded: false, days: 0 };

  const getDaysWord = (n: number) => {
    let n10 = n % 10;
    let n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return 'день';
    if ([2, 3, 4].includes(n10) && ![12, 13, 14].includes(n100)) return 'дня';
    return 'дней';
  };

  return { text: `Осталось ${diffDays} ${getDaysWord(diffDays)}`, isEnded: false, days: diffDays };
};

const ProjectsSection = () => {
  const { content, isVisible } = useContent('projects');
  const { items: projectItems } = useContentItems('projects', { onlyVisible: true });
  const { items: eventItems } = useContentItems('upcoming_events', { onlyVisible: true });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState("");

  if (isVisible === false) return null;

  const heading = content?.heading || "Проекты и мероприятия";

  // Priority: 1) new content_items rows  2) legacy JSON array  3) hardcoded defaults
  const projects = projectItems.length > 0
    ? projectItems.map((it) => it.data)
    : getSafeArray(content?.projects, defaultProjects);
  const upcomingEvents = eventItems.length > 0
    ? eventItems.map((it) => it.data)
    : getSafeArray(content?.upcoming_events, defaultEvents);

  const handleOpenModal = (title: string) => {
    setSelectedEventTitle(title);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-background">
      <EventRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        eventTitle={selectedEventTitle}
      />
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
          {projects.map((p: any, i: number) => {
            const startDate = p.startDate || "";
            const endDate = p.endDate || "";
            const remaining = endDate ? getRemainingInfo(endDate) : null;
            return (
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
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-heading font-semibold text-lg text-foreground leading-tight">{p.title}</h3>
                    {remaining && (
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap border shrink-0",
                        remaining.isEnded ? "bg-muted text-muted-foreground border-border" :
                          remaining.days <= 7 ? "bg-red-50 text-red-600 border-red-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                      )}>
                        {remaining.isEnded ? null : <Timer className="w-3 h-3" />}
                        {remaining.text}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 mb-3">
                    {startDate && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> {startDate}
                      </span>
                    )}
                    {p.audience && (
                      <span className="text-xs text-secondary font-medium flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> {p.audience}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{p.desc}</p>
                  <div className="flex items-center justify-end">
                    <Button
                      size="sm"
                      className="bg-gradient-orange text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
                      onClick={() => handleOpenModal(p.title)}
                      disabled={remaining?.isEnded}
                    >
                      {remaining?.isEnded ? "Завершено" : "Участвовать"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            {upcomingEvents.map((e: any, idx: number) => {
              const endDate = e.endDate || defaultEvents[idx % defaultEvents.length]?.endDate;
              const remaining = getRemainingInfo(endDate);
              return (
                <div key={`${e.title}-${idx}`} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors rounded-lg px-2 -mx-2">
                  <div className="flex flex-col min-w-[140px]">
                    <span className="text-sm font-semibold text-accent flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {e.date}
                    </span>
                    {remaining && !remaining.isEnded && (
                      <span className={cn(
                        "text-[10px] font-medium mt-1 inline-block w-fit px-1.5 py-0.5 rounded",
                        remaining.days <= 7 ? "bg-red-100 text-red-700" : "bg-sky-100 text-sky-700"
                      )}>
                        {remaining.text}
                      </span>
                    )}
                  </div>
                  <span className={cn("text-foreground font-medium flex-1", remaining?.isEnded && "text-muted-foreground line-through")}>{e.title}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {e.location}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
