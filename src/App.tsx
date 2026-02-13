import { useState } from 'react';
import QuestionPage from './components/QuestionPage';
import LovePage from './components/LovePage';
import FloatingHearts from './components/FloatingHearts';
import MusicToggle from './components/MusicToggle';
import Confetti from './components/Confetti';

function App() {
  const [showLovePage, setShowLovePage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleYesClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowLovePage(true);
      setShowConfetti(false);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingHearts />
      <MusicToggle />

      {showConfetti && <Confetti />}

      <div className={`transition-opacity duration-1000 ${showLovePage ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}>
        {!showLovePage && <QuestionPage onYesClick={handleYesClick} />}
      </div>

      <div className={`transition-opacity duration-1000 ${showLovePage ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
        {showLovePage && <LovePage />}
      </div>
    </div>
  );
}

export default App;
