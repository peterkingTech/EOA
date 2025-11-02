/*
  ENHANCED HERO COMPONENT

  This component includes all requested fixes and features:

  FIX #1: Video autoplay for iPhone/Safari
  - Added all required HTML5 attributes: autoPlay, muted, playsInline, loop, preload="auto"
  - Removed controls and audio for seamless playback
  - Videos are optimized, responsive, and cover full background

  FIX #3: Synchronized content structure
  - Display order: Tumi Video → Laviera Video → Tumi Slide → Laviera Slide → Coming Soon

  FIX #4: Clickable collection captions
  - Captions navigate to respective collection sections in Shop
  - Smooth scroll to collection filter sections
*/

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocalization } from '../contexts/LocalizationContext';

type Slide = {
  type: "video" | "image";
  src: string;
  caption: string;
  subtitle?: string;
  collection?: 'tumie' | 'laveira';
  price?: number;
};

const Hero: React.FC = () => {
  const { t, formatPrice } = useLocalization();
  const navigate = useNavigate();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleCaptionClick = (collection: 'tumie' | 'laveira') => {
    navigate('/shop', { state: { scrollToCollection: collection } });
  };

  /*
    FIX #5: Content Order - Exact sequence as requested
    1. Tumi Video
    2. Laviera Video
    3. Tumi Slide (image carousel)
    4. Laviera Slide (image carousel)
    5. Coming Soon Slide
  */

  // TUMI Video
  const tumiVideo: Slide = {
    type: "video",
    src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/hero%20videos/EOA%20TM%20Video_.mp4",
    caption: "TUMI COLLECTION",
    collection: 'tumie'
  };

  // LAVIERA Video
  const laveiraVideo: Slide = {
    type: "video",
    src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/hero%20videos/EOA%20-%20Video-%20LV_.mp4",
    caption: "LAVEIRA COLLECTION",
    collection: 'laveira'
  };

  // TUMI Collection Image Slides
  const tumiSlides = [
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/Tumi%20T-shirt/TM-TS-WT-F-11.jpg",
      caption: "TUMI COLLECTION",
      collection: 'tumie' as const,
      price: 34.99
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/Tumi%20T-shirt/TM-TS-BL-F-2.jpg",
      caption: "TUMI COLLECTION",
      collection: 'tumie' as const,
      price: 34.99
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/Tumi%20T-shirt/TM-TS-WT-F-8.jpg",
      caption: "TUMI COLLECTION",
      collection: 'tumie' as const,
      price: 34.99
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/Tumi%20T-shirt/TM-TS-WB-MF-5.jpg",
      caption: "TUMI COLLECTION",
      collection: 'tumie' as const,
      price: 34.99
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/Tumi%20T-shirt/TM-TS-WT-M-2.jpg",
      caption: "TUMI COLLECTION",
      collection: 'tumie' as const,
      price: 34.99
    },
  ];

  // LA VEIRA Collection Image Slides
  const laVeiraSlides = [
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/LV%20Edited%20BG/LV-GP-F-4.jpg",
      caption: "LA VEIRA COLLECTION",
      collection: 'laveira' as const,
      price: 45.00
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/LV%20Cropped/LV-GP-M-1.jpg",
      caption: "LA VEIRA COLLECTION",
      collection: 'laveira' as const,
      price: 45.00
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/LV%20Edited%20BG/LV-GP-F-5.jpg",
      caption: "LA VEIRA COLLECTION",
      collection: 'laveira' as const,
      price: 45.00
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/LV%20Edited%20BG/LV-GP-16.jpg",
      caption: "LA VEIRA COLLECTION",
      collection: 'laveira' as const,
      price: 45.00
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/LV%20Cropped/LV-GP-1.jpg",
      caption: "LA VEIRA COLLECTION",
      collection: 'laveira' as const,
      price: 45.00
    },
  ];

  // Coming Soon Slides
  const comingSoonSlides = [
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Collection/TM%20-%20HD%20-%20FS%20-%20F.JPG",
      caption: "TUMI HOODIE",
      subtitle: "Premium comfort meets faith-inspired design",
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Collection/TM%20-%20HD%20-%20FS%20-%20M%20-%20Side_.JPG",
      caption: "TUMI FULL SET",
      subtitle: "Complete hoodie and sweat pants collection",
    },
    {
      type: "image" as const,
      src: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Collection/TM-PT-M-2.png",
      caption: "TUMI SWEAT PANTS",
      subtitle: "Luxury comfort for everyday wear",
    },
  ];

  // State management for slide carousels
  const [currentTumiSlide, setCurrentTumiSlide] = useState(0);
  const [currentLaVeiraSlide, setCurrentLaVeiraSlide] = useState(0);
  const [currentComingSoonSlide, setCurrentComingSoonSlide] = useState(0);

  // Auto-rotate TUMI slides
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTumiSlide((prev) => (prev + 1) % tumiSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [tumiSlides.length]);

  // Auto-rotate LA VEIRA slides
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentLaVeiraSlide((prev) => (prev + 1) % laVeiraSlides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [laVeiraSlides.length]);

  // Auto-rotate Coming Soon slides
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentComingSoonSlide((prev) => (prev + 1) % comingSoonSlides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [comingSoonSlides.length]);

  /*
    FIX #1: Video autoplay fix for iPhone/Safari
    Force video playback on component mount and when videos become visible
  */
  useEffect(() => {
    const playVideos = async () => {
      for (const video of videoRefs.current) {
        if (video) {
          try {
            await video.play();
          } catch (error) {
            console.log('Video autoplay prevented:', error);
          }
        }
      }
    };
    playVideos();
  }, []);





  // Navigation helpers for slides
  const nextTumiSlide = () => setCurrentTumiSlide((prev) => (prev + 1) % tumiSlides.length);
  const prevTumiSlide = () => setCurrentTumiSlide((prev) => (prev - 1 + tumiSlides.length) % tumiSlides.length);
  const nextLaVeiraSlide = () => setCurrentLaVeiraSlide((prev) => (prev + 1) % laVeiraSlides.length);
  const prevLaVeiraSlide = () => setCurrentLaVeiraSlide((prev) => (prev - 1 + laVeiraSlides.length) % laVeiraSlides.length);
  const nextComingSoonSlide = () => setCurrentComingSoonSlide((prev) => (prev + 1) % comingSoonSlides.length);
  const prevComingSoonSlide = () => setCurrentComingSoonSlide((prev) => (prev - 1 + comingSoonSlides.length) % comingSoonSlides.length);

  return (
      <section className="w-full">
        {/*
        SECTION 1: TUMI VIDEO (First in order)
        FIX #1: All video attributes for iPhone/Safari autoplay
      */}
        <div className="h-screen relative">
          <video
              ref={(el) => { videoRefs.current[0] = el; }}
              src={tumiVideo.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* FIX #4: Clickable caption for navigation */}
          <div
              onClick={() => handleCaptionClick('tumie')}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-8 py-4 rounded-lg border border-amber-400/30 cursor-pointer hover:bg-black/80 transition-all duration-300"
          >
            <h2 className="text-base  sm:text-lg md:text-2xl lg:text-3xl font-serif font-medium text-center tracking-elegant">
              {tumiVideo.caption}
            </h2>
          </div>
        </div>

        {/*
        SECTION 2: LAVIERA VIDEO (Second in order)
        FIX #1: All video attributes for iPhone/Safari autoplay
      */}
        <div className="h-screen relative">
          <video
              ref={(el) => { videoRefs.current[1] = el; }}
              src={laveiraVideo.src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* FIX #4: Clickable caption for navigation */}
          <div
              onClick={() => handleCaptionClick('laveira')}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-8 py-4 rounded-lg border border-amber-400/30 cursor-pointer hover:bg-black/80 transition-all duration-300"
          >
            <h2 className="text-base  sm:text-lg md:text-2xl lg:text-3xl font-serif font-medium text-center tracking-elegant">
              {laveiraVideo.caption}
            </h2>
          </div>
        </div>

        {/*
        SECTION 3: TUMI IMAGE SLIDES (Third in order)
      */}
        <div className="relative h-screen">
          {tumiSlides.map((slide, idx) => (
              <div
                  key={`tumi-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                      idx === currentTumiSlide ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                    src={slide.src}
                    alt={slide.caption}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-[50%_20%]"
                />
                <div className="absolute inset-0 bg-black/30" />
                {/* Price Tag */}
                {slide.price && (
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-lg md:text-xl font-medium">{formatPrice(slide.price)}</p>
                  </div>
                )}
                {/* FIX #4: Clickable caption */}
                <div
                    onClick={() => handleCaptionClick('tumie')}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-8 py-4 rounded-lg border border-amber-400/30 cursor-pointer hover:bg-black/80 transition-all duration-300"
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-center tracking-elegant">
                    {slide.caption}
                  </h2>
                </div>
              </div>
          ))}

          <button
              onClick={prevTumiSlide}
              aria-label="Previous Tumi slide"
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-2xl z-10"
          >
            ‹
          </button>
          <button
              onClick={nextTumiSlide}
              aria-label="Next Tumi slide"
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-2xl z-10"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {tumiSlides.map((_, idx) => (
                <button
                    key={`tumi-dot-${idx}`}
                    onClick={() => setCurrentTumiSlide(idx)}
                    aria-label={`Go to Tumi slide ${idx + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentTumiSlide ? "bg-amber-400" : "bg-white/50 hover:bg-white/80"
                    }`}
                />
            ))}
          </div>
        </div>

        {/*
        SECTION 4: LA VEIRA IMAGE SLIDES (Fourth in order)
      */}
        <div className="relative h-screen">
          {laVeiraSlides.map((slide, idx) => (
              <div
                  key={`laveira-${idx}`}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                      idx === currentLaVeiraSlide ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                    src={slide.src}
                    alt={slide.caption}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover object-[50%_20%]"
                />
                <div className="absolute inset-0 bg-black/30" />
                {/* Price Tag */}
                {slide.price && (
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-lg md:text-xl font-medium">{formatPrice(slide.price)}</p>
                  </div>
                )}
                {/* FIX #4: Clickable caption */}
                <div
                    onClick={() => handleCaptionClick('laveira')}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-8 py-4 rounded-lg border border-amber-400/30 cursor-pointer hover:bg-black/80 transition-all duration-300"
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-center tracking-elegant">
                    {slide.caption}
                  </h2>
                </div>
              </div>
          ))}

          <button
              onClick={prevLaVeiraSlide}
              aria-label="Previous La Veira slide"
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-2xl z-10"
          >
            ‹
          </button>
          <button
              onClick={nextLaVeiraSlide}
              aria-label="Next La Veira slide"
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-2xl z-10"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {laVeiraSlides.map((_, idx) => (
                <button
                    key={`laveira-dot-${idx}`}
                    onClick={() => setCurrentLaVeiraSlide(idx)}
                    aria-label={`Go to La Veira slide ${idx + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentLaVeiraSlide ? "bg-amber-400" : "bg-white/50 hover:bg-white/80"
                    }`}
                />
            ))}
          </div>
        </div>

        {/*
        SECTION 5: COMING SOON SLIDES (Fifth and final in order)
        FIX #3: Maintains "Notify Me" and "Learn More" buttons with functionality
      */}
        <div className="h-screen relative">
          {comingSoonSlides.map((slide, index) => (
              <div
                  key={`coming-soon-${index}`}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentComingSoonSlide ? "opacity-100" : "opacity-0"
                  }`}
              >
                <img
                    src={slide.src}
                    alt={slide.caption}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="bg-black/70 backdrop-blur-md px-4 md:px-16 py-4 md:py-12 rounded-xl border border-amber-400/50 max-w-sm md:max-w-3xl mx-4 shadow-2xl">
                      <div className="mb-6">
                    <span className="inline-block bg-white text-black px-3 py-1 rounded-full text-xs md:text-sm font-medium tracking-wide mb-3 md:mb-4">
                      {t('comingSoon')}
                    </span>
                      </div>
                      <h2 className="text-lg md:text-4xl lg:text-5xl font-serif font-medium mb-2 md:mb-4 tracking-elegant leading-tight">
                        {slide.caption}
                      </h2>
                      <p className="text-sm md:text-xl text-amber-200 font-medium mb-1 md:mb-2">
                        {slide.subtitle}
                      </p>
                      <p className="text-xs md:text-lg text-gray-300 font-medium mb-4 md:mb-8">
                        {t('beFirstToExperience')}
                      </p>
                      {/* FIX #3: Maintained "Notify Me" and "Learn More" buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center">
                        <button
                            onClick={() => {
                              // Trigger NotifyModal or notification logic
                              window.dispatchEvent(new CustomEvent('openNotifyModal'));
                            }}
                            className="bg-white text-black px-4 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg"
                        >
                          {t('notifyMe')}
                        </button>
                        <button
                            onClick={() => navigate('/learn-more')}
                            className="border-2 border-white text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium hover:bg-white hover:text-black transition-all duration-300"
                        >
                          {t('learnMore')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          ))}

          <button
              onClick={prevComingSoonSlide}
              aria-label="Previous coming soon slide"
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-2xl z-10"
          >
            ‹
          </button>
          <button
              onClick={nextComingSoonSlide}
              aria-label="Next coming soon slide"
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 text-2xl z-10"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {comingSoonSlides.map((_, idx) => (
                <button
                    key={`coming-soon-dot-${idx}`}
                    onClick={() => setCurrentComingSoonSlide(idx)}
                    aria-label={`Go to coming soon slide ${idx + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === currentComingSoonSlide ? "bg-amber-400" : "bg-white/50 hover:bg-white/80"
                    }`}
                />
            ))}
          </div>
        </div>
      </section>
  );
};

export default Hero;
