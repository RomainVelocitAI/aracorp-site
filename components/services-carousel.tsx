"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface ServicesCarouselProps {
  items: ServiceItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  visibleItems?: number;
  className?: string;
}

export function ServicesCarousel({
  items,
  autoplay = true,
  autoplayInterval = 3000,
  visibleItems = 4,
  className = ""
}: ServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (autoplay && !isPaused) {
      intervalRef.current = setInterval(nextSlide, autoplayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, autoplayInterval, isPaused, currentIndex]);

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % items.length;
      visible.push({ ...items[index], originalIndex: index });
    }
    return visible;
  };

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-lg hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-lg hover:scale-110 transition-transform"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Slideshow Container */}
      <div className="overflow-hidden px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {getVisibleItems().map((item, index) => (
              <motion.div
                key={`${item.originalIndex}-${index}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group cursor-pointer"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-700">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    En savoir +
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-8 bg-orange-500" 
                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}