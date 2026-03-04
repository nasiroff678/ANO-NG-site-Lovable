import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already made a choice
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            // Small delay so it feels natural on initial page load
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (consent === "accepted") {
            enableAnalytics();
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "accepted");
        enableAnalytics();
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "declined");
        setIsVisible(false);
    };

    const enableAnalytics = () => {
        // Here logic is implemented to inject Yandex.Metrica/Google Analytics scripts
        console.log("Analytics enabled via Cookies consent.");
        // Example: window.ym && window.ym(XXXXXXX, "init", { ... });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-6 md:pb-8 flex justify-center pointer-events-none"
                >
                    <div className="bg-card border border-border/50 shadow-2xl rounded-2xl p-5 md:p-6 max-w-4xl w-full flex flex-col md:flex-row items-center gap-4 md:gap-8 pointer-events-auto backdrop-blur-xl relative overflow-hidden">
                        {/* Aesthetic background gradients */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange/10 rounded-full blur-[60px] pointer-events-none mix-blend-screen" />

                        <div className="flex-1 relative z-10 text-center md:text-left">
                            <p className="text-sm md:text-base text-card-foreground">
                                На сайте осуществляется обработка пользовательских данных с использованием Cookie в соответствии с{" "}
                                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm">
                                    Политикой конфиденциальности.
                                </Link>
                            </p>
                        </div>

                        <div className="flex flex-row md:flex-row items-center gap-3 w-full md:w-auto mt-2 md:mt-0 relative z-10 shrink-0">
                            <Button
                                variant="outline"
                                onClick={handleDecline}
                                className="flex-1 md:flex-none hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                            >
                                Отказать
                            </Button>
                            <Button
                                onClick={handleAccept}
                                className="flex-1 md:flex-none bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                            >
                                Согласен
                            </Button>
                        </div>

                        <button
                            onClick={handleDecline}
                            className="absolute top-2 right-2 p-2 text-muted-foreground hover:text-foreground transition-colors md:hidden focus:outline-none"
                            aria-label="Закрыть уведомление"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieBanner;
