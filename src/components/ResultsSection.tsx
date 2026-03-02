import { motion } from "framer-motion";
import { TrendingUp, Users, MapPin, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Участников программ" },
  { icon: MapPin, value: "25+", label: "Маршрутов по Башкортостану" },
  { icon: TrendingUp, value: "15+", label: "Мероприятий проведено" },
  { icon: Heart, value: "100+", label: "Детей из ТЖС поддержано" },
];

const testimonials = [
  {
    text: "Благодаря походу мой сын впервые поверил в себя. Он вернулся другим человеком — уверенным и счастливым!",
    author: "Елена М., мама участника",
  },
  {
    text: "Наша школа сотрудничает с АНО «Новые горизонты» уже полгода. Дети в восторге от каждого мероприятия.",
    author: "Ирина С., директор школы",
  },
  {
    text: "Организация на высшем уровне, маршруты безопасные и очень красивые. Рекомендую всем семьям!",
    author: "Марат К., отец двоих детей",
  },
];

const ResultsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-forest text-primary-foreground">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Результаты и влияние</h2>
          <div className="w-16 h-1 bg-gradient-orange mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <s.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
              <div className="text-4xl md:text-5xl font-heading font-black mb-2">{s.value}</div>
              <p className="text-sm opacity-80">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6 border border-primary-foreground/20"
            >
              <p className="text-sm leading-relaxed mb-4 italic opacity-90">«{t.text}»</p>
              <p className="text-xs font-semibold opacity-70">— {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
