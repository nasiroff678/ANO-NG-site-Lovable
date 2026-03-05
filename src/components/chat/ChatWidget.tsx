import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, ChatMessageProps } from "./ChatMessage";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SUGGESTED_REPLIES = [
    "Чем вы занимаетесь?",
    "Какие есть походы?",
    "Как записать ребенка?",
    "Где вы находитесь?",
    "Кто ваши инструкторы?"
];

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessageProps[]>([
        { role: "assistant", content: "Здравствуйте! Я виртуальный консультант АНО «Новые горизонты». Чем могу помочь?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current && isOpen) {
            const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isOpen]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage: ChatMessageProps = { role: "user", content: text.trim() };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        if (text === input) setInput("");
        setIsLoading(true);

        try {
            // In a real app we would call supabase functions invoke:
            const { data, error } = await supabase.functions.invoke('gigachat', {
                body: { messages: newMessages.map(m => ({ role: m.role, content: m.content })) }
            });

            if (data?.error) {
                throw new Error(data.error);
            }

            if (data && data.choices && data.choices[0]?.message) {
                setMessages([...newMessages, { role: "assistant", content: data.choices[0].message.content }]);
            } else {
                throw new Error("Invalid response format from GigaChat");
            }
        } catch (error: any) {
            console.error("Chat error:", error);
            const errorMsg = error.message || (typeof error === 'string' ? error : JSON.stringify(error));
            toast.error(`Ошибка отправки: ${errorMsg}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        sendMessage(input);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg transition-all duration-300 z-[100]",
                    isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100 hover:scale-110"
                )}
            >
                <MessageCircle className="h-6 w-6" />
            </Button>

            <div
                className={cn(
                    "fixed bottom-4 right-4 z-[100] flex flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl transition-all duration-300 sm:bottom-6 sm:right-6 origin-bottom-right",
                    isOpen
                        ? "h-[500px] max-h-[calc(100vh-2rem)] w-[350px] max-w-[calc(100vw-2rem)] scale-100 opacity-100"
                        : "pointer-events-none h-[500px] w-[350px] scale-95 opacity-0"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b bg-primary px-4 py-3 text-primary-foreground">
                    <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        <h3 className="font-semibold text-sm">Онлайн-консультант</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground rounded-full"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <div className="flex flex-col gap-3 pb-4">
                        {messages.map((m, i) => (
                            <ChatMessage key={i} role={m.role} content={m.content} />
                        ))}
                        {isLoading && (
                            <div className="flex w-full justify-start gap-3 py-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-primary/10 text-primary">
                                    <Bot className="h-4 w-4 animate-pulse" />
                                </div>
                                <div className="flex items-center rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="ml-2">Печатает...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Quick Replies */}
                <div className="w-full overflow-x-auto px-3 pb-3 pt-2 border-t bg-card [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <div className="flex gap-2 w-max">
                        {SUGGESTED_REPLIES.map((reply, i) => (
                            <button
                                key={i}
                                onClick={() => sendMessage(reply)}
                                disabled={isLoading}
                                className="shrink-0 whitespace-nowrap text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                            >
                                {reply}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="p-3 bg-card pt-0">
                    <div className="flex items-center gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Напишите сообщение..."
                            className="flex-1 rounded-full bg-muted/50 focus-visible:ring-1"
                            disabled={isLoading}
                        />
                        <Button
                            size="icon"
                            className="rounded-full shrink-0"
                            disabled={!input.trim() || isLoading}
                            onClick={handleSend}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
