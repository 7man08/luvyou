import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  autoPlayDelay?: number;
}

export default function ImageCarousel({ images, autoPlayDelay = 4000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [images.length, autoPlayDelay]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const getTranslateValue = () => {
    const itemWidth = 100 / itemsToShow;
    const offset = currentIndex * itemWidth;
    return -offset;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden">
        <div className="flex gap-4">
          {duplicatedImages.map((image, index) => {
            const itemWidth = 100 / itemsToShow;
            const isCenter = (index - currentIndex) % images.length === 0;

            return (
              <div
                key={index}
                className={`flex-shrink-0 transition-all duration-500 ease-out rounded-3xl overflow-hidden shadow-lg cursor-pointer`}
                style={{
                  width: `calc(${itemWidth}% - 1rem)`,
                  transform: isCenter ? 'scale(1.08)' : 'scale(0.9)',
                  opacity: Math.abs((index - currentIndex) % images.length) > 1 ? 0.4 : 0.8,
                }}
              >
                <img
                  src={image}
                  alt={`Carousel item ${index}`}
                  className="w-full h-80 object-cover"
                />
              </div>
            );
          })}
        </div>

        <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
          <button
            onClick={goToPrevious}
            className="pointer-events-auto ml-4 bg-white/90 hover:bg-white text-rose-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="pointer-events-auto mr-4 bg-white/90 hover:bg-white text-rose-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-rose-500 w-8'
                : 'bg-rose-300 hover:bg-rose-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
