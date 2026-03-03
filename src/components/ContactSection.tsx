import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/hooks/useContent";
import { useSettings } from "@/hooks/useSettings";
import { submitForm } from "@/lib/submitForm";

const ContactSection = () => {
  const { content, isVisible } = useContent('contacts');
  const { settingsMap } = useSettings();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "+7", email: "", message: "" });

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

  const heading = content?.heading || "Контакты";
  const formTitle = content?.form_title || "Напишите нам";
  const successTitle = content?.success_title || "Сообщение отправлено!";
  const successText = content?.success_text || "Мы ответим вам в ближайшее время.";

  const address = settingsMap.address || "452320, Республика Башкортостан, г. Дюртюли, ул. Ленина, д. 8, офис 202";
  const phone = settingsMap.phone || "+7 (XXX) XXX-XX-XX";
  const email = settingsMap.email || "info@novye-gorizonty.ru";
  const maxLink = settingsMap.max_link || "https://max.ru";
  const mapEmbedUrl = settingsMap.map_embed_url || "https://yandex.ru/map-widget/v1/?ll=54.866214%2C55.487168&z=16&pt=54.866214%2C55.487168%2Cpm2rdm";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm({ name: form.name, phone: form.phone, email: form.email, message: form.message, form_type: 'contact' });
    } catch { /* silent */ }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="contacts" className="py-20 md:py-28 bg-background">
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

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Адрес</p>
                  <p className="text-sm text-muted-foreground">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Телефон</p>
                  <p className="text-sm text-muted-foreground">{phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>
            </div>

            <a
              href={maxLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0077FF] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0066DD] transition-colors mb-8 shadow-sm"
            >
              <svg viewBox="0 0 131 42" fill="none" className="h-6 w-auto fill-current">
                <path fill="currentColor" fillRule="evenodd" d="M21.47 41.88c-4.11 0-6.02-.6-9.34-3-2.1 2.7-8.75 4.81-9.04 1.2 0-2.71-.6-5-1.28-7.5C1 29.5.08 26.07.08 21.1.08 9.23 9.82.3 21.36.3c11.55 0 20.6 9.37 20.6 20.91a20.6 20.6 0 0 1-20.49 20.67Zm.17-31.32c-5.62-.29-10 3.6-10.97 9.7-.8 5.05.62 11.2 1.83 11.52.58.14 2.04-1.04 2.95-1.95a10.4 10.4 0 0 0 5.08 1.81 10.7 10.7 0 0 0 11.19-9.97 10.7 10.7 0 0 0-10.08-11.1Z" clipRule="evenodd" />
                <path fill="currentColor" d="M60.3 32.15h-4.44v-21h7.23l4.84 14.41h.65l5.05-14.41h7.07v21h-4.45v-15.6h-.64l-5.5 15.6H66.2l-5.25-15.6h-.65v15.6ZM94.59 32.55c-1.97 0-3.73-.46-5.3-1.37a9.99 9.99 0 0 1-3.67-3.88 12.15 12.15 0 0 1-1.29-5.65c0-2.1.43-3.98 1.3-5.62a9.63 9.63 0 0 1 3.67-3.88 10.04 10.04 0 0 1 5.29-1.4c1.75 0 3.3.37 4.64 1.12 1.35.73 2.45 1.62 3.31 2.67l.97-3.4H107v21h-3.47l-.97-3.39a11.45 11.45 0 0 1-3.32 2.7 9.62 9.62 0 0 1-4.64 1.1Zm1.13-4.16c1.97 0 3.55-.62 4.77-1.86a6.7 6.7 0 0 0 1.85-4.88c0-2-.62-3.61-1.85-4.85a6.3 6.3 0 0 0-4.77-1.9c-1.94 0-3.51.63-4.72 1.9a6.63 6.63 0 0 0-1.82 4.85c0 1.99.6 3.62 1.82 4.88a6.32 6.32 0 0 0 4.72 1.86ZM115.03 32.15h-5.25l6.66-10.75-5.9-10.25h5.26l3.91 7.06h.77l4.12-7.06h5.13l-5.9 9.97 6.67 11.03h-5.42l-4.48-7.96h-.77l-4.8 7.96Z" />
              </svg> Написать
            </a>

            <div className="rounded-xl overflow-hidden border border-border shadow-card h-[250px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                title="Яндекс Карта"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl shadow-card border border-border p-6 md:p-8"
          >
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6">{formTitle}</h3>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="font-semibold text-foreground">{successTitle}</p>
                <p className="text-sm text-muted-foreground">{successText}</p>
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
                <Textarea placeholder="Ваше сообщение *" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <Button type="submit" className="w-full bg-gradient-forest text-primary-foreground font-semibold hover:opacity-90">
                  Отправить сообщение
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
