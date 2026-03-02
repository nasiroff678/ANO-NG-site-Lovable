import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Landmark, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const partnerTypes = [
  {
    icon: Building2,
    title: "Бизнес",
    desc: "Спонсорство мероприятий, совместные проекты КСО, предоставление оборудования и снаряжения",
  },
  {
    icon: Landmark,
    title: "Госорганы",
    desc: "Совместные программы, грантовая поддержка, включение в муниципальные планы по ЗОЖ",
  },
  {
    icon: Users,
    title: "Другие НКО",
    desc: "Обмен опытом, совместные мероприятия, сетевые проекты в области детского туризма и спорта",
  },
];

const PartnershipSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", org: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="partners" className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Партнёрство и поддержка</h2>
          <div className="w-16 h-1 bg-gradient-orange mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {partnerTypes.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border text-center"
            >
              <p.icon className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card rounded-xl shadow-card border border-border p-6 md:p-8">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6 text-center">Заявка на партнёрство</h3>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="font-semibold text-foreground">Спасибо! Ваша заявка отправлена.</p>
                <p className="text-sm text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Ваше имя *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Организация" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
                <Input placeholder="Телефон *" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Input placeholder="Email *" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Textarea placeholder="Сообщение" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <Button type="submit" className="w-full bg-gradient-forest text-primary-foreground font-semibold hover:opacity-90">
                  Отправить заявку
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
