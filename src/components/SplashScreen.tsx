import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Disable scrolling while splash screen is active
        document.body.style.overflow = 'hidden';

        // Auto-hide after 2.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);

            // Allow the exit animation to finish before calling onComplete
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                onComplete();
            }, 500); // 500ms exit animation duration
        }, 2500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto';
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background sm:bg-card/95 backdrop-blur-3xl overflow-hidden"
                >
                    {/* Aesthetic background gradients */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-background/50 pointer-events-none" />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                            delay: 0.1
                        }}
                        className="flex flex-col items-center gap-6 md:gap-8 z-10"
                    >
                        {/* Logo */}
                        <motion.div
                            className="relative"
                            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange/40 to-sky/40 rounded-full blur-2xl opacity-70 animate-pulse" />
                            <img
                                src={logoImg}
                                alt="АНО «Новые Горизонты»"
                                className="w-32 h-32 md:w-48 md:h-48 object-contain relative drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex flex-col items-center text-center gap-3">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                                className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-foreground tracking-tight"
                            >
                                АНО «НОВЫЕ ГОРИЗОНТЫ»
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "100%" }}
                                transition={{ duration: 0.8, delay: 1, ease: "easeInOut" }}
                                className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-1 md:my-2 w-full max-w-sm"
                            />

                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                                className="text-sm md:text-lg lg:text-xl text-primary font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]"
                            >
                                Открываем мир приключений
                            </motion.h2>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
