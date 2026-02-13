
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  autoPlayDelay?: number;
}

export default function ImageCarousel({ images, autoPlayDelay = 3000 }: ImageCarouselProps) {
  // Triple the images to allow for smooth infinite scrolling with a buffer
  const extendedImages = [...images, ...images, ...images];
  const totalItems = extendedImages.length;
  
  // Start in the middle set
  const startParam = images.length;
  
  const [currentIndex, setCurrentIndex] = useState(startParam);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const itemsToShow = 3;
  // Calculate width for the track so all items fit side by side.
  // Each item is 1/3 of the container width.
  const trackWidthPercent = (totalItems * 100) / itemsToShow; 

  const next = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const prev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    const len = images.length;
    // Current Index Logic:
    // Middle set is [len, 2*len - 1]
    
    // If we moved into the 3rd set (Right buffer)
    if (currentIndex >= 2 * len) {
      // Jump back to the corresponding item in the middle set
      setCurrentIndex(currentIndex - len);
    } 
    // If we moved into the 1st set (Left buffer)
    else if (currentIndex < len) {
      // Jump forward to the corresponding item in the middle set
      setCurrentIndex(currentIndex + len);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [next, autoPlayDelay]);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, autoPlayDelay);
  };

  const stopAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const getTranslateX = () => {
    const itemWidthPercent = 100 / totalItems;
    // Shift so that currentIndex is centered.
    return -((currentIndex - 1) * itemWidthPercent);
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto py-8"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="relative overflow-hidden w-full"> 
        <div
          className="flex h-96 items-center"
          style={{
            width: `${trackWidthPercent}%`,
            transform: `translateX(${getTranslateX()}%)`,
            transitionDuration: isTransitioning ? '500ms' : '0ms',
            transitionProperty: 'transform',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedImages.map((src, index) => {
            const isActive = index === currentIndex;
            
            return (
              <div 
                key={index}
                className="relative px-4 h-full flex items-center justify-center transition-all duration-500 box-border"
                style={{
                    width: `${100 / totalItems}%`, 
                }}
                onClick={() => {
                  if (!isTransitioning && index !== currentIndex) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                  }
                }}
              >
                <div 
                  className={`
                    relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out w-full
                    ${isActive ? 'scale-110 z-10 opacity-100 ring-4 ring-rose-300' : 'scale-90 z-0 opacity-60 hover:opacity-80'}
                  `}
                  style={{
                    height: isActive ? '20rem' : '16rem',
                  }}
                >
                  <img
                    src={src}
                    alt={`Memory ${index}`}
                    className="w-full h-full object-cover transform transition-transform duration-700"
                    draggable={false}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent ${isActive ? 'opacity-40' : 'opacity-20'}`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 pointer-events-none z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="pointer-events-auto bg-white/90 hover:bg-white text-rose-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="pointer-events-auto bg-white/90 hover:bg-white text-rose-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-8">
        {images.map((_, idx) => {
           const realIndex = (currentIndex % images.length);
           return (
            <button
              key={idx}
              onClick={() => {
                const diff = idx - realIndex;
                if(diff !== 0 && !isTransitioning) {
                   setIsTransitioning(true);
                   setCurrentIndex(currentIndex + diff);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === realIndex
                  ? 'bg-rose-500 w-8'
                  : 'bg-rose-300/50 w-2 hover:bg-rose-400'
              }`}
            />
           );
        })}
      </div>
    </div>
  );
}
