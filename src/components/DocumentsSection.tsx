import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";

const defaultBankDetails = [
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

const defaultDocs = [
  { title: "Устав организации", description: "Основной учредительный документ", file_url: "", color: "primary" },
  { title: "Карта партнёра", description: "Реквизиты для перечислений", file_url: "", color: "accent" },
];

const DocumentsSection = () => {
  const [isBankDetailsOpen, setIsBankDetailsOpen] = useState(false);
  const { content, isVisible } = useContent('documents');

  if (isVisible === false) return null;

  const heading = content?.heading || "Документы и прозрачность";
  const documents = content?.documents || defaultDocs;
  const bankDetails = content?.bank_details || defaultBankDetails;
  const footerText = content?.footer_text || "Мы полностью открыты для Минюста, грантовых фондов и партнёров. Все документы предоставляются по запросу.";

  return (
    <section id="documents" className="py-20 md:py-28 bg-muted">
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

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {documents.map((doc: any, i: number) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border flex items-center gap-4"
            >
              <FileDown className={`w-10 h-10 text-${doc.color || 'primary'} flex-shrink-0`} />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground">{doc.title}</h3>
                <p className="text-sm text-muted-foreground">{doc.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className={`border-${doc.color || 'primary'} text-${doc.color || 'primary'} hover:bg-${doc.color || 'primary'} hover:text-${doc.color || 'primary'}-foreground`}
                onClick={() => doc.file_url && window.open(doc.file_url)}
              >
                Скачать PDF
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-xl shadow-card border border-border overflow-hidden"
        >
          <button
            onClick={() => setIsBankDetailsOpen(!isBankDetailsOpen)}
            className="w-full text-left p-6 bg-primary/5 hover:bg-primary/10 transition-colors border-b border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold text-foreground">Полные банковские реквизиты</h3>
            </div>
            <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isBankDetailsOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isBankDetailsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-2">
                  <div className="space-y-3">
                    {bankDetails.map((d: any) => (
                      <div key={d.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-2 border-b border-border last:border-0">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide min-w-[160px]">{d.label}</span>
                        <span className="text-sm text-foreground">{d.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground italic">{footerText}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentsSection;
