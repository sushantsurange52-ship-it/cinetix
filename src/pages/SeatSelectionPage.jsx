import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import SeatMap from '../components/SeatMap';
import { 
  ChevronLeft, ArrowRight, Ticket, Clock, MapPin, 
  Trash2, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const { 
    currentEvent, 
    selectedDate, 
    selectedShowtime, 
    selectedSeats, 
    toggleSeat, 
    clearSeats, 
    getSeatPrice, 
    total 
  } = useBooking();

  const handleProceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least 1 seat to continue.');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen pt-28 pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
      {/* Top Breadcrumb & Event Summary Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <Link
            to={currentEvent ? `/event/${currentEvent.id}` : '/events'}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors mb-2 uppercase"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>RETURN TO EVENT SPECIFICATION</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white uppercase tracking-tight">
              {currentEvent?.title || 'SELECT YOUR SEATS'}
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 font-mono text-xs font-black bg-[#C8FF00] text-black uppercase">
              {selectedShowtime?.format || 'IMAX 70MM'}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1 text-[#C8FF00] font-bold uppercase">
              <Clock className="w-3.5 h-3.5 text-[#C8FF00]" />
              {selectedDate} • {selectedShowtime?.time || '17:30'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 uppercase">
              <MapPin className="w-3.5 h-3.5 text-[#C8FF00]" />
              {currentEvent?.venue?.name || 'AUDITORIUM 1'}, {currentEvent?.venue?.hall || 'SCREEN 1'}
            </span>
          </div>
        </div>

        {/* Selected Seats Counter Badge */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#11121a] border border-white/15 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-[#C8FF00]" />
            <span className="font-mono text-xs font-bold text-white uppercase">
              {selectedSeats.length} {selectedSeats.length === 1 ? 'SEAT' : 'SEATS'} HELD
            </span>
          </div>
          {selectedSeats.length > 0 && (
            <button
              onClick={clearSeats}
              className="p-2 bg-[#11121a] hover:bg-[#1f1620] text-red-400 border border-red-500/30 transition-colors text-xs font-mono flex items-center gap-1 uppercase"
              title="Clear all selected seats"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">RESET</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Seat Map Area — Solid CAMP Panel */}
      <div className="bg-[#11121a] p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
        <SeatMap />
      </div>

      {/* Seat Selection Hints */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 px-2 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#C8FF00]" />
          <span>SEATS HELD FOR 10 MINUTES UPON SELECTION. ROWS D TO F PROVIDE OPTIMAL ACOUSTIC FOCUS.</span>
        </div>
        <div>
          <span>MAX 8 TICKETS PER TRANSACTION.</span>
        </div>
      </div>

      {/* Sticky Bottom Order Summary & Checkout Bar — Solid Dark, ZERO Blur */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0f] border-t border-[#C8FF00]/30 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Selected Seat Badges */}
          <div className="w-full sm:w-auto flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {selectedSeats.length > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase hidden md:inline">HELD:</span>
                <AnimatePresence>
                  {selectedSeats.map((seatId) => (
                    <motion.div
                      key={seatId}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-[#11121a] border border-[#C8FF00] text-xs font-mono font-bold text-white shrink-0"
                    >
                      <span>{seatId}</span>
                      <span className="text-[#C8FF00]">${getSeatPrice(seatId).toFixed(0)}</span>
                      <button
                        onClick={() => toggleSeat(seatId)}
                        className="hover:text-red-400 transition-colors ml-0.5 font-sans"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase">
                <AlertCircle className="w-4 h-4 text-[#C8FF00]" />
                <span>SELECT ANY AVAILABLE CHAIR ON THE GRID ABOVE TO RESERVE.</span>
              </div>
            )}
          </div>

          {/* Running Total & Proceed Button */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6">
            <div className="text-left sm:text-right font-mono">
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 block">TOTAL SUM</span>
              <div className="text-xl sm:text-2xl font-black text-white">
                ${total.toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              disabled={selectedSeats.length === 0}
              className={`px-8 py-3.5 font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                selectedSeats.length > 0
                  ? 'bg-[#C8FF00] hover:bg-[#b5e600] text-black shadow-[0_0_20px_rgba(200,255,0,0.4)] cursor-pointer'
                  : 'bg-[#11121a] text-slate-600 border border-white/10 cursor-not-allowed'
              }`}
            >
              <span>CONTINUE TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
