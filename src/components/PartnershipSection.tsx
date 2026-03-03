import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Landmark, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/hooks/useContent";
import { submitForm } from "@/lib/submitForm";

const iconMap: Record<string, any> = { Building2, Landmark, Users };

const defaultPartnerTypes = [
  { icon: "Building2", title: "Бизнес", desc: "Спонсорство мероприятий, совместные проекты КСО, предоставление оборудования и снаряжения" },
  { icon: "Landmark", title: "Госорганы", desc: "Совместные программы, грантовая поддержка, включение в муниципальные планы по ЗОЖ" },
  { icon: "Users", title: "Другие НКО", desc: "Обмен опытом, совместные мероприятия, сетевые проекты в области детского туризма и спорта" },
];

const PartnershipSection = () => {
  const { content, isVisible } = useContent('partnership');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", phone: "+7", email: "", message: "" });

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    if (digits.length === 0) return '+7';
    if (digits[0] !== '7') digits = '7' + digits;
    digits = digits.slice(0, 11);
    let formatted = '+7';
    if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ';
    if (digits.length > 4) formatted += digits.slice(4, 7);
    if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length > 9) formatted += '-' + digits.slice(9, 11);
    return formatted;
  };

  if (isVisible === false) return null;

  const heading = content?.heading || "Партнёрство и поддержка";
  const formTitle = content?.form_title || "Заявка на партнёрство";
  const partnerTypes = content?.partner_types || defaultPartnerTypes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm({ name: form.name, phone: form.phone, email: form.email, message: form.message, organization: form.org, form_type: 'partnership' });
    } catch { /* silent */ }
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
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{heading}</h2>
          <div className="w-16 h-1 bg-gradient-orange mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {partnerTypes.map((p: any, i: number) => {
            const IconComponent = iconMap[p.icon] || Building2;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card border border-border text-center"
              >
                <IconComponent className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card rounded-xl shadow-card border border-border p-6 md:p-8">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6 text-center">{formTitle}</h3>

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
                <Input
                  placeholder="+7 (___) ___-__-__"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                  pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
                  title="Введите номер в формате +7 (XXX) XXX-XX-XX"
                />
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
