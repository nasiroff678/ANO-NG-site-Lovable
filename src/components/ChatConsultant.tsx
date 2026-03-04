import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitForm } from "@/lib/submitForm";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: ChatOption[];
}

interface ChatOption {
  label: string;
  value: string;
}

type FlowStep =
  | "idle"
  | "main_menu"
  | "faq_menu"
  | "register_name"
  | "register_phone"
  | "register_email"
  | "register_message"
  | "register_confirm";

const FAQ_DATA: Record<string, string> = {
  schedule: "Мы работаем ежедневно с 9:00 до 18:00. Мероприятия проводятся по расписанию, которое можно найти в разделе «Мероприятия» на сайте.",
  activities: "Мы организуем походы, спортивные мероприятия, кемпинг, образовательные программы и многое другое. Подробности в разделе «Деятельность».",
  join: "Чтобы присоединиться, вы можете оставить заявку через меня или через форму на сайте в разделе «Участвовать». Мы свяжемся с вами!",
  documents: "Для участия обычно нужен паспорт и медицинская справка. Полный список документов — в разделе «Документы» на сайте.",
  contacts: "Связаться с нами можно по телефону или через форму на сайте. Также вы можете написать мне прямо здесь!",
};

const MAIN_OPTIONS: ChatOption[] = [
  { label: "❓ Задать вопрос", value: "faq" },
  { label: "📝 Записаться", value: "register" },
];

const FAQ_OPTIONS: ChatOption[] = [
  { label: "🕐 График работы", value: "schedule" },
  { label: "🏕 Виды деятельности", value: "activities" },
  { label: "🤝 Как присоединиться", value: "join" },
  { label: "📄 Необходимые документы", value: "documents" },
  { label: "📞 Контакты", value: "contacts" },
  { label: "◀️ Назад", value: "back" },
];

const ChatConsultant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [flowStep, setFlowStep] = useState<FlowStep>("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (text: string, options?: ChatOption[]) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, sender: "bot", options },
    ]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, sender: "user" },
    ]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Здравствуйте! 👋 Я виртуальный консультант. Чем могу помочь?", MAIN_OPTIONS);
        setFlowStep("main_menu");
      }, 300);
    }
  };

  const handleOptionClick = (value: string) => {
    if (flowStep === "main_menu") {
      if (value === "faq") {
        addUserMessage("Задать вопрос");
        addBotMessage("Выберите тему вопроса:", FAQ_OPTIONS);
        setFlowStep("faq_menu");
      } else if (value === "register") {
        addUserMessage("Записаться");
        addBotMessage("Отлично! Давайте оформим запись. Как вас зовут?");
        setFlowStep("register_name");
      }
    } else if (flowStep === "faq_menu") {
      if (value === "back") {
        addUserMessage("Назад");
        addBotMessage("Чем ещё могу помочь?", MAIN_OPTIONS);
        setFlowStep("main_menu");
      } else {
        const label = FAQ_OPTIONS.find((o) => o.value === value)?.label || value;
        addUserMessage(label);
        addBotMessage(FAQ_DATA[value] || "К сожалению, информация недоступна.");
        setTimeout(() => {
          addBotMessage("Могу помочь ещё чем-нибудь?", MAIN_OPTIONS);
          setFlowStep("main_menu");
        }, 500);
      }
    }
  };

  const handleSubmitInput = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addUserMessage(text);

    switch (flowStep) {
      case "register_name":
        setFormData((d) => ({ ...d, name: text }));
        addBotMessage("Укажите ваш номер телефона:");
        setFlowStep("register_phone");
        break;
      case "register_phone":
        setFormData((d) => ({ ...d, phone: text }));
        addBotMessage("Укажите email (или напишите «пропустить»):");
        setFlowStep("register_email");
        break;
      case "register_email":
        setFormData((d) => ({ ...d, email: text.toLowerCase() === "пропустить" ? "" : text }));
        addBotMessage("Опишите, на что хотите записаться или ваш вопрос (или «пропустить»):");
        setFlowStep("register_message");
        break;
      case "register_message": {
        const finalData = { ...formData, message: text.toLowerCase() === "пропустить" ? "" : text };
        setFormData(finalData);
        addBotMessage(
          `Проверьте данные:\n📌 Имя: ${finalData.name}\n📞 Телефон: ${finalData.phone}${finalData.email ? `\n📧 Email: ${finalData.email}` : ""}${finalData.message ? `\n💬 Сообщение: ${finalData.message}` : ""}`,
          [
            { label: "✅ Подтвердить", value: "confirm" },
            { label: "❌ Отменить", value: "cancel" },
          ]
        );
        setFlowStep("register_confirm");
        break;
      }
      case "register_confirm":
        // handled by option click below
        break;
      default:
        addBotMessage("Выберите один из вариантов ниже:", MAIN_OPTIONS);
        setFlowStep("main_menu");
    }
  };

  // Handle confirm/cancel for registration
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.sender !== "user") return;

    if (flowStep === "register_confirm") {
      // This is handled via option clicks, not text input
    }
  }, [messages, flowStep]);

  const handleConfirmOption = async (value: string) => {
    if (value === "confirm") {
      addUserMessage("Подтвердить");
      try {
        await submitForm({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          message: formData.message || undefined,
          form_type: "ai_consultant",
        });
        addBotMessage("✅ Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
        toast({ title: "Заявка отправлена", description: "Мы свяжемся с вами!" });
      } catch {
        addBotMessage("❌ Произошла ошибка при отправке. Попробуйте позже или свяжитесь с нами по телефону.");
        toast({ title: "Ошибка", description: "Не удалось отправить заявку", variant: "destructive" });
      }
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => {
        addBotMessage("Чем ещё могу помочь?", MAIN_OPTIONS);
        setFlowStep("main_menu");
      }, 500);
    } else if (value === "cancel") {
      addUserMessage("Отменить");
      setFormData({ name: "", phone: "", email: "", message: "" });
      addBotMessage("Запись отменена. Чем ещё могу помочь?", MAIN_OPTIONS);
      setFlowStep("main_menu");
    }
  };

  const onOptionClick = (value: string) => {
    if (flowStep === "register_confirm") {
      handleConfirmOption(value);
    } else {
      handleOptionClick(value);
    }
  };

  const isInputStep = ["register_name", "register_phone", "register_email", "register_message"].includes(flowStep);

  const placeholders: Record<string, string> = {
    register_name: "Введите ваше имя...",
    register_phone: "+7 (___) ___-__-__",
    register_email: "email@example.com или «пропустить»",
    register_message: "Опишите запрос или «пропустить»",
  };

  return (
    <>
      {/* Chat toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleOpen}
              className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
              size="icon"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] flex flex-col rounded-2xl shadow-2xl border border-border bg-background overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold text-sm">Онлайн-консультант</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div
                    className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.sender === "user" && (
                      <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                  {/* Options */}
                  {msg.options && msg === messages[messages.length - 1] && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-9">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => onOptionClick(opt.value)}
                          className="px-3 py-1.5 text-xs rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {isInputStep && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitInput();
                }}
                className="flex items-center gap-2 px-4 py-3 border-t border-border"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholders[flowStep] || "Введите сообщение..."}
                  className="flex-1 text-sm"
                  autoFocus
                />
                <Button type="submit" size="icon" className="h-9 w-9 flex-shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatConsultant;
