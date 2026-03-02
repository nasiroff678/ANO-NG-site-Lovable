import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Контакты</h2>
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
                  <p className="text-sm text-muted-foreground">452320, Республика Башкортостан, г. Дюртюли, ул. Ленина, д. 8, офис 202</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Телефон</p>
                  <p className="text-sm text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">info@novye-gorizonty.ru</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/7XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity mb-8"
            >
              <MessageCircle className="w-5 h-5" /> Написать в WhatsApp
            </a>

            <div className="rounded-xl overflow-hidden border border-border shadow-card h-[250px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=56.010833%2C55.490000&z=14&pt=56.010833%2C55.490000%2Cpm2rdm"
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
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6">Напишите нам</h3>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="font-semibold text-foreground">Сообщение отправлено!</p>
                <p className="text-sm text-muted-foreground">Мы ответим вам в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Ваше имя *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Телефон *" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
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
