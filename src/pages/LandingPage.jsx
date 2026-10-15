import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SAMPLE_EVENTS, CATEGORIES, CITIES } from '../data/events';
import { 
  ArrowRight, Search, MapPin, Calendar, Film, Music, Drama, 
  Ticket, Star, Zap, Shield, Radio, Volume2, Cpu, Activity, 
  Flame, ChevronRight, X 
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Animated Numbers Component using requestAnimationFrame & useInView
function AnimatedCounter({ from = 0, to, duration = 1.8, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let startTime;
    let frameId;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(from + (to - from) * ease));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };
    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Framer Motion Animation Variants
const headlineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 30 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 140,
    },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [activeCategory, setActiveCategory] = useState('All');

  const [showcaseSearch, setShowcaseSearch] = useState('');

  const headlineWords = ["FUTURE", "OF", "LIVE", "ENTERTAINMENT."];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append('q', searchTerm.trim());
    if (selectedCity !== 'All Cities') params.append('city', selectedCity);
    if (activeCategory !== 'All') params.append('category', activeCategory);
    navigate(`/events?${params.toString()}`);
  };

  const filteredEvents = SAMPLE_EVENTS.filter((e) => {
    if (activeCategory !== 'All' && e.category !== activeCategory) {
      return false;
    }
    if (showcaseSearch.trim()) {
      const q = showcaseSearch.toLowerCase().trim();
      const matchesTitle = e.title?.toLowerCase().includes(q);
      const matchesGenre = e.genre?.some((g) => g.toLowerCase().includes(q));
      const matchesCast = e.cast?.some((c) => c.toLowerCase().includes(q));
      const matchesDirector = e.director?.toLowerCase().includes(q);
      const matchesVenue = e.venue?.name?.toLowerCase().includes(q) || e.venue?.city?.toLowerCase().includes(q);
      const matchesDesc = e.description?.toLowerCase().includes(q) || e.subtitle?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesGenre && !matchesCast && !matchesDirector && !matchesVenue && !matchesDesc) {
        return false;
      }
    }
    return true;
  });

  const featureCards = [
    {
      index: '01',
      tag: 'ACOUSTIC CALIBRATION',
      title: 'DOLBY ATMOS 12-CHANNEL',
      desc: 'Object-based sound projection calibrated down to the millimeter. Hear every whisper and cosmic explosion with zero distortion.',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
    },
    {
      index: '02',
      tag: 'PROJECTION TECH',
      title: 'IMAX DUAL-LASER 4K',
      desc: 'High dynamic range laser optics rendering 1.43:1 aspect ratio with ultra-contrast black levels and 120 FPS high frame rates.',
      img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop',
    },
    {
      index: '03',
      tag: 'ZERO-LATENCY GATE',
      title: 'DYNAMIC SMARTPASS',
      desc: 'Encrypted rolling QR technology linked directly to Apple & Google Wallet. Anti-screenshot verification with 0.1s turnstile entry.',
      img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-[#C8FF00] selection:text-black overflow-x-hidden relative">
      {/* Subtle Grain / Noise Overlay (NO Blur anywhere) */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ============================================================ */}
      {/* HERO SECTION — Phenomenon Labs "CAMP" Aesthetic               */}
      {/* ============================================================ */}
      <section className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bold Typography & Actions (7 Cols) */}
          <div className="lg:col-span-7 z-10">
            {/* Technical Subheader Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11121a] border border-[#C8FF00]/40 mb-6">
              <span className="w-2 h-2 bg-[#C8FF00] shadow-[0_0_10px_#C8FF00]" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#C8FF00] uppercase">
                SYSTEM STATUS: 100% VERIFIED PROTOCOL
              </span>
            </div>

            {/* Headline: Staggered Word Reveal Animation */}
            <motion.h1
              variants={headlineVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black font-display tracking-tighter uppercase text-white leading-[0.88] flex flex-wrap gap-x-4 gap-y-1"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden py-1">
                  <motion.span
                    variants={wordVariants}
                    className={`inline-block ${
                      word === "ENTERTAINMENT." 
                        ? "text-[#C8FF00]" 
                        : "text-white"
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Sharp Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-sm sm:text-base md:text-lg text-slate-400 font-medium max-w-xl leading-relaxed border-l-2 border-[#C8FF00] pl-4"
            >
              Ultra-high contrast cinema booking. Direct IMAX 70mm and arena concert reservation with 0.02s millisecond seat locking and encrypted digital wallet credentials.
            </motion.p>

            {/* CTAs Row: Sharp rectangular solid accent button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => navigate('/events')}
                className="group px-8 py-4 bg-[#C8FF00] hover:bg-[#b5e600] text-black font-black text-sm tracking-wider uppercase flex items-center gap-3 transition-all duration-200 hover:scale-[1.02] shadow-[0_0_25px_rgba(200,255,0,0.45)] hover:shadow-[0_0_40px_rgba(200,255,0,0.75)]"
              >
                <span>RESERVE SEATS</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/seats')}
                className="px-6 py-4 bg-[#11121a] hover:bg-[#181a27] text-white font-mono font-bold text-xs tracking-wider uppercase border border-white/20 hover:border-[#C8FF00] transition-colors flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-[#C8FF00]" />
                <span>INTERACTIVE SEAT MAP</span>
              </button>
            </motion.div>

            {/* Quick Search Bar: Hard-edged, High Contrast */}
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onSubmit={handleSearchSubmit}
              className="mt-10 p-2 bg-[#11121a] border border-[#C8FF00]/35 flex flex-col sm:flex-row items-stretch gap-2 max-w-2xl"
            >
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#0a0a0f] border border-white/15">
                <Search className="w-4 h-4 text-[#C8FF00] shrink-0" />
                <input
                  type="text"
                  placeholder="SEARCH BLOCKBUSTER / ARTIST..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-slate-500 uppercase tracking-wider font-mono focus:outline-none w-full"
                />
              </div>

              <div className="w-full sm:w-44 flex items-center gap-2 px-3 py-2 bg-[#0a0a0f] border border-white/15">
                <MapPin className="w-4 h-4 text-[#C8FF00] shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs text-white uppercase font-mono tracking-wider focus:outline-none w-full cursor-pointer"
                >
                  <option value="All Cities" className="bg-[#11121a] text-white">ALL CITIES</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c} className="bg-[#11121a] text-white">{c.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#C8FF00] hover:bg-[#b5e600] text-black font-black text-xs font-mono uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>FIND</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </motion.form>
          </div>

          {/* Right Column: Sharp High-Contrast Hero Graphic + Floating Idle Badges (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-md aspect-[4/5] bg-[#11121a] border border-[#C8FF00]/40 shadow-[0_0_35px_rgba(200,255,0,0.25)] p-2">
              {/* Corner Accent Bevel Crosshairs */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C8FF00]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C8FF00]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C8FF00]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C8FF00]" />

              {/* High Contrast Foreground Image */}
              <div className="w-full h-full relative overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop"
                  alt="Futuristic Cinematic Persona"
                  className="w-full h-full object-cover object-center filter contrast-125 brightness-105"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(200, 255, 0, 0.25)) contrast(1.2)'
                  }}
                />
                <div className="absolute inset-0 border border-white/10 pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[10px] font-bold text-[#C8FF00] bg-black/90 px-2 py-1 border border-[#C8FF00]/40 uppercase tracking-widest">
                  CAM_01 // 70MM IMAX
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] font-bold text-white bg-black/90 px-2 py-1 border border-white/20 tracking-wider">
                  RAW_OUTPUT [HDR+]
                </div>
              </div>

              {/* Floating UI Badge 1: Top Right Floating Idle */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 z-20 bg-[#11121a] border border-[#C8FF00] p-3 shadow-[0_0_20px_rgba(200,255,0,0.35)] min-w-[150px]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#C8FF00] rounded-full animate-ping" />
                  <span className="text-[10px] font-mono font-black text-[#C8FF00] tracking-wider uppercase">0.02s LOCK</span>
                </div>
                <div className="text-xs font-black text-white mt-1">SEAT RESERVATION</div>
                <div className="text-[9px] font-mono text-slate-400 mt-0.5">ZERO CONFLICT PROTOCOL</div>
              </motion.div>

              {/* Floating UI Badge 2: Bottom Left Floating Idle */}
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 -left-6 z-20 bg-[#11121a] border border-white/20 p-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] min-w-[170px]"
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-[#C8FF00]" />
                  <span className="text-[10px] font-mono font-bold text-slate-300 tracking-wider uppercase">VERIFIED ENTRY</span>
                </div>
                <div className="text-sm font-black text-white mt-0.5">10K+ TICKETS ISSUED</div>
                <div className="text-[9px] font-mono text-[#C8FF00] mt-0.5">99.9% ATTENDEE SCORE</div>
              </motion.div>

              {/* Floating UI Badge 3: Center Left Micro Chip */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-1/2 -left-8 -translate-y-1/2 z-20 bg-[#0a0a0f] border border-[#C8FF00]/40 px-2.5 py-1.5 hidden sm:flex items-center gap-2 shadow-[0_0_15px_rgba(200,255,0,0.25)]"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#C8FF00]" />
                <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">DOLBY 12-CH</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ANGULAR SECTION DIVIDER (Clip-Path Diagonal Cut, Accent Line) */}
      {/* ============================================================ */}
      <div className="relative w-full py-4 my-6 overflow-hidden">
        <div 
          className="w-full h-10 bg-[#11121a] border-y border-[#C8FF00]/40 flex items-center justify-between px-4 sm:px-8 relative"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
          }}
        >
          <div className="flex items-center gap-6 font-mono text-[10px] sm:text-xs font-bold text-[#C8FF00] uppercase tracking-widest overflow-hidden whitespace-nowrap">
            <span>[ SYSTEM // V2.4 ]</span>
            <span>•</span>
            <span>NEXT-GEN SEAT LOCKING</span>
            <span>•</span>
            <span>IMAX 70MM EXPANDED</span>
            <span>•</span>
            <span className="hidden md:inline">ENCRYPTED WALLET PASS</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">ZERO CONFLICT TRANSACTIONS</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] font-bold text-white">
            <span className="w-2 h-2 bg-[#C8FF00] shadow-[0_0_8px_#C8FF00]" />
            <span>LIVE NETWORK</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* STATS SECTION — Animated Count-Up on Scroll Into View        */}
      {/* ============================================================ */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 bg-[#11121a] border border-[#C8FF00]/25 relative group hover:border-[#C8FF00] transition-colors">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C8FF00] mb-1">
              [ STAT_01 ]
            </div>
            <div className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              <AnimatedCounter to={450} suffix="K+" />
            </div>
            <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
              TICKETS ISSUED GLOBALLY
            </div>
          </div>

          <div className="p-6 bg-[#11121a] border border-[#C8FF00]/25 relative group hover:border-[#C8FF00] transition-colors">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C8FF00] mb-1">
              [ STAT_02 ]
            </div>
            <div className="text-3xl sm:text-5xl font-black font-display text-[#C8FF00] tracking-tight">
              <AnimatedCounter to={100} suffix="%" />
            </div>
            <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
              REAL-TIME SEAT LOCK ACCURACY
            </div>
          </div>

          <div className="p-6 bg-[#11121a] border border-[#C8FF00]/25 relative group hover:border-[#C8FF00] transition-colors">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C8FF00] mb-1">
              [ STAT_03 ]
            </div>
            <div className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              <AnimatedCounter to={12} suffix="CH" />
            </div>
            <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
              SPATIAL DOLBY ATMOS
            </div>
          </div>

          <div className="p-6 bg-[#11121a] border border-[#C8FF00]/25 relative group hover:border-[#C8FF00] transition-colors">
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C8FF00] mb-1">
              [ STAT_04 ]
            </div>
            <div className="text-3xl sm:text-5xl font-black font-display text-[#C8FF00] tracking-tight">
              0.02<span className="text-xl sm:text-2xl font-bold ml-0.5">S</span>
            </div>
            <div className="text-xs font-mono text-slate-400 mt-2 uppercase tracking-wider">
              AVERAGE LATENCY RESPONSE
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURE CARDS GRID — Hard-edged, Sharp visuals, Fade+Slide   */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8FF00] flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>CORE INFRASTRUCTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display uppercase text-white tracking-tight mt-1">
              BUILT FOR SUPREME FIDELITY
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-sm uppercase">
            No blurry compromises. High precision staging calibrated with world-class theater engineers.
          </p>
        </div>

        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featureCards.map((card) => (
            <motion.div
              key={card.index}
              variants={cardVariants}
              className="bg-[#11121a] border border-[#C8FF00]/25 hover:border-[#C8FF00] transition-all duration-300 flex flex-col group shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(200,255,0,0.25)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black border-b border-white/10">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                />
                <div className="absolute top-3 left-3 bg-black/90 px-2.5 py-1 border border-[#C8FF00]/40 font-mono text-[10px] font-bold text-[#C8FF00] tracking-widest uppercase">
                  {card.index} // {card.tag}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black font-display uppercase text-white group-hover:text-[#C8FF00] transition-colors tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed font-sans">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 font-bold uppercase">STANDARD // CALIBRATED</span>
                  <span className="text-[#C8FF00] font-black">99.8% VERIFIED</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* CURATED EVENT SHOWCASE — Hard-Edged Technical Grid           */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="movies-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#C8FF00] flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              <span>STAGE SELECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display uppercase text-white tracking-tight mt-1">
              ACTIVE BOX OFFICE
            </h2>
          </div>

          <div className="flex flex-wrap gap-1 bg-[#11121a] p-1 border border-white/15">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#C8FF00] text-black shadow-[0_0_15px_rgba(200,255,0,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Search Bar for Movies Section */}
        <div className="mb-8 p-3 sm:p-4 bg-[#11121a] border border-[#C8FF00]/30 shadow-[0_0_25px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 flex items-center bg-[#0a0a0f] border border-white/15 focus-within:border-[#C8FF00] transition-colors">
            <div className="pl-3.5 pr-2 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#C8FF00]" />
            </div>
            <input
              type="text"
              id="movies-search-bar"
              value={showcaseSearch}
              onChange={(e) => setShowcaseSearch(e.target.value)}
              placeholder="SEARCH MOVIES & SHOWS (E.G. DUNE, SCI-FI, NOLAN, IMAX)..."
              className="w-full py-2.5 pr-9 bg-transparent text-xs font-mono text-white placeholder-slate-500 uppercase tracking-wider focus:outline-none"
            />
            {showcaseSearch && (
              <button
                type="button"
                onClick={() => setShowcaseSearch('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-white transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 font-mono text-xs shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#0a0a0f] border border-white/10">
              <span className="w-2 h-2 rounded-full bg-[#C8FF00] animate-pulse" />
              <span className="text-slate-400 font-bold">FOUND:</span>
              <span className="text-[#C8FF00] font-black">{filteredEvents.length}</span>
              <span className="text-slate-500">TITLES</span>
            </div>

            {activeCategory !== 'Movies' && (
              <button
                type="button"
                onClick={() => setActiveCategory('Movies')}
                className="px-3 py-2 bg-[#0a0a0f] hover:bg-[#181a27] border border-white/15 hover:border-[#C8FF00] text-slate-300 hover:text-[#C8FF00] font-mono text-xs uppercase font-bold transition-colors flex items-center gap-1.5"
              >
                <Film className="w-3.5 h-3.5 text-[#C8FF00]" />
                <span>MOVIES ONLY</span>
              </button>
            )}

            {showcaseSearch && (
              <button
                type="button"
                onClick={() => setShowcaseSearch('')}
                className="px-3 py-2 bg-[#C8FF00]/10 hover:bg-[#C8FF00]/20 border border-[#C8FF00]/40 text-[#C8FF00] font-mono text-xs uppercase font-bold transition-colors"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Movies & Events Grid or Empty State */}
        {filteredEvents.length === 0 ? (
          <div className="bg-[#11121a] border border-white/15 p-12 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-[#0a0a0f] border border-[#C8FF00]/30 flex items-center justify-center text-[#C8FF00] mb-4 shadow-[0_0_15px_rgba(200,255,0,0.2)]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black font-display uppercase text-white tracking-wide">NO MATCHING MOVIES FOUND</h3>
            <p className="text-xs font-mono text-slate-400 mt-1 uppercase max-w-md">
              WE COULD NOT FIND ANY TITLES MATCHING "{showcaseSearch}". TRY ANOTHER KEYWORD OR RESET FILTERS.
            </p>
            <button
              onClick={() => {
                setShowcaseSearch('');
                setActiveCategory('All');
              }}
              className="mt-6 px-6 py-2.5 bg-[#C8FF00] text-black font-black font-mono text-xs uppercase tracking-wider hover:bg-[#b5e600] transition-colors shadow-[0_0_15px_rgba(200,255,0,0.3)]"
            >
              RESET SEARCH & CATEGORIES
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/event/${event.id}`)}
              className="bg-[#11121a] border border-[#C8FF00]/20 hover:border-[#C8FF00] cursor-pointer group transition-all duration-200 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(200,255,0,0.25)]"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
                  <img
                    src={event.bannerUrl || event.posterUrl}
                    alt={event.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                  />
                  <div className="absolute top-3 left-3 bg-black/90 px-2.5 py-0.5 border border-[#C8FF00]/40 font-mono text-[10px] font-bold text-[#C8FF00] uppercase">
                    {event.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/90 px-2.5 py-0.5 border border-white/20 font-mono text-[10px] font-bold text-white flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#C8FF00] fill-[#C8FF00]" />
                    <span>{event.rating}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[10px] font-mono text-[#C8FF00] uppercase tracking-wider mb-1">
                    {event.venue.name} • {event.venue.city}
                  </div>
                  <h3 className="text-lg font-black font-display uppercase text-white group-hover:text-[#C8FF00] transition-colors leading-snug line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                    {event.subtitle || event.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">FROM</span>
                    <span className="text-lg font-black text-white font-mono">${event.pricing.standard.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/event/${event.id}`);
                    }}
                    className="px-4 py-2 bg-[#C8FF00] group-hover:bg-[#b5e600] text-black font-black text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(200,255,0,0.3)]"
                  >
                    <span>SELECT SEATS</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/events')}
            className="px-8 py-4 bg-[#11121a] hover:bg-[#181a27] border border-[#C8FF00]/40 hover:border-[#C8FF00] text-[#C8FF00] hover:text-white font-mono font-bold text-xs tracking-widest uppercase transition-all duration-200"
          >
            [ VIEW FULL DIRECTORY OF 24+ SHOWTIMES ]
          </button>
        </div>
      </section>
    </div>
  );
}
