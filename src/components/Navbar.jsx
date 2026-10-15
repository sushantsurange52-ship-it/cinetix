import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Film, Ticket, Menu, X, Check, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, confirmedBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'DISCOVER', path: '/' },
    { name: 'EVENTS & MOVIES', path: '/events' },
    { name: 'SEAT MAP', path: '/seats' },
    { name: 'CHECKOUT', path: '/checkout' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'py-3 bg-[#0a0a0f] border-b border-[#C8FF00]/30 shadow-lg shadow-black/80'
          : 'py-5 bg-[#0a0a0f] border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-[#11121a] border border-[#C8FF00] p-1 flex items-center justify-center shadow-[0_0_12px_rgba(200,255,0,0.35)] group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-[#C8FF00]" />
          </div>
          <div>
            <span className="text-xl font-black font-display tracking-tight text-white flex items-center gap-1">
              CINE<span className="text-[#C8FF00]">TIX</span>
              <span className="w-1.5 h-1.5 bg-[#C8FF00] animate-pulse"></span>
            </span>
            <span className="hidden sm:block text-[9px] font-mono tracking-widest uppercase text-slate-400 font-bold -mt-1">
              CAMP PROTOCOL // TICKETING
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#11121a] border border-white/10 px-2 py-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-1.5 font-mono text-xs font-bold tracking-wider transition-colors ${
                  isActive ? 'bg-[#C8FF00] text-black shadow-[0_0_15px_rgba(200,255,0,0.3)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Active Booking Badge */}
        <div className="hidden lg:flex items-center gap-3">
          {selectedSeats.length > 0 && location.pathname !== '/confirmation' && (
            <div className="flex items-center gap-2 bg-[#11121a] border border-[#C8FF00] px-3 py-1.5 shadow-[0_0_15px_rgba(200,255,0,0.2)]">
              <span className="w-2 h-2 bg-[#C8FF00] rounded-full animate-ping" />
              <span className="font-mono text-xs font-bold text-[#C8FF00] tracking-wider uppercase">
                {selectedSeats.length} SEATS HELD
              </span>
              <button
                onClick={() => navigate('/checkout')}
                className="text-[10px] font-mono font-black bg-[#C8FF00] text-black px-2 py-0.5 ml-1 uppercase hover:bg-[#b5e600]"
              >
                PAY
              </button>
            </div>
          )}

          {confirmedBooking && (
            <Link
              to="/confirmation"
              className="flex items-center gap-1.5 font-mono text-xs font-bold text-white bg-[#11121a] hover:bg-[#181a27] px-3 py-2 border border-white/20 transition-all uppercase"
            >
              <Check className="w-3.5 h-3.5 text-[#C8FF00]" />
              <span>ACTIVE PASS</span>
            </Link>
          )}

          <Link
            to="/events"
            className="flex items-center gap-2 font-mono text-xs font-black bg-[#C8FF00] hover:bg-[#b5e600] text-black px-5 py-2.5 shadow-[0_0_20px_rgba(200,255,0,0.4)] transition-all uppercase tracking-wider"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {selectedSeats.length > 0 && (
            <button
              onClick={() => navigate('/seats')}
              className="flex items-center gap-1 bg-[#11121a] text-[#C8FF00] px-2.5 py-1 text-xs font-mono font-bold border border-[#C8FF00]"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>{selectedSeats.length}</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-[#11121a] border border-white/20 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu — Solid Dark, Sharp, ZERO Blur */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0c0d14] border-b border-[#C8FF00]/30 px-4 pt-3 pb-6 mt-2 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-3 font-mono text-xs font-bold tracking-wider flex items-center justify-between border ${
                    location.pathname === link.path
                      ? 'bg-[#C8FF00] text-black border-[#C8FF00]'
                      : 'bg-[#11121a] text-slate-300 border-white/10 hover:border-[#C8FF00]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                {confirmedBooking && (
                  <Link
                    to="/confirmation"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs font-bold bg-[#11121a] border border-white/20 text-white"
                  >
                    <span>VIEW LATEST TICKET</span>
                  </Link>
                )}
                <Link
                  to="/events"
                  className="flex items-center justify-center gap-2 px-4 py-3 font-mono text-xs font-black bg-[#C8FF00] text-black shadow-[0_0_20px_rgba(200,255,0,0.4)] tracking-widest uppercase"
                >
                  <span>EXPLORE ALL EVENTS</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
