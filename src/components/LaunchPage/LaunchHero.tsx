import React, { useState, useEffect } from 'react';
import { Bell, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import NotifyModal from './NotifyModal';

type CaptionButton = {
  label: string;
  action: () => void;
  style?: string;
};

type Slide = {
  type: 'comingSoon' | 'collection';
  src: string;
  title: string;
  subtitle?: string;
  captionButtons: CaptionButton[];
};

const LaunchHero: React.FC = () => {
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      type: 'comingSoon',
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Collection/TM%20-%20HD%20-%20FS%20-%20F.JPG",
      title: "COMING SOON",
      subtitle: "The Ultimate Three-Piece Collection",
      captionButtons: [
        {
          label: "NOTIFY ME",
          action: () => setShowNotifyModal(true),
          style: "bg-white text-black hover:bg-gray-100"
        },
        {
          label: "LEARN MORE",
          action: () => (window.location.href = "/learn-more"),
          style: "border-2 border-white text-white hover:bg-white hover:text-black"
        }
      ]
    },
    {
      type: 'collection',
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Collection/TM%20-%20HD%20-%20FS%20-%20M%20-%20Side_.JPG",
      title: "SHOP TUMI COLLECTION",
      subtitle: "Premium TUMI Apparel",
      captionButtons: [
        {
          label: "SHOP TUMI COLLECTION",
          action: () => (window.location.href = "/collection/tumi"),
          style: "bg-white text-black hover:bg-gray-100"
        }
      ]
    },
    {
      type: 'collection',
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/LV%20Collection/LV-Video-Cover.jpg",
      title: "SHOP LAVEIRA COLLECTION",
      subtitle: "Luxury LAVEIRA Line",
      captionButtons: [
        {
          label: "SHOP LAVEIRA COLLECTION",
          action: () => (window.location.href = "/collection/laveira"),
          style: "border-2 border-white text-white hover:bg-white hover:text-black"
        }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // change slide every 7 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
      <>
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center">
          {/* Background Slide */}
          <div className="absolute inset-0">
            {slides.map((s, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img src={s.src} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all"
              aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all"
              aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Content */}
          <div className="relative z-10 px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-6">{slide.title}</h1>
            {slide.subtitle && <p className="text-lg text-white/90 mb-8">{slide.subtitle}</p>}

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {slide.captionButtons.map((btn, idx) => (
                  <button
                      key={idx}
                      onClick={btn.action}
                      className={`px-8 py-4 rounded-lg font-semibold text-lg min-w-[200px] transition-all flex items-center justify-center gap-3 ${btn.style ?? ''}`}
                      aria-label={btn.label}
                  >
                    {btn.label}
                  </button>
              ))}
            </div>
          </div>
        </section>

        {/* Notify Modal only for Coming Soon */}
        {slide.type === 'comingSoon' && (
            <NotifyModal
                isOpen={showNotifyModal}
                onClose={() => setShowNotifyModal(false)}
            />
        )}
      </>
  );
};

export default LaunchHero;