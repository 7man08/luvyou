import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';

interface QuestionPageProps {
  onYesClick: () => void;
}

export default function QuestionPage({ onYesClick }: QuestionPageProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false);
  const [hoverAttempts, setHoverAttempts] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = 150;
    const buttonHeight = 60;

    const maxX = viewportWidth - buttonWidth - 40;
    const maxY = viewportHeight - buttonHeight - 40;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
    setIsNoButtonMoving(true);
    setHoverAttempts(prev => prev + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-red-100">
      <div className="text-center px-4">
        <div className="mb-8 animate-fade-in">
          <Heart className="w-24 h-24 mx-auto text-red-500 mb-6 animate-pulse" fill="currentColor" />
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-rose-600 mb-4 animate-text-glow">
            Will you be my Valentine once again?
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-center relative">
          <button
            onClick={onYesClick}
            className="px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 hover:from-pink-600 hover:to-red-600 glow-button z-10"
          >
            Yes (nhebek &lt;33)
          </button>

          <button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
            style={
              isNoButtonMoving
                ? {
                    position: 'fixed',
                    left: `${noButtonPosition.x}px`,
                    top: `${noButtonPosition.y}px`,
                    transition: 'all 0.3s ease-out',
                  }
                : {}
            }
            className="px-8 py-4 text-xl font-semibold text-gray-700 bg-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            No (7ram 3lik 🙁)
          </button>
        </div>

        {hoverAttempts > 3 && (
          <p className="mt-8 text-2xl text-rose-600 font-semibold animate-bounce">
            Ma3andek win temchi 😌
          </p>
        )}
      </div>
    </div>
  );
}
