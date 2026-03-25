import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ImageGalleryModal = ({ images, isOpen, onClose, title }: ImageGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
        setCurrentIndex(0);
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen || !images || images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {title && (
            <div className="absolute top-6 left-6 z-50 text-white font-medium text-lg drop-shadow-md">
                {title}
            </div>
        )}

        <div 
          className="relative w-full max-w-5xl px-4 md:px-12 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-50 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-all"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
              </button>
          )}

          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-h-[85vh] max-w-full object-contain drop-shadow-2xl"
          />

          {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-50 p-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md transition-all"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
              </button>
          )}
        </div>

        {images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4 z-50">
              {images.map((_, idx) => (
                  <button
                      key={idx}
                      onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(idx);
                      }}
                      className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                          idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                      }`}
                  />
              ))}
            </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageGalleryModal;
