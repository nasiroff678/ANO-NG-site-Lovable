import { motion } from "framer-motion";
import { TrendingUp, Users, MapPin, Heart } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const iconMap: Record<string, any> = { TrendingUp, Users, MapPin, Heart };

const defaultStats = [
  { icon: "Users", value: "500+", label: "Участников программ" },
  { icon: "MapPin", value: "25+", label: "Маршрутов по Башкортостану" },
  { icon: "TrendingUp", value: "15+", label: "Мероприятий проведено" },
  { icon: "Heart", value: "100+", label: "Детей из ТЖС поддержано" },
];

const defaultTestimonials = [
  { text: "Благодаря походу мой сын впервые поверил в себя. Он вернулся другим человеком — уверенным и счастливым!", author: "Елена М., мама участника" },
  { text: "Наша школа сотрудничает с АНО «Новые горизонты» уже полгода. Дети в восторге от каждого мероприятия.", author: "Ирина С., директор школы" },
  { text: "Организация на высшем уровне, маршруты безопасные и очень красивые. Рекомендую всем семьям!", author: "Марат К., отец двоих детей" },
];

const ResultsSection = () => {
  const { content, isVisible } = useContent('results');

  if (isVisible === false) return null;

  const heading = content?.heading || "Результаты и влияние";
  const stats = content?.stats || defaultStats;
  const testimonials = content?.testimonials || defaultTestimonials;

  return (
    <section className="py-20 md:py-28 bg-gradient-forest text-primary-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">{heading}</h2>
          <div className="w-16 h-1 bg-gradient-orange mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s: any, i: number) => {
            const IconComponent = iconMap[s.icon] || Users;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <IconComponent className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <div className="text-4xl md:text-5xl font-heading font-black mb-2">{s.value}</div>
                <p className="text-sm opacity-80">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-8 px-2 sm:px-0">
          {testimonials.map((t: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-white text-gray-800 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="absolute -top-6 left-4 text-7xl text-primary/10 font-serif leading-none select-none">
                "
              </div>
              <p className="text-base sm:text-[15px] leading-relaxed mb-8 italic relative z-10 font-medium text-gray-700">«{t.text}»</p>
              <div className="flex items-center gap-4 mt-auto relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden border-2 border-primary/20">
                  {t.image ? (
                    <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-primary">{t.author.charAt(0)}</span>
                  )}
                </div>
                <p className="text-sm font-bold text-gray-900">{t.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
