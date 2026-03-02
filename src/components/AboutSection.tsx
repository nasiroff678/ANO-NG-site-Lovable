import { motion } from "framer-motion";
import { Building2, FileText, MapPin, Landmark } from "lucide-react";
import directorPhoto from "@/assets/director-photo.jpg";

const facts = [
  { icon: FileText, label: "ИНН", value: "0260996986" },
  { icon: Building2, label: "ОГРН", value: "1230200047230" },
  { icon: MapPin, label: "Адрес", value: "г. Дюртюли, ул. Ленина, д. 8, оф. 202" },
  { icon: Landmark, label: "Банк", value: "АО «АЛЬФА-БАНК»" },
];

const AboutSection = () => {
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
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">О нас</h2>
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
              АНО «НОВЫЕ ГОРИЗОНТЫ» — центр социальной поддержки в области туризма, физической культуры и массового спорта. 
              Мы создаём условия для оздоровления и всестороннего развития детей и молодёжи Республики Башкортостан через организацию 
              туристических походов, физкультурно-массовых мероприятий и культурно-просветительских программ.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              Особое внимание уделяем детям из многодетных семей, сиротам и подросткам, оказавшимся в трудной жизненной ситуации. 
              Наша миссия — открыть новые горизонты возможностей для каждого ребёнка через активный и здоровый образ жизни на природе 
              родного Башкортостана.
            </p>

            <div className="bg-muted rounded-lg p-6 border border-border">
              <h3 className="font-heading font-semibold text-foreground mb-2">Почему мы</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Индивидуальные программы под запрос школы, семьи или организации. Мы составляем маршрут и содержание мероприятия 
                именно под ваши потребности, возраст и физическую подготовку участников.
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
              <img src={directorPhoto} alt="Директор Насыров Рустам Ралифович" className="w-56 h-56 object-cover" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground">Насыров Рустам Ралифович</h3>
            <p className="text-muted-foreground text-sm">Директор АНО «НОВЫЕ ГОРИЗОНТЫ»</p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border text-center"
            >
              <fact.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{fact.label}</p>
              <p className="text-sm font-semibold text-foreground">{fact.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
