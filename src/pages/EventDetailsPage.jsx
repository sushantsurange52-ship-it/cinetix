import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SAMPLE_EVENTS } from '../data/events';
import { useBooking } from '../context/BookingContext';
import { 
  Star, Clock, Calendar, MapPin, Film, Volume2, 
  ChevronLeft, Share2, Ticket, Check, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentEvent, 
    selectEvent, 
    selectedDate, 
    setSelectedDate, 
    selectedShowtime, 
    setSelectedShowtime 
  } = useBooking();

  const event = SAMPLE_EVENTS.find((e) => e.id === id) || currentEvent || SAMPLE_EVENTS[0];

  const [activeTab, setActiveTab] = useState('details');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleProceedToSeats = () => {
    selectEvent(event);
    navigate('/seats');
  };

  const tabs = [
    { id: 'details', label: 'DETAILS & SYNOPSIS' },
    { id: 'venue', label: 'VENUE & ACOUSTICS' },
    { id: 'reviews', label: `REVIEWS (${event.reviews?.length || 0})` },
  ];

  return (
    <div className="min-h-screen pb-32 bg-[#0a0a0f]">
      {/* Hero Banner with Vignette Overlay — Crisp & High Contrast */}
      <div className="relative w-full h-[55vh] min-h-[380px] max-h-[550px] overflow-hidden bg-black">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="w-full h-full object-cover object-center filter contrast-120"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-[#0a0a0f]/50" />

        {/* Top Floating Navigation */}
        <div className="absolute top-24 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between z-20">
          <Link
            to="/events"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0f] hover:bg-[#11121a] text-white border border-white/20 text-xs font-mono font-bold uppercase transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>ALL EVENTS</span>
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0f] hover:bg-[#11121a] text-white border border-white/20 text-xs font-mono font-bold uppercase transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#C8FF00]" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'COPIED!' : 'SHARE'}</span>
          </button>
        </div>

        {/* Banner Content Details */}
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-0.5 text-xs font-mono font-black bg-[#C8FF00] text-black uppercase tracking-widest shadow-[0_0_12px_rgba(200,255,0,0.4)]">
                  {event.category}
                </span>
                <span className="px-2.5 py-0.5 font-mono text-xs font-bold bg-black text-slate-300 border border-white/20 uppercase">
                  {event.ageRating}
                </span>
                <div className="flex items-center gap-1 px-2.5 py-0.5 bg-black text-[#C8FF00] border border-white/20 font-mono text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#C8FF00] text-[#C8FF00]" />
                  <span>{event.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({event.votes})</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase leading-tight">
                {event.title}
              </h1>
              <p className="mt-2 font-mono text-xs sm:text-sm text-[#C8FF00] uppercase font-bold tracking-wider">
                {event.subtitle}
              </p>

              {/* Metadata chips */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 bg-[#11121a] border border-white/15 px-2.5 py-1 uppercase">
                  <Clock className="w-3.5 h-3.5 text-[#C8FF00]" />
                  {event.duration}
                </span>
                <span className="flex items-center gap-1.5 bg-[#11121a] border border-white/15 px-2.5 py-1 uppercase">
                  <Film className="w-3.5 h-3.5 text-[#C8FF00]" />
                  {event.genre.join(', ')}
                </span>
                <span className="flex items-center gap-1.5 bg-[#11121a] border border-white/15 px-2.5 py-1 uppercase">
                  <Volume2 className="w-3.5 h-3.5 text-[#C8FF00]" />
                  {event.language}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Dates, Showtimes, and Tabs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Showtime Selection Box — Solid CAMP Panel */}
            <div className="bg-[#11121a] p-6 border border-white/15">
              <h3 className="text-base font-black font-display text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Calendar className="w-4 h-4 text-[#C8FF00]" />
                <span>1. SELECT DATE & SHOWTIME</span>
              </h3>

              {/* Date Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {event.dates.map((dateStr) => {
                  const isSelected = selectedDate === dateStr;
                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all border ${
                        isSelected
                          ? 'bg-[#C8FF00] text-black border-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.3)]'
                          : 'bg-[#0a0a0f] text-slate-300 hover:text-white border-white/15 hover:border-[#C8FF00]'
                      }`}
                    >
                      {dateStr}
                    </button>
                  );
                })}
              </div>

              {/* Showtime Chips */}
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-3">
                AVAILABLE TIMES FOR {selectedDate.toUpperCase()}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.showtimes.map((st) => {
                  const isSelected = selectedShowtime?.id === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setSelectedShowtime(st)}
                      className={`p-3.5 border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#141622] border-[#C8FF00] text-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.2)]'
                          : 'bg-[#0a0a0f] border-white/10 hover:border-white/25 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="text-base font-black font-mono text-white flex items-center gap-2">
                          <span>{st.time}</span>
                          {st.priceMultiplier > 1 && (
                            <span className="text-[9px] font-mono font-black text-black bg-[#C8FF00] px-1.5 py-0.2 uppercase">
                              PRIME SLOT
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono text-slate-400 mt-0.5">{st.format}</div>
                      </div>
                      <div className={`w-5 h-5 border flex items-center justify-center ${
                        isSelected ? 'border-[#C8FF00] bg-[#C8FF00] text-black' : 'border-white/20'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Information Tabs — Solid CAMP Frame */}
            <div className="bg-[#11121a] border border-white/15 overflow-hidden">
              <div className="flex border-b border-white/15 bg-[#0e0f17]">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex-1 py-3.5 font-mono text-xs font-bold transition-colors text-center uppercase tracking-wider ${
                        isActive ? 'text-[#C8FF00] bg-[#11121a]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8FF00] shadow-[0_0_10px_#C8FF00]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8FF00] mb-2">SYNOPSIS</h4>
                        <p className="text-sm text-slate-300 leading-relaxed font-sans">{event.synopsis}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                        <div>
                          <span className="text-slate-500 font-bold block uppercase tracking-wider mb-1">DIRECTOR / PRODUCTION</span>
                          <span className="text-white font-bold text-sm uppercase">{event.director}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-bold block uppercase tracking-wider mb-1">KEY CAST & ARTISTS</span>
                          <span className="text-white font-bold text-sm uppercase">{event.cast.join(', ')}</span>
                        </div>
                      </div>

                      <div className="bg-[#0a0a0f] p-4 border border-white/10 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-[#C8FF00] shrink-0" />
                        <p className="text-xs font-mono text-slate-300 uppercase">
                          EQUIPPED WITH 4K DUAL-LASER IMAX OPTICS RENDERING 1.43:1 EXPANDED ASPECT RATIO.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'venue' && (
                    <motion.div
                      key="venue"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="text-base font-black font-display text-white flex items-center gap-2 uppercase">
                          <MapPin className="w-4 h-4 text-[#C8FF00]" />
                          <span>{event.venue.name}</span>
                        </h4>
                        <p className="text-xs font-mono text-slate-400 mt-1 uppercase">{event.venue.address}, {event.venue.city}</p>
                        <p className="text-xs font-mono text-[#C8FF00] font-bold mt-0.5 uppercase">{event.venue.hall}</p>
                      </div>

                      <div className="relative w-full h-44 bg-black border border-white/15 flex items-center justify-center">
                        <div 
                          className="absolute inset-0 opacity-15"
                          style={{
                            backgroundImage: `radial-gradient(#C8FF00 1px, transparent 1px)`,
                            backgroundSize: '16px 16px',
                          }}
                        />
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-10 h-10 bg-[#C8FF00] text-black flex items-center justify-center shadow-[0_0_15px_#C8FF00]">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-mono font-bold text-white mt-2 uppercase">{event.venue.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{event.venue.coordinates}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-2">
                        <div className="p-3 bg-[#0a0a0f] border border-white/10">
                          <span className="font-bold text-[#C8FF00] block mb-1 uppercase">ACOUSTIC ENGINEERING</span>
                          <p className="text-slate-300 uppercase">{event.venue.audio}</p>
                        </div>
                        <div className="p-3 bg-[#0a0a0f] border border-white/10">
                          <span className="font-bold text-[#C8FF00] block mb-1 uppercase">PARKING & TRANSIT</span>
                          <p className="text-slate-300 uppercase">{event.venue.parking}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-white">{event.rating}</span>
                          <div>
                            <div className="flex items-center text-[#C8FF00]">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-[#C8FF00] text-[#C8FF00]" />
                              ))}
                            </div>
                            <span className="text-[10px] text-slate-400 uppercase">{event.votes} VERIFIED PASS REVIEWS</span>
                          </div>
                        </div>

                        <button
                          onClick={() => alert('Only verified attendees with an active admission code can submit public reviews.')}
                          className="text-xs font-bold px-3 py-1.5 bg-[#0a0a0f] hover:bg-[#181a27] text-[#C8FF00] border border-[#C8FF00]/40 uppercase"
                        >
                          SUBMIT REVIEW
                        </button>
                      </div>

                      {event.reviews?.map((r) => (
                        <div key={r.id} className="p-4 bg-[#0a0a0f] border border-white/10 flex gap-3">
                          <img
                            src={r.avatar}
                            alt={r.author}
                            className="w-10 h-10 object-cover border border-white/20 shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between font-mono">
                              <span className="text-xs font-bold text-white uppercase">{r.author}</span>
                              <span className="text-[10px] text-slate-500 uppercase">{r.date}</span>
                            </div>
                            <div className="flex items-center text-[#C8FF00] mt-0.5 mb-1.5">
                              {[...Array(r.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-[#C8FF00] text-[#C8FF00]" />
                              ))}
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">{r.comment}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Tiers & Summary Card */}
          <div className="space-y-6">
            <div className="bg-[#11121a] p-6 border border-white/15 sticky top-28">
              <h3 className="text-base font-black font-display text-white mb-4 uppercase tracking-wider">
                TIER PRICING INDEX
              </h3>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 bg-[#0a0a0f] border border-white/15 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block uppercase">STANDARD TIER</span>
                    <span className="text-[10px] text-slate-400 uppercase">ROWS A - C // FRONT STAGE</span>
                  </div>
                  <span className="text-sm font-black text-white">${event.pricing.standard.toFixed(2)}</span>
                </div>

                <div className="p-3.5 bg-[#141622] border border-white/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block uppercase">PRIME VIEW TIER</span>
                    <span className="text-[10px] text-slate-400 uppercase">ROWS D - F // ACOUSTIC CENTER</span>
                  </div>
                  <span className="text-sm font-black text-white">${event.pricing.premium.toFixed(2)}</span>
                </div>

                <div className="p-3.5 bg-[#181a27] border border-[#C8FF00]/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#C8FF00] block uppercase">VIP RECLINER SUITE</span>
                    <span className="text-[10px] text-slate-400 uppercase">ROWS G - H // LUXURY RECLINER</span>
                  </div>
                  <span className="text-sm font-black text-[#C8FF00]">${event.pricing.vip.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C8FF00] shrink-0" />
                  <span className="uppercase">HARDWARE SEAT RESERVATION</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C8FF00] shrink-0" />
                  <span className="uppercase">FREE CANCELLATION UP TO 2H BEFORE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C8FF00] shrink-0" />
                  <span className="uppercase">INSTANT SMARTPASS WALLET SYNC</span>
                </div>
              </div>

              <button
                onClick={handleProceedToSeats}
                className="mt-6 w-full py-4 font-mono font-black text-xs bg-[#C8FF00] hover:bg-[#b5e600] text-black shadow-[0_0_20px_rgba(200,255,0,0.4)] flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
              >
                <Ticket className="w-4 h-4" />
                <span>SELECT YOUR SEATS</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar — Solid Dark, ZERO Blur */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0f] border-t border-[#C8FF00]/30 py-3.5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={event.posterUrl}
              alt={event.title}
              className="w-10 h-10 object-cover border border-white/15 hidden sm:block"
            />
            <div>
              <div className="text-xs font-mono text-[#C8FF00] font-bold uppercase">
                {selectedDate} • {selectedShowtime?.time || '14:00'} ({selectedShowtime?.format || 'IMAX'})
              </div>
              <h4 className="text-sm font-black font-display text-white truncate max-w-[200px] sm:max-w-md uppercase">
                {event.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block font-mono">
              <span className="text-[9px] text-slate-500 uppercase font-bold block">STARTING FROM</span>
              <div className="text-base font-black text-white">${event.pricing.standard.toFixed(2)}</div>
            </div>

            <button
              onClick={handleProceedToSeats}
              className="px-6 py-2.5 font-mono font-black text-xs bg-[#C8FF00] hover:bg-[#b5e600] text-black shadow-[0_0_15px_rgba(200,255,0,0.4)] flex items-center gap-2 uppercase tracking-wider transition-all shrink-0"
            >
              <span>CHOOSE SEATS</span>
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
