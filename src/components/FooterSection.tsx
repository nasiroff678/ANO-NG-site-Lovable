import { Mountain } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { Link } from "react-router-dom";

const FooterSection = () => {
  const { content } = useContent('footer');

  const orgShortName = content?.org_short_name || "АНО «НОВЫЕ ГОРИЗОНТЫ»";
  const orgFullName = content?.org_full_name || "Автономная некоммерческая организация ЦЕНТР СОЦИАЛЬНОЙ ПОДДЕРЖКИ В ОБЛАСТИ ТУРИЗМА, ФИЗИЧЕСКОЙ КУЛЬТУРЫ И МАССОВОГО СПОРТА «НОВЫЕ ГОРИЗОНТЫ»";
  const requisitesHeading = content?.requisites_heading || "Реквизиты и контакты";
  const documentsHeading = content?.documents_heading || "Документы";
  const docLinks = content?.doc_links || [
    { label: "Устав организации", href: "#documents" },
    { label: "Карта партнёра", href: "#documents" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mountain className="w-6 h-6 text-primary" />
              <span className="font-heading font-bold">{orgShortName}</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-4">{orgFullName}</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">{requisitesHeading}</h4>
            <div className="space-y-1 text-sm opacity-80 font-medium">
              <p>ОГРН: 1230200047230</p>
              <p>ИНН: 0260996986</p>
              <p>КПП: 026001001</p>
              <p className="pt-2"><strong>Адрес:</strong> 452320, Республика Башкортостан, г. Дюртюли, ул. Ленина, д. 8, оф. 202</p>
              <p className="pt-2"><strong>Телефон:</strong> <a href="tel:+79270809567" className="hover:text-primary transition-colors">+7 (927)-080-9567</a></p>
              <p><strong>Email:</strong> <a href={`mailto:info@${encodeURIComponent('дюртюли-ано.рф')}`} className="hover:text-primary transition-colors">info@дюртюли-ано.рф</a></p>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">{documentsHeading}</h4>
            <div className="space-y-3 text-sm flex flex-col items-start font-medium opacity-90">
              {docLinks.map((link: any) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary hover:translate-x-1 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:translate-x-1 transition-all">
                Политика конфиденциальности
              </Link>
              <Link to="/data-consent" target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:translate-x-1 transition-all">
                Согласие на обработку персональных данных
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-50 relative z-10">
          <p>© {new Date().getFullYear()} {orgShortName}. Все права защищены.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Политика</Link>
            <Link to="/data-consent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Согласие</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

