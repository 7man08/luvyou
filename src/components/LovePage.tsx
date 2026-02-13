import ImageCarousel from './ImageCarousel';

export default function LovePage() {
  const images = [
    'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3394310/pexels-photo-3394310.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024969/pexels-photo-1024969.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024970/pexels-photo-1024970.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="animate-fade-in">
          <ImageCarousel images={images} />
        </div>

        <div className="text-center my-16 animate-typing">
          <div className="inline-block p-8 bg-white/40 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-pink-300 glow-box">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 leading-tight">
              Thankkk you for being in my life lallouchtiiii 💞
            </h1>
          </div>
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
