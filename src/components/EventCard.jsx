import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Ticket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const { selectEvent } = useBooking();

  const handleBookNow = (e) => {
    e.stopPropagation();
    selectEvent(event);
    navigate(`/event/${event.id}`);
  };

  const handleQuickSeats = (e) => {
    e.stopPropagation();
    selectEvent(event);
    navigate('/seats');
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => {
        selectEvent(event);
        navigate(`/event/${event.id}`);
      }}
      className="group cursor-pointer bg-[#13141f] border border-white/10 hover:border-[#C8FF00] hover:shadow-[0_0_25px_rgba(200,255,0,0.3)] transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Poster Image Container — 100% Crisp, High Contrast, NO Blur */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border-b border-white/10">
          <img
            src={event.bannerUrl || event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 filter contrast-110"
            loading="lazy"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-2.5 py-0.5 bg-black/90 font-mono text-[10px] font-bold text-[#C8FF00] border border-[#C8FF00]/40 uppercase tracking-widest">
              {event.category}
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-black/90 text-[#C8FF00] border border-white/20 font-mono text-[10px] font-bold">
              <Star className="w-3 h-3 fill-[#C8FF00] text-[#C8FF00]" />
              <span>{event.rating}</span>
            </div>
          </div>

          {/* Trending Tag */}
          {event.isTrending && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-0.5 font-mono text-[9px] font-black bg-[#C8FF00] text-black uppercase tracking-wider shadow-[0_0_10px_#C8FF00]">
                HOT PRESALE
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Genre chips */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {event.genre.slice(0, 2).map((g) => (
              <span key={g} className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 border border-white/10 uppercase">
                {g}
              </span>
            ))}
            <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 border border-white/10 flex items-center gap-1 uppercase">
              <Clock className="w-3 h-3 text-[#C8FF00]" />
              {event.duration}
            </span>
          </div>

          <h3 className="text-base font-black font-display uppercase text-white group-hover:text-[#C8FF00] transition-colors line-clamp-1 tracking-tight">
            {event.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {event.subtitle || event.description}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-[#C8FF00] shrink-0" />
            <span className="truncate">{event.venue.name} • {event.venue.city}</span>
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 pt-0">
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold block">FROM</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black font-mono text-white">${event.pricing.standard.toFixed(2)}</span>
              <span className="text-[10px] font-mono text-slate-500">/SEAT</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickSeats}
              title="Fast book seats"
              className="p-2 bg-[#11121a] hover:bg-[#181a27] text-slate-300 hover:text-[#C8FF00] border border-white/15 hover:border-[#C8FF00] transition-colors"
            >
              <Ticket className="w-4 h-4" />
            </button>
            <button
              onClick={handleBookNow}
              className="flex items-center gap-1.5 px-4 py-2 font-mono text-xs font-black bg-[#C8FF00] hover:bg-[#b5e600] text-black shadow-[0_0_15px_rgba(200,255,0,0.3)] transition-all uppercase tracking-wider"
            >
              <span>BOOK</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
