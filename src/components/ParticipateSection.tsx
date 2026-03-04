import { useState } from "react";
import { motion } from "framer-motion";
import { Users, School, Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/hooks/useContent";
import { submitForm } from "@/lib/submitForm";

const iconMap: Record<string, any> = { Users, School, Heart };

type FormType = "parent" | "school" | "volunteer";

const defaultTabs = [
  { key: "parent", icon: "Users", label: "Для родителей", desc: "Запишите ребёнка на ближайший поход или мероприятие" },
  { key: "school", icon: "School", label: "Для школ", desc: "Индивидуальная программа — составим маршрут именно под вас" },
  { key: "volunteer", icon: "Heart", label: "Волонтёрство", desc: "Помогите детям открыть новые горизонты" },
];

const ParticipateSection = () => {
  const { content, isVisible } = useContent('participate');
  const [active, setActive] = useState<FormType>("parent");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "+7", email: "", message: "" });

  const formatPhone = (value: string) => {
    // Keep only digits
    let digits = value.replace(/\D/g, '');
    // Ensure it starts with 7
    if (digits.length === 0) return '+7';
    if (digits[0] !== '7') digits = '7' + digits;
    // Limit to 11 digits (7 + 10)
    digits = digits.slice(0, 11);
    // Format: +7 (XXX) XXX-XX-XX
    let formatted = '+7';
    if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ') ';
    if (digits.length > 4) formatted += digits.slice(4, 7);
    if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length > 9) formatted += '-' + digits.slice(9, 11);
    return formatted;
  };

  if (isVisible === false) return null;

  const heading = content?.heading || "Как участвовать";
  const subtitle = content?.subtitle || "Персональный подход — составим маршрут именно под вас";
  const formSubtitle = content?.form_subtitle || "Заполните форму и мы свяжемся с вами";
  const tabs = content?.tabs || defaultTabs;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm({ name: form.name, phone: form.phone, email: form.email, message: form.message, form_type: active });
    } catch { /* silent */ }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="participate" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{heading}</h2>
          <div className="w-16 h-1 bg-gradient-sky mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {tabs.map((t: any) => {
            const IconComponent = iconMap[t.icon] || Users;
            return (
              <button
                key={t.key}
                onClick={() => { setActive(t.key); setSubmitted(false); }}
                className={`p-5 rounded-xl border-2 text-left transition-all ${active === t.key
                  ? "border-primary bg-card shadow-card"
                  : "border-border bg-card/50 hover:border-primary/30"
                  }`}
              >
                <IconComponent className={`w-8 h-8 mb-3 ${active === t.key ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-heading font-semibold text-foreground mb-1">{t.label}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto bg-card rounded-xl shadow-card border border-border p-6 md:p-8"
        >
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1 text-center">
            {tabs.find((t: any) => t.key === active)?.label}
          </h3>
          <p className="text-sm text-muted-foreground mb-6 text-center">{formSubtitle}</p>

          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground">Заявка отправлена!</p>
              <p className="text-sm text-muted-foreground">Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Ваше имя *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input
                placeholder="+7 (___) ___-__-__"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
                title="Введите номер в формате +7 (XXX) XXX-XX-XX"
              />
              <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Textarea
                placeholder={active === "school" ? "Расскажите о вашей школе, количестве детей и пожеланиях к программе" : "Сообщение"}
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <div className="flex items-start space-x-2 py-1">
                <input
                  type="checkbox"
                  id="consent-participate"
                  required
                  className="mt-1 h-4 w-4 shrink-0 rounded-sm border-primary text-primary focus:ring-primary"
                />
                <label htmlFor="consent-participate" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                  Я даю согласие на <a href="/data-consent" target="_blank" className="text-primary hover:underline">обработку персональных данных</a>
                </label>
              </div>

              <Button type="submit" className="w-full bg-gradient-orange text-accent-foreground font-bold hover:opacity-90">
                {active === "volunteer" ? "Стать волонтёром" : "Записаться"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ParticipateSection;
