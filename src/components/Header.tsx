import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { useSettings } from "@/hooks/useSettings";
import logoImg from "@/assets/logo.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useNavigation('header');
  const { settingsMap } = useSettings('social');

  const navItems = items.length > 0
    ? items.filter(i => i.is_visible).map(i => ({ label: i.label, href: i.href }))
    : [
      { label: "О нас", href: "#about" },
      { label: "Деятельность", href: "#activities" },
      { label: "Проекты", href: "#projects" },
      { label: "Прошедшие мероприятия", href: "#past-events" },
      { label: "Участвовать", href: "#participate" },
      { label: "Документы", href: "#documents" },
      { label: "Партнёры", href: "#partners" },
      { label: "Контакты", href: "#contacts" },
    ];

  const vkLink = settingsMap.vk_link || "https://vk.com";
  const maxLink = settingsMap.max_link || "https://max.ru";

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between gap-4 xl:gap-8 h-16 md:h-18">
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => scrollTo("#hero")}>
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange/40 to-sky/40 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <img src={logoImg} alt="АНО Новые Горизонты" className="relative w-10 h-10 object-contain drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-sm md:text-base text-foreground leading-tight whitespace-nowrap tracking-wide">
              АНО «НОВЫЕ ГОРИЗОНТЫ»
            </span>
            <span className="hidden sm:block text-[9px] md:text-[10px] text-muted-foreground font-semibold uppercase tracking-[0.2em] mt-0.5 bg-clip-text text-transparent bg-gradient-to-r from-forest to-sky">
              Открываем мир приключений
            </span>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-4 xl:gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
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
            <a href={vkLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.335-3.202C4.624 10.857 4 8.756 4 8.316c0-.254.102-.492.593-.492h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.492.763-.492h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.187.305-.254.44 0 .78.186.254.796.78 1.203 1.253.746.864 1.322 1.592 1.475 2.1.17.508-.085.77-.576.77z" /></svg>
            </a>
            <a href={maxLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors" title="MAX Messenger">
              <svg viewBox="0 0 131 42" fill="none" className="h-[22px] w-auto fill-current">
                <path fill="currentColor" fillRule="evenodd" d="M21.47 41.88c-4.11 0-6.02-.6-9.34-3-2.1 2.7-8.75 4.81-9.04 1.2 0-2.71-.6-5-1.28-7.5C1 29.5.08 26.07.08 21.1.08 9.23 9.82.3 21.36.3c11.55 0 20.6 9.37 20.6 20.91a20.6 20.6 0 0 1-20.49 20.67Zm.17-31.32c-5.62-.29-10 3.6-10.97 9.7-.8 5.05.62 11.2 1.83 11.52.58.14 2.04-1.04 2.95-1.95a10.4 10.4 0 0 0 5.08 1.81 10.7 10.7 0 0 0 11.19-9.97 10.7 10.7 0 0 0-10.08-11.1Z" clipRule="evenodd" />
                <path fill="currentColor" d="M60.3 32.15h-4.44v-21h7.23l4.84 14.41h.65l5.05-14.41h7.07v21h-4.45v-15.6h-.64l-5.5 15.6H66.2l-5.25-15.6h-.65v15.6ZM94.59 32.55c-1.97 0-3.73-.46-5.3-1.37a9.99 9.99 0 0 1-3.67-3.88 12.15 12.15 0 0 1-1.29-5.65c0-2.1.43-3.98 1.3-5.62a9.63 9.63 0 0 1 3.67-3.88 10.04 10.04 0 0 1 5.29-1.4c1.75 0 3.3.37 4.64 1.12 1.35.73 2.45 1.62 3.31 2.67l.97-3.4H107v21h-3.47l-.97-3.39a11.45 11.45 0 0 1-3.32 2.7 9.62 9.62 0 0 1-4.64 1.1Zm1.13-4.16c1.97 0 3.55-.62 4.77-1.86a6.7 6.7 0 0 0 1.85-4.88c0-2-.62-3.61-1.85-4.85a6.3 6.3 0 0 0-4.77-1.9c-1.94 0-3.51.63-4.72 1.9a6.63 6.63 0 0 0-1.82 4.85c0 1.99.6 3.62 1.82 4.88a6.32 6.32 0 0 0 4.72 1.86ZM115.03 32.15h-5.25l6.66-10.75-5.9-10.25h5.26l3.91 7.06h.77l4.12-7.06h5.13l-5.9 9.97 6.67 11.03h-5.42l-4.48-7.96h-.77l-4.8 7.96Z" />
              </svg>
            </a>
          </div>
        </div>

        <button
          className="xl:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <>
          {/* Backdrop overlay for mobile */}
          <div
            className="xl:hidden fixed inset-0 top-[64px] md:top-[72px] bg-background/20 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setMobileOpen(false)}
          />

          <div className="xl:hidden absolute top-full inset-x-4 mt-2 md:inset-x-auto md:right-4 lg:right-6 xl:right-8 md:w-72 bg-card/85 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-50 overflow-hidden text-popover-foreground animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
            {/* Subtle aesthetic gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange/5 pointer-events-none" />

            <nav className="relative px-3 py-4 flex flex-col gap-1">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-4 py-3 text-foreground font-semibold text-lg hover:bg-foreground/5 hover:text-primary transition-all duration-300 rounded-xl group relative overflow-hidden flex items-center"
                  style={{ animationDelay: `${index * 50}ms`, WebkitAnimationFillMode: 'both' }}
                >
                  <span className="relative z-10 transform group-hover:translate-x-2 transition-transform duration-300">
                    {item.label}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
              <div className="flex md:hidden flex-col gap-3 pt-4 mt-2 border-t border-border/50 px-2">
                <Button className="bg-gradient-orange text-accent-foreground font-bold text-md h-12 w-full shadow-lg shadow-orange/20" onClick={() => scrollTo("#participate")}>
                  Записаться на поход
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary font-bold text-md h-12 w-full hover:bg-primary/5" onClick={() => scrollTo("#partners")}>
                  Стать партнёром
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
