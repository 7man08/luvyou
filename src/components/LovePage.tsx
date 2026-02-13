import ImageCarousel from './ImageCarousel';

export default function LovePage() {
  const images = [
    'https://drive.google.com/file/d/1q_M2R-pUAg5SWXcvnpustNI6-yHBmQ3m/view?usp=drive_link',
    'https://drive.google.com/file/d/1uAS7JAFGeL1vOJ-9OOESkJPcjV6J1o45/view?usp=drive_link',
    'https://drive.google.com/file/d/1BJShWAWPYidDZVa0mXwsX9vf9Munueug/view?usp=drive_link',
    'https://drive.google.com/file/d/1BQNud590_gl-_Jf6Y_6OseiByXn0lBd4/view?usp=drive_link',
    'https://drive.google.com/file/d/1Zt5Mi9ugovZJ-K_ygfP7neZFXAA8zOwv/view?usp=drive_link',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        

        <div className="text-center my-16 animate-typing">
          <div className="inline-block p-8 bg-white/40 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-pink-300 glow-box">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 leading-tight">
              Thankkk you for being in my life lallouchtiiii 💞
            </h1>
          </div>
        </div>
        <div className="animate-fade-in">
          <ImageCarousel images={images} />
        </div>

        <footer className="text-center py-8">
          <p className="text-xl text-rose-600 font-semibold">
            Made with love 💘
          </p>
        </footer>
      </div>
    </div>
  );
}
