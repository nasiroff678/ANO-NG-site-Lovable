import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { submitForm } from "@/lib/submitForm";

interface EventRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventTitle: string;
}

export function EventRegistrationModal({ isOpen, onClose, eventTitle }: EventRegistrationModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "+7", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSubmitted(false);
            setForm({ name: "", phone: "+7", email: "", message: "" });
        }
    }, [isOpen]);

    const formatPhone = (value: string) => {
        let digits = value.replace(/\D/g, '');
        if (digits.length === 0) return '+7';
        if (digits[0] !== '7') digits = '7' + digits;
        digits = digits.slice(0, 11);
        let formatted = '+7';
        if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
        if (digits.length >= 4) formatted += ') ';
        if (digits.length > 4) formatted += digits.slice(4, 7);
        if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
        if (digits.length > 9) formatted += '-' + digits.slice(9, 11);
        return formatted;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitForm({
                name: form.name,
                phone: form.phone,
                email: form.email,
                message: `Запись на мероприятие "${eventTitle}":\n\n${form.message}`,
                form_type: 'event_registration'
            });
        } catch {
            /* silent */
        } finally {
            setIsSubmitting(false);
            setSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-heading font-bold text-center">Запись на мероприятие</DialogTitle>
                    <DialogDescription className="text-center font-medium text-foreground">
                        {eventTitle}
                    </DialogDescription>
                </DialogHeader>

                {submitted ? (
                    <div className="text-center py-6">
                        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                        <p className="font-semibold text-foreground">Заявка отправлена!</p>
                        <p className="text-sm text-muted-foreground mt-2">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                        <Input
                            placeholder="Ваше имя *"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <Input
                            placeholder="+7 (___) ___-__-__"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                            pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
                            title="Введите номер в формате +7 (XXX) XXX-XX-XX"
                        />
                        <Input
                            placeholder="Email (необязательно)"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <Textarea
                            placeholder="Дополнительные пожелания или вопросы"
                            rows={3}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />

                        <div className="flex items-start space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="consent-event"
                                required
                                className="mt-1 h-4 w-4 shrink-0 rounded-sm border-primary text-primary focus:ring-primary"
                            />
                            <label htmlFor="consent-event" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                                Я даю согласие на <a href="/data-consent" target="_blank" className="text-primary hover:underline">обработку персональных данных</a>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-orange text-accent-foreground font-bold hover:opacity-90"
                        >
                            Конечно, записаться!
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
