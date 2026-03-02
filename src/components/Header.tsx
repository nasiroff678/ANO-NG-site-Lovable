import { useState } from "react";
import { Menu, X, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "О нас", href: "#about" },
  { label: "Деятельность", href: "#activities" },
  { label: "Проекты", href: "#projects" },
  { label: "Участвовать", href: "#participate" },
  { label: "Документы", href: "#documents" },
  { label: "Партнёры", href: "#partners" },
  { label: "Контакты", href: "#contacts" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-18">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("#hero")}>
          <Mountain className="w-7 h-7 text-primary" />
          <span className="font-heading font-bold text-sm md:text-base text-foreground leading-tight">
            АНО «НОВЫЕ<br className="md:hidden" /> ГОРИЗОНТЫ»
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            className="bg-gradient-orange text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
            onClick={() => scrollTo("#participate")}
          >
            Записаться на поход
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => scrollTo("#partners")}
          >
            Стать партнёром
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.335-3.202C4.624 10.857 4 8.756 4 8.316c0-.254.102-.492.593-.492h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.492.763-.492h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.187.305-.254.44 0 .78.186.254.796.78 1.203 1.253.746.864 1.322 1.592 1.475 2.1.17.508-.085.77-.576.77z"/></svg>
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="container py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-left py-2 text-foreground font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border">
              <Button className="bg-gradient-orange text-accent-foreground font-semibold" onClick={() => scrollTo("#participate")}>
                Записаться на поход
              </Button>
              <Button variant="outline" className="border-primary text-primary" onClick={() => scrollTo("#partners")}>
                Стать партнёром
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
