import { Mountain, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Link } from "react-router-dom";

const DataConsent = () => {
    return (
        <div className="min-h-screen flex flex-col pt-24">
            <Header />

            <main className="flex-grow container max-w-4xl py-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" /> На главную
                </Link>
                <div className="mb-8 flex items-center gap-3">
                    <Mountain className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-heading font-extrabold text-foreground">
                        Согласие на обработку персональных данных
                    </h1>
                </div>

                <div className="prose prose-slate max-w-none text-foreground/80 space-y-6">
                    <p>
                        Присоединяясь к настоящему Согласию и оставляя свои данные на сайте,
                        путем заполнения полей форм (включая регистрацию, заявки на обратный звонок или подписку на рассылку),
                        Пользователь дает свое безоговорочное согласие на обработку своих персональных данных на следующих условиях:
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-foreground">1. Лицо, осуществляющее обработку (Оператор)</h2>
                        <p>
                            <strong>Оператор:</strong> Автономная некоммерческая организация ЦЕНТР СОЦИАЛЬНОЙ ПОДДЕРЖКИ В ОБЛАСТИ ТУРИЗМА, ФИЗИЧЕСКОЙ КУЛЬТУРЫ И МАССОВОГО СПОРТА «НОВЫЕ ГОРИЗОНТЫ» (АНО «НОВЫЕ ГОРИЗОНТЫ»).<br />
                            <strong>ИНН:</strong> 0260996986<br />
                            <strong>ОГРН:</strong> 1230200047230
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground">2. Перечень обрабатываемых данных</h2>
                        <p>Согласие дается на обработку следующих персональных данных, не являющихся специальными или биометрическими:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Имя, фамилия;</li>
                            <li>Номер мобильного телефона;</li>
                            <li>Адрес электронной почты (E-mail);</li>
                            <li>Обезличенные данные о посетителях, собираемые с помощью систем интернет-статистики (в том числе файлы cookie, IP-адрес).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground">3. Цели обработки</h2>
                        <p>Сбор и обработка указанных данных осуществляются в целях:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Обработки входящих запросов и заявок с предоставлением обратной связи;</li>
                            <li>Информирования Пользователя посредством отправки электронных писем и сообщений (о предстоящих походах, мероприятиях, акциях);</li>
                            <li>Улучшения качества работы сайта, проведения статистических и аналитических исследований.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground">4. Отзыв согласия</h2>
                        <p>
                            Согласие действует бессрочно с момента предоставления данных и может быть отозвано Вами в любой момент путем направления письменного заявления Оператору на электронный адрес, указанный в разделе контактов, с пометкой «Отзыв согласия на обработку персональных данных».
                        </p>
                    </section>
                </div>
            </main>

            <FooterSection />
            <ScrollToTop />
        </div>
    );
};

export default DataConsent;
