import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Download, Share2, Calendar, Clock, 
  MapPin, Ticket, QrCode, ArrowRight, ShieldCheck, Copy, Check,
  Scissors
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfirmationPage() {
  const { confirmedBooking, currentEvent, selectedSeats, selectedDate, selectedShowtime, total } = useBooking();
  const [copied, setCopied] = useState(false);
  const ticketRef = useRef(null);

  const booking = confirmedBooking || {
    bookingId: 'CTX-89421-NY',
    bookingTime: new Date().toISOString(),
    event: {
      title: currentEvent?.title || 'DUNE: PART THREE — AWAKENING',
      subtitle: currentEvent?.subtitle || 'IMAX 70MM LASER EXPERIENCE',
      category: currentEvent?.category || 'Movies',
      bannerUrl: currentEvent?.bannerUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800',
      venue: currentEvent?.venue || {
        name: 'OmniSphere IMAX Dome',
        hall: 'Auditorium 1 — Grand Titan',
        city: 'New York'
      }
    },
    showtime: selectedShowtime || { time: '17:30', format: 'IMAX 70MM' },
    date: selectedDate || 'Today, Oct 12',
    seats: selectedSeats.length > 0 ? selectedSeats : ['D5', 'D6'],
    pricing: { total: total > 0 ? total : 52.00 },
    contact: { fullName: 'Alex Vance', email: 'alex.vance@example.com' }
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#C8FF00', '#ffffff', '#11121a', '#93bd00']
      });
    } catch (e) {
      console.log('Confetti error', e);
    }
  }, []);

  const handleCopyBookingId = () => {
    navigator.clipboard?.writeText(booking.bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
      {/* Top Success Badge with Spring Bounce Animation */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -25, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.1 }}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#11121a] border border-[#C8FF00] text-[#C8FF00] flex items-center justify-center mx-auto mb-3 shadow-[0_0_25px_rgba(200,255,0,0.4)]"
        >
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#C8FF00] bg-[#11121a] border border-[#C8FF00]/40 px-2.5 py-0.5 mb-1.5">
            <span className="w-1.5 h-1.5 bg-[#C8FF00] rounded-full animate-pulse" />
            <span>PAYMENT VERIFIED // SMARTPASS GENERATED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white uppercase tracking-tight">
            YOU'RE ALL SET FOR THE EVENT
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1 max-w-md mx-auto uppercase">
            DISPATCHED TO <span className="text-[#C8FF00] font-bold">{booking.contact.email}</span>.
          </p>
        </motion.div>
      </div>

      {/* Ticket Card Container with Die-Cut Perforated Stub */}
      <motion.div
        ref={ticketRef}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#11121a] border border-[#C8FF00]/60 shadow-[0_0_30px_rgba(200,255,0,0.25)]"
      >
        {/* Top Edge Accent Strip */}
        <div className="h-1.5 w-full bg-[#C8FF00] shadow-[0_0_12px_#C8FF00]" />

        {/* Ticket Header Bar */}
        <div className="px-6 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 bg-[#0d0e15]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0a0a0f] border border-[#C8FF00] flex items-center justify-center text-[#C8FF00] shadow-[0_0_10px_rgba(200,255,0,0.25)] shrink-0">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#C8FF00] block">
                OFFICIAL ADMISSION SMARTPASS
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white font-mono">{booking.bookingId}</span>
                <button
                  onClick={handleCopyBookingId}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title="Copy reference code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#C8FF00]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono self-start sm:self-auto">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-black text-slate-300 border border-white/20 uppercase">
              {booking.event.category}
            </span>
            <span className="px-2.5 py-0.5 text-[11px] font-black bg-[#C8FF00] text-black uppercase shadow-[0_0_10px_rgba(200,255,0,0.3)]">
              {booking.showtime.format}
            </span>
          </div>
        </div>

        {/* Ticket Main Body & Die-Cut Stub Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 relative">
          
          {/* Main Ticket Details (8 Columns on desktop) */}
          <div className="md:col-span-8 p-6 sm:p-7 space-y-4">
            
            {/* Dominant Movie Title */}
            <div>
              <div className="text-[10px] font-mono text-[#C8FF00] font-bold uppercase tracking-widest mb-0.5">
                FEATURE SHOWTIME
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white uppercase tracking-tight leading-tight">
                {booking.event.title}
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                {booking.event.subtitle}
              </p>
            </div>

            {/* Structured 2-Column Schedule Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#0a0a0f] border border-white/10">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-0.5 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-[#C8FF00]" />
                  <span>DATE</span>
                </div>
                <span className="text-white font-bold text-sm uppercase">{booking.date}</span>
              </div>

              <div className="p-3 bg-[#0a0a0f] border border-white/10">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-0.5 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-[#C8FF00]" />
                  <span>SHOWTIME</span>
                </div>
                <span className="text-white font-bold text-sm uppercase">{booking.showtime.time}</span>
              </div>
            </div>

            {/* Venue & Hall Row */}
            <div className="p-3 bg-[#0a0a0f] border border-white/10 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-0.5 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#C8FF00]" />
                <span>VENUE & AUDITORIUM</span>
              </div>
              <div className="text-white font-bold text-sm uppercase">
                {booking.event.venue.name}
              </div>
              <div className="text-slate-400 text-[11px] mt-0.5 uppercase">
                {booking.event.venue.hall || 'MAIN AUDITORIUM'} • {booking.event.venue.city}
              </div>
            </div>

            {/* Seats and Total Pricing Row with Staggered Seat Chips */}
            <div className="flex items-end justify-between pt-3 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  RESERVED SEATS ({booking.seats.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {booking.seats.map((s, idx) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.6, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.25, 
                        delay: 0.5 + idx * 0.08,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      }}
                      className="px-2.5 py-1 bg-[#0a0a0f] text-[#C8FF00] font-black text-xs font-mono uppercase border border-[#C8FF00]/60 shadow-[0_0_10px_rgba(200,255,0,0.25)]"
                    >
                      SEAT {s}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="text-right shrink-0 pl-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">TOTAL SETTLED</span>
                <div className="text-xl sm:text-2xl font-black text-white font-mono">
                  ${booking.pricing.total.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* DIE-CUT PERFORATED STUB SEPARATOR                            */}
          {/* ============================================================ */}
          <div className="md:col-span-4 relative bg-[#0c0d15] flex flex-col justify-between p-6 sm:p-7 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-white/20">
            
            {/* Desktop Semicircle Die-Cut Notches (Top and Bottom of Divider) */}
            <div className="hidden md:block absolute -left-3.5 -top-3.5 w-7 h-7 rounded-full bg-[#0a0a0f] border border-[#C8FF00]/50 z-20 shadow-inner" />
            <div className="hidden md:block absolute -left-3.5 -bottom-3.5 w-7 h-7 rounded-full bg-[#0a0a0f] border border-[#C8FF00]/50 z-20 shadow-inner" />

            {/* Mobile Semicircle Die-Cut Notches (Left and Right of Divider) */}
            <div className="md:hidden absolute -top-3.5 -left-3.5 w-7 h-7 rounded-full bg-[#0a0a0f] border border-[#C8FF00]/50 z-20 shadow-inner" />
            <div className="md:hidden absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#0a0a0f] border border-[#C8FF00]/50 z-20 shadow-inner" />

            <div className="text-center w-full my-auto">
              <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#C8FF00] mb-2.5">
                <Scissors className="w-3 h-3 rotate-90 hidden md:inline text-[#C8FF00]/60" />
                <span>SCAN FOR ADMISSION</span>
              </div>

              {/* Clean Square QR Code with Subtle Pulsing Glow Loop */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(200,255,0,0.15)',
                    '0 0 25px rgba(200,255,0,0.4)',
                    '0 0 10px rgba(200,255,0,0.15)'
                  ],
                  borderColor: [
                    'rgba(200,255,0,0.4)',
                    'rgba(200,255,0,0.85)',
                    'rgba(200,255,0,0.4)'
                  ]
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-36 h-36 mx-auto bg-black border-2 border-[#C8FF00]/50 p-2 relative flex items-center justify-center"
              >
                {/* Clean QR Graphic */}
                <QrCode className="w-full h-full text-[#C8FF00]" />
                
                {/* Center Micro Ticket Target Logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-7 h-7 bg-black border border-[#C8FF00] flex items-center justify-center shadow-lg">
                    <Ticket className="w-3.5 h-3.5 text-[#C8FF00]" />
                  </div>
                </div>

                {/* Corner crosshairs */}
                <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 border-[#C8FF00]" />
                <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 border-[#C8FF00]" />
                <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 border-[#C8FF00]" />
                <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 border-[#C8FF00]" />
              </motion.div>

              {/* Smaller, Muted Passcode */}
              <div className="mt-2.5 text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                PASSCODE: <span className="text-white font-bold">{booking.bookingId.replace('CTX-', '')}</span>
              </div>
            </div>

            {/* Attendee Credential Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 text-center w-full font-mono">
              <span className="text-[9px] text-slate-500 uppercase font-bold block">VERIFIED ATTENDEE</span>
              <span className="text-xs font-bold text-white uppercase truncate block mt-0.5">
                {booking.contact.fullName}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons Row (Evenly Aligned, Tightened Spacing) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <button
          onClick={handlePrintDownload}
          className="w-full py-3.5 px-4 bg-[#11121a] hover:bg-[#181a27] text-white border border-white/20 hover:border-[#C8FF00] hover:text-[#C8FF00] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase font-bold"
        >
          <Download className="w-4 h-4 text-[#C8FF00]" />
          <span>PRINT / PDF PASS</span>
        </button>

        <button
          onClick={handleCopyBookingId}
          className="w-full py-3.5 px-4 bg-[#11121a] hover:bg-[#181a27] text-white border border-white/20 hover:border-[#C8FF00] hover:text-[#C8FF00] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase font-bold"
        >
          <Share2 className="w-4 h-4 text-[#C8FF00]" />
          <span>{copied ? 'CODE COPIED!' : 'SHARE REFERENCE'}</span>
        </button>

        <Link
          to="/events"
          className="w-full py-3.5 px-4 bg-[#C8FF00] hover:bg-[#b5e600] text-black font-black font-mono shadow-[0_0_20px_rgba(200,255,0,0.4)] hover:shadow-[0_0_30px_rgba(200,255,0,0.7)] flex items-center justify-center gap-2 uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>BOOK ANOTHER EVENT</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </Link>
      </div>

      {/* Apple / Google Wallet Pill Badges & Offline Trust Line (Tightened Spacing) */}
      <div className="mt-6 p-4 bg-[#11121a] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400 uppercase">
        <div className="flex items-center gap-2 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-[#C8FF00] shrink-0" />
          <span>OFFLINE ENCRYPTED CREDENTIAL VALIDATED DIRECTLY WITH TURNSTILE GATES.</span>
        </div>

        {/* Proper Styled Pill Wallet Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => alert('SmartPass added to Apple Wallet!')}
            className="px-3.5 py-1.5 bg-[#0a0a0f] hover:bg-[#161824] border border-white/20 hover:border-[#C8FF00] text-white text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-xs leading-none"></span>
            <span className="tracking-wider">APPLE WALLET</span>
          </button>
          
          <button
            onClick={() => alert('SmartPass added to Google Wallet!')}
            className="px-3.5 py-1.5 bg-[#0a0a0f] hover:bg-[#161824] border border-white/20 hover:border-[#C8FF00] text-white text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="w-3 h-3 rounded-full bg-white/15 flex items-center justify-center text-[9px] font-black text-[#C8FF00]">G</span>
            <span className="tracking-wider">GOOGLE WALLET</span>
          </button>
        </div>
      </div>
    </div>
  );
}
