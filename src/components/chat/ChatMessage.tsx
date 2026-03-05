import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
    const isBot = role === "assistant";

    return (
        <div className={cn("flex w-full gap-3 py-2", isBot ? "justify-start" : "justify-end")}>
            {isBot && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary/10 text-primary">
                    <Bot className="h-4 w-4" />
                </div>
            )}
            <div
                className={cn(
                    "rounded-lg px-4 py-2 text-sm max-w-[80%]",
                    isBot ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"
                )}
            >
                {content}
            </div>
            {!isBot && (
                <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                </div>
            )}
        </div>
    );
}
