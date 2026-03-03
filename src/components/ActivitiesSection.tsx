import { motion } from "framer-motion";
import { Compass, Users, Heart, Star, BookOpen, Activity, TreePine, Trophy } from "lucide-react";
import activityHiking from "@/assets/activity-hiking.jpg";
import activityCamping from "@/assets/activity-camping.jpg";
import activitySports from "@/assets/activity-sports.jpg";
import natureRiver from "@/assets/nature-river.jpg";
import { useContent } from "@/hooks/useContent";

const iconMap: Record<string, any> = { Compass, Users, Heart, Star, BookOpen, Activity, TreePine, Trophy };
const defaultImages = [activityHiking, activitySports, activityCamping, natureRiver, activityHiking, activitySports, activityCamping, natureRiver];

const defaultActivities = [
  { icon: "Compass", title: "Туристические походы", desc: "Пешие, водные и горные маршруты по природным достопримечательностям Башкортостана" },
  { icon: "Activity", title: "Физкультурно-массовые мероприятия", desc: "Спортивные праздники, эстафеты и соревнования для детей и молодёжи" },
  { icon: "Heart", title: "Поддержка детей из многодетных семей", desc: "Бесплатные программы для детей из многодетных семей и ТЖС" },
  { icon: "Star", title: "Выявление талантов", desc: "Раскрытие потенциала каждого ребёнка через спортивные и творческие активности" },
  { icon: "BookOpen", title: "Культурно-просветительские программы", desc: "Экскурсии, мастер-классы и познавательные мероприятия на природе" },
  { icon: "TreePine", title: "Профилактика ЗОЖ", desc: "Формирование привычек здорового образа жизни у подрастающего поколения" },
  { icon: "Users", title: "Командообразование", desc: "Развитие навыков коммуникации и работы в команде через совместные приключения" },
  { icon: "Trophy", title: "Спортивные сборы и лагеря", desc: "Организация тематических спортивных лагерей в живописных местах республики" },
];

const ActivitiesSection = () => {
  const { content, isVisible } = useContent('activities');

  if (isVisible === false) return null;

  const heading = content?.heading || "Направления деятельности";
  const items = content?.items || defaultActivities;

  return (
    <section id="activities" className="py-20 md:py-28 bg-muted">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((act: any, i: number) => {
            const IconComponent = iconMap[act.icon] || Compass;
            const image = act.image || defaultImages[i % defaultImages.length];
            return (
              <motion.div
                key={act.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow border border-border"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <IconComponent className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-foreground mb-2">{act.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{act.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
