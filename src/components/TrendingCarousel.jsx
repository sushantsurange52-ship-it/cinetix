import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Clock, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SAMPLE_EVENTS } from '../data/events';
import { useBooking } from '../context/BookingContext';

export default function TrendingCarousel() {
  const trendingEvents = SAMPLE_EVENTS.filter((e) => e.isTrending);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { selectEvent } = useBooking();

  const current = trendingEvents[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingEvents.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingEvents.length) % trendingEvents.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [trendingEvents.length]);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
        <div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C8FF00]">
            // ACTIVE SPOTLIGHT
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white mt-1 uppercase">
            TRENDING PREMIERES & HEADLINERS
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="p-2.5 bg-[#11121a] hover:bg-[#181a27] border border-white/20 hover:border-[#C8FF00] text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="p-2.5 bg-[#11121a] hover:bg-[#181a27] border border-white/20 hover:border-[#C8FF00] text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Carousel Hero Card — Sharp Solid CAMP Frame */}
      <div className="relative bg-[#11121a] border border-[#C8FF00]/30 min-h-[440px] md:min-h-[480px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {/* Background Image — Crisp, High Contrast */}
            <img
              src={current.bannerUrl}
              alt={current.title}
              className="w-full h-full object-cover object-center filter contrast-115"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/85 to-transparent" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-between max-w-2xl">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 font-mono text-[10px] font-black bg-[#C8FF00] text-black uppercase tracking-widest shadow-[0_0_12px_rgba(200,255,0,0.4)]">
                    HOT PRESALE
                  </span>
                  <span className="px-2.5 py-0.5 font-mono text-[10px] font-bold bg-black border border-white/20 text-white uppercase">
                    {current.category}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 bg-black text-[#C8FF00] border border-white/20 font-mono text-[10px] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#C8FF00] text-[#C8FF00]" />
                    <span>{current.rating}</span>
                  </div>
                </div>

                <h3 className="text-3xl sm:text-5xl font-black font-display text-white leading-tight uppercase tracking-tight">
                  {current.title}
                </h3>
                <p className="mt-2 font-mono text-xs sm:text-sm text-[#C8FF00] uppercase font-bold tracking-wider">
                  {current.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed max-w-xl font-sans">
                  {current.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
                  <div className="text-slate-300 bg-black/80 border border-white/15 px-3 py-1.5 uppercase">
                    <span className="text-white font-bold">{current.venue.name}</span> • {current.venue.city}
                  </div>
                  <div className="text-slate-300 bg-black/80 border border-white/15 px-3 py-1.5 flex items-center gap-1.5 uppercase">
                    <Clock className="w-3.5 h-3.5 text-[#C8FF00]" />
                    <span>{current.duration}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    selectEvent(current);
                    navigate(`/event/${current.id}`);
                  }}
                  className="px-8 py-3.5 font-mono font-black text-xs bg-[#C8FF00] hover:bg-[#b5e600] text-black shadow-[0_0_20px_rgba(200,255,0,0.4)] flex items-center gap-2 uppercase tracking-wider transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span>RESERVE FROM ${current.pricing.standard.toFixed(2)}</span>
                </button>

                <button
                  onClick={() => {
                    selectEvent(current);
                    navigate('/seats');
                  }}
                  className="px-6 py-3.5 font-mono font-bold text-xs bg-[#11121a] hover:bg-[#181a27] text-white border border-white/20 hover:border-[#C8FF00] uppercase tracking-wider transition-colors"
                >
                  SELECT SEATS
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
          {trendingEvents.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 transition-all duration-200 ${
                idx === currentIndex ? 'w-8 bg-[#C8FF00]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
