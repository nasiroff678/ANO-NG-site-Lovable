import { motion } from "framer-motion";
import { FileDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const bankDetails = [
  { label: "Полное наименование", value: "Автономная некоммерческая организация ЦЕНТР СОЦИАЛЬНОЙ ПОДДЕРЖКИ В ОБЛАСТИ ТУРИЗМА, ФИЗИЧЕСКОЙ КУЛЬТУРЫ И МАССОВОГО СПОРТА «НОВЫЕ ГОРИЗОНТЫ»" },
  { label: "ИНН", value: "0260996986" },
  { label: "КПП", value: "026001001" },
  { label: "ОГРН", value: "1230200047230" },
  { label: "Расчётный счёт", value: "40703810817190000000" },
  { label: "Банк", value: "АО «АЛЬФА-БАНК»" },
  { label: "БИК", value: "044525593" },
  { label: "Корр. счёт", value: "30101810200000000593" },
  { label: "Юридический адрес", value: "452320, Республика Башкортостан, г. Дюртюли, ул. Ленина, д. 8, офис 202" },
];

const DocumentsSection = () => {
  return (
    <section id="documents" className="py-20 md:py-28 bg-muted">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Документы и прозрачность</h2>
          <div className="w-16 h-1 bg-gradient-forest mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-6 shadow-card border border-border flex items-center gap-4"
          >
            <FileDown className="w-10 h-10 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground">Устав организации</h3>
              <p className="text-sm text-muted-foreground">Основной учредительный документ</p>
            </div>
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Скачать PDF
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl p-6 shadow-card border border-border flex items-center gap-4"
          >
            <FileDown className="w-10 h-10 text-accent flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground">Карта партнёра</h3>
              <p className="text-sm text-muted-foreground">Реквизиты для перечислений</p>
            </div>
            <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Скачать PDF
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl shadow-card border border-border overflow-hidden"
        >
          <div className="p-6 bg-primary/5 border-b border-border flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">Полные банковские реквизиты</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {bankDetails.map((d) => (
                <div key={d.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-border last:border-0">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide min-w-[160px]">{d.label}</span>
                  <span className="text-sm text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground italic">
              Мы полностью открыты для Минюста, грантовых фондов и партнёров. Все документы предоставляются по запросу.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentsSection;
