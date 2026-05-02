import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Camera } from "lucide-react";
import { useState } from "react";
import activityHiking from "@/assets/activity-hiking.jpg";
import activityCamping from "@/assets/activity-camping.jpg";
import natureRiver from "@/assets/nature-river.jpg";
import activitySports from "@/assets/activity-sports.jpg";
import { useContent } from "@/hooks/useContent";
import { useContentItems } from "@/hooks/useContentItems";
import ImageGalleryModal from "./ImageGalleryModal";

const defaultImages = [activityHiking, activitySports, natureRiver, activityCamping];

const defaultPastEvents = [
  { date: "15 марта 2025", title: "Зимний поход «Ледяные тропы Инзера»", location: "р. Инзер, Белорецкий район", participants: 32, description: "Двухдневный зимний поход по замёрзшим берегам реки Инзер. Дети из многодетных семей познакомились с зимним туризмом, научились ставить палатки на снегу и готовить пищу на костре.", image: "" },
  { date: "28 января 2025", title: "Спортивный фестиваль «Зимние старты»", location: "г. Дюртюли, стадион «Нефтяник»", participants: 120, description: "Массовый спортивный праздник для детей и подростков: лыжные гонки, эстафеты, перетягивание каната. Участвовали воспитанники детских домов и дети из семей в ТЖС.", image: "" },
  { date: "10 октября 2024", title: "Осенний сплав по реке Белой", location: "р. Белая, Мелеузовский район", participants: 24, description: "Трёхдневный водный поход на байдарках с экологической программой. Ребята изучали флору и фауну прибрежной зоны, участвовали в уборке берегов.", image: "" },
  { date: "5 августа 2024", title: "Палаточный лагерь «Горизонт»", location: "Павловское водохранилище", participants: 45, description: "Недельный палаточный лагерь с программой ЗОЖ: утренние зарядки, туристические навыки, творческие мастерские, вечерние костры с песнями.", image: "" },
];

const PastEventsSection = () => {
  const { content, isVisible } = useContent('past_events');
  const { items: pastEventItems } = useContentItems('past_events', { onlyVisible: true });
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryTitle, setGalleryTitle] = useState("");

  if (isVisible === false) return null;

  const heading = content?.heading || "Прошедшие мероприятия";
  const subtitle = content?.subtitle || "Каждое мероприятие — это новый опыт, знакомства и яркие эмоции для наших участников";
  
  const openGallery = (images: string[], title: string) => {
    setGalleryImages(images);
    setGalleryTitle(title);
    setIsGalleryOpen(true);
  };
  
  // Helper to parse dates like "15 марта 2025" or "15.03.2025" for sorting
  const parseDate = (dateStr: string) => {
    if (!dateStr) return 0;
    
    // Try DD.MM.YYYY format
    if (dateStr.includes('.')) {
      const parts = dateStr.split('.');
      if (parts.length >= 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          return new Date(year, month, day).getTime();
        }
      }
    }

    // Try Russian text format
    const months: Record<string, number> = {
      'января': 0, 'февраля': 1, 'марта': 2, 'апреля': 3, 'мая': 4, 'июня': 5,
      'июля': 6, 'августа': 7, 'сентября': 8, 'октября': 9, 'ноября': 10, 'декабря': 11
    };
    const parts = dateStr.split(' ');
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const month = months[parts[1].toLowerCase()];
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day).getTime();
      }
    }
    return 0; // Fallback
  };

  // Priority: 1) new content_items rows  2) legacy JSON array  3) hardcoded defaults
  const rawEvents = pastEventItems.length > 0
    ? pastEventItems.map((it) => it.data)
    : (Array.isArray(content?.events) && content.events.length > 0 ? content.events : defaultPastEvents);
  const events = [...rawEvents].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  return (
    <section id="past-events" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{heading}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          <div className="w-16 h-1 bg-gradient-sky mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="space-y-8">
          {events.map((event: any, i: number) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl overflow-hidden shadow-card border border-border flex flex-col md:flex-row"
            >
              <div className="md:w-80 lg:w-96 aspect-video md:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={event.image || defaultImages[i % defaultImages.length]}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.location}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg md:text-xl text-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {event.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary">
                    <Users className="w-4 h-4" />
                    {event.participants} участников
                  </span>
                  {event.photos && event.photos.length > 0 ? (
                    <button 
                      onClick={() => openGallery(event.photos, event.title)}
                      className="inline-flex items-center gap-1.5 text-sm text-primary cursor-pointer hover:underline"
                    >
                      <Camera className="w-4 h-4" />
                      Фотоотчёт ({event.photos.length})
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Camera className="w-4 h-4" />
                      Фотоотчёт
                    </span>
                  )}
                  {event.web_link_url && (
                    <a href={event.web_link_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary cursor-pointer hover:underline ml-2">
                       Подробнее
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <ImageGalleryModal 
        images={galleryImages}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        title={galleryTitle}
      />
    </section>
  );
};

export default PastEventsSection;
