import { Heart } from 'lucide-react';

export default function Confetti() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1,
    rotation: Math.random() * 360,
    size: 15 + Math.random() * 25,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          <Heart
            className="text-red-500 animate-spin-slow"
            fill="currentColor"
            style={{ width: piece.size, height: piece.size }}
          />
        </div>
      ))}
    </div>
  );
}
