import { motion } from "framer-motion";
import { Building2, FileText, MapPin, Landmark, Smile, Tent, Route, Heart } from "lucide-react";
import orgLogo from "@/assets/logo.png";
import { useContent } from "@/hooks/useContent";

const iconMap: Record<string, any> = { FileText, Building2, MapPin, Landmark };

const defaultFacts = [
  { icon: "FileText", label: "ИНН", value: "0260996986" },
  { icon: "Building2", label: "ОГРН", value: "1230200047230" },
  { icon: "MapPin", label: "Адрес", value: "г. Дюртюли, ул. Ленина, д. 8, оф. 202" },
  { icon: "Landmark", label: "Банк", value: "АО «АЛЬФА-БАНК»" },
];

const AboutSection = () => {
  const { content, isVisible } = useContent('about');

  if (isVisible === false) return null;

  const heading = content?.heading || "О нас";
  const paragraph1 = content?.paragraph_1 || "АНО «НОВЫЕ ГОРИЗОНТЫ» — центр социальной поддержки в области туризма, физической культуры и массового спорта. Мы создаём условия для оздоровления и всестороннего развития детей и молодёжи Республики Башкортостан через организацию туристических походов, физкультурно-массовых мероприятий и культурно-просветительских программ.";
  const paragraph2 = content?.paragraph_2 || "Особое внимание уделяем детям из многодетных семей, сиротам и подросткам, оказавшимся в трудной жизненной ситуации. Наша миссия — открыть новые горизонты возможностей для каждого ребёнка через активный и здоровый образ жизни на природе родного Башкортостана.";
  const whyUsTitle = content?.why_us_title || "Почему мы";
  const whyUsText = content?.why_us_text || "Индивидуальные программы под запрос школы, семьи или организации. Мы составляем маршрут и содержание мероприятия именно под ваши потребности, возраст и физическую подготовку участников.";
  const dirPhoto = content?.director_photo || orgLogo;
  const facts = content?.facts || defaultFacts;

  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{heading}</h2>
          <div className="w-16 h-1 bg-gradient-orange mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              {paragraph1}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              {paragraph2}
            </p>

            <div className="bg-muted rounded-lg p-6 border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-2">{whyUsTitle}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {whyUsText}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block rounded-2xl overflow-hidden shadow-card mb-4 bg-white p-4">
              <img src={dirPhoto} alt="АНО НОВЫЕ ГОРИЗОНТЫ" className="w-56 h-56 object-contain" />
            </div>
          </motion.div>
        </div>

        {/* Impact Statistics Section */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {[
            {
              number: "500+",
              description: "Счастливых участников",
              icon: Smile,
              color: "text-orange"
            },
            {
              number: "50+",
              description: "Организованных походов",
              icon: Tent,
              color: "text-forest"
            },
            {
              number: "10+",
              description: "Уникальных маршрутов",
              icon: Route,
              color: "text-primary"
            },
            {
              number: "100%",
              description: "Безопасность детей",
              icon: Heart,
              color: "text-accent"
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group bg-card/50 backdrop-blur-sm hover:bg-card border border-border/50 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className={`mx-auto w-12 h-12 mb-4 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h4 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2 group-hover:-translate-y-1 transition-transform duration-500">
                  {stat.number}
                </h4>

                <p className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
