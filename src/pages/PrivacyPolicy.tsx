import { Mountain } from "lucide-react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import ScrollToTop from "@/components/ScrollToTop";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col pt-24">
            <Header />

            <main className="flex-grow container max-w-4xl py-12">
                <div className="mb-8 flex items-center gap-3">
                    <Mountain className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl font-heading font-extrabold text-foreground">
                        Политика конфиденциальности
                    </h1>
                </div>

                <div className="prose prose-slate max-w-none text-foreground/80 space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-foreground">1. Общие положения</h2>
                        <p>
                            Настоящая политика конфиденциальности составлена в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению их безопасности.
                        </p>
                        <p>
                            <strong>Оператор:</strong> Автономная некоммерческая организация ЦЕНТР СОЦИАЛЬНОЙ ПОДДЕРЖКИ В ОБЛАСТИ ТУРИЗМА, ФИЗИЧЕСКОЙ КУЛЬТУРЫ И МАССОВОГО СПОРТА «НОВЫЕ ГОРИЗОНТЫ» (далее — АНО «НОВЫЕ ГОРИЗОНТЫ»).<br />
                            <strong>ИНН:</strong> 0260996986<br />
                            <strong>ОГРН:</strong> 1230200047230
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground">2. Перечень собираемых данных</h2>
                        <p>Оператор собирает и обрабатывает следующие персональные данные пользователей сайта:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Имя, фамилия;</li>
                            <li>Номер телефона;</li>
                            <li>Адрес электронной почты (Email);</li>
                            <li>Фото- и видеоматериалы пользователей (при их самостоятельном предоставлении);</li>
                            <li>Пользовательские данные (IP-адрес, файлы cookie, информация о браузере).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground">3. Цели обработки</h2>
                        <p>Цель обработки персональных данных Пользователя:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Обработка заявок с сайта на участие в походах, мероприятиях и партнерских программах;</li>
                            <li>Рассылка новостей, информации об акциях и значимых событиях организации;</li>
                            <li>Осуществление аналитики посещаемости и работы сайта (с использованием систем Яндекс.Метрика, Google Analytics и аналогичных).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground">4. Правовые основания обработки</h2>
                        <p>
                            Правовыми основаниями обработки персональных данных Оператором являются:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Уставные документы Оператора;</li>
                            <li>Договоры, заключаемые между Оператором и субъектом персональных данных;</li>
                            <li>Согласие Пользователя на обработку его персональных данных, выраженное путем проставления специальной отметки (галочки) в формах на сайте.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground">5. Права пользователя (как удалить данные)</h2>
                        <p>
                            Пользователь вправе в любой момент отозвать свое согласие на обработку персональных данных, направив соответствующее уведомление Оператору.
                        </p>
                        <p>
                            Для удаления персональных данных или отзыва согласия на их обработку Пользователь может направить электронное письмо на официальный email организации или обратиться по реквизитам, указанным в контактах на сайте. Данные будут удалены в сроки, установленные законодательством РФ.
                        </p>
                    </section>
                </div>
            </main>

            <FooterSection />
            <ScrollToTop />
        </div>
    );
};

export default PrivacyPolicy;
