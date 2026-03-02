import { Mountain } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-6 h-6" />
              <span className="font-heading font-bold">АНО «НОВЫЕ ГОРИЗОНТЫ»</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Автономная некоммерческая организация ЦЕНТР СОЦИАЛЬНОЙ ПОДДЕРЖКИ В ОБЛАСТИ ТУРИЗМА, 
              ФИЗИЧЕСКОЙ КУЛЬТУРЫ И МАССОВОГО СПОРТА «НОВЫЕ ГОРИЗОНТЫ»
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Реквизиты</h4>
            <div className="space-y-1 text-sm opacity-70">
              <p>ИНН: 0260996986 | КПП: 026001001</p>
              <p>ОГРН: 1230200047230</p>
              <p>Р/с: 40703810817190000000</p>
              <p>Банк: АО «АЛЬФА-БАНК»</p>
              <p>БИК: 044525593</p>
              <p>К/с: 30101810200000000593</p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Документы</h4>
            <div className="space-y-2 text-sm">
              <a href="#documents" className="block opacity-70 hover:opacity-100 transition-opacity">Устав организации</a>
              <a href="#documents" className="block opacity-70 hover:opacity-100 transition-opacity">Карта партнёра</a>
              <a href="#contacts" className="block opacity-70 hover:opacity-100 transition-opacity">Контакты</a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© {new Date().getFullYear()} АНО «НОВЫЕ ГОРИЗОНТЫ». Все права защищены.</p>
          <p>452320, РБ, г. Дюртюли, ул. Ленина, д. 8, оф. 202</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
