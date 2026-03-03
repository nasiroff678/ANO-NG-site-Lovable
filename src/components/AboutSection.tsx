import { motion } from "framer-motion";
import { Building2, FileText, MapPin, Landmark } from "lucide-react";
import directorPhoto from "@/assets/director-photo.jpg";
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
  const directorName = content?.director_name || "Насыров Рустам Ралифович";
  const directorTitle = content?.director_title || "Директор АНО «НОВЫЕ ГОРИЗОНТЫ»";
  const dirPhoto = content?.director_photo || directorPhoto;
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
            <div className="inline-block rounded-2xl overflow-hidden shadow-card mb-4">
              <img src={dirPhoto} alt={directorName} className="w-56 h-56 object-cover" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground">{directorName}</h3>
            <p className="text-muted-foreground text-sm">{directorTitle}</p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact: any, i: number) => {
            const IconComponent = iconMap[fact.icon] || FileText;
            return (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl p-5 shadow-card border border-border text-center"
              >
                <IconComponent className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{fact.label}</p>
                <p className="text-sm font-semibold text-foreground">{fact.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
