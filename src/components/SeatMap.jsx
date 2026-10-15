import React from 'react';
import { motion } from 'framer-motion';
import { SEAT_ROWS, SEATS_PER_ROW } from '../data/events';
import { useBooking } from '../context/BookingContext';
import { Check, X } from 'lucide-react';

export default function SeatMap() {
  const { currentEvent, selectedSeats, toggleSeat, getSeatPrice, getSeatTier } = useBooking();

  const occupiedSeats = currentEvent?.occupiedSeats || [];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Cinema Screen Indicator with 3D Perspective Glow — ZERO Blur */}
      <div className="w-full max-w-2xl mb-12 flex flex-col items-center cinema-perspective">
        <div className="w-full h-8 relative flex items-center justify-center">
          {/* Curved glowing screen line via pure shadow */}
          <div 
            className="w-full h-3 rounded-[50%] bg-[#C8FF00] screen-curve shadow-[0_15px_35px_rgba(200,255,0,0.5)]" 
          />
        </div>
        <div className="text-[10px] font-mono font-bold tracking-[0.25em] text-slate-400 uppercase mt-4 flex items-center gap-2">
          <span>CINEMA SCREEN // OPTICAL AXIS</span>
          <span className="w-1.5 h-1.5 bg-[#C8FF00] animate-pulse" />
        </div>
      </div>

      {/* Seat Map Grid with Center & Side Aisles — Sharp Solid Blocks */}
      <div className="w-full overflow-x-auto pb-6 scrollbar-thin flex justify-center">
        <div className="min-w-[640px] max-w-3xl flex flex-col gap-2.5 px-4">
          {SEAT_ROWS.map(({ row, tier, name }) => {
            return (
              <div key={row} className="flex items-center gap-3">
                {/* Row Label */}
                <div className="w-6 text-xs font-mono font-bold text-slate-400 text-center flex items-center justify-center">
                  {row}
                </div>

                {/* Seats in Row */}
                <div className="flex-1 flex items-center justify-between gap-1.5 sm:gap-2">
                  {Array.from({ length: SEATS_PER_ROW }, (_, i) => i + 1).map((colNum) => {
                    const seatId = `${row}${colNum}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    const price = getSeatPrice(seatId);

                    const hasAisleRight = colNum === 3 || colNum === 9;

                    return (
                      <React.Fragment key={seatId}>
                        <div className="relative group">
                          <motion.button
                            whileHover={!isOccupied ? { scale: 1.15 } : {}}
                            whileTap={!isOccupied ? { scale: 0.92 } : {}}
                            onClick={() => !isOccupied && toggleSeat(seatId)}
                            disabled={isOccupied}
                            aria-label={`Seat ${seatId} - $${price}`}
                            className={`relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-150 ${
                              isOccupied
                                ? 'bg-[#0e0f14] border border-white/5 text-slate-700 cursor-not-allowed'
                                : isSelected
                                ? 'bg-[#C8FF00] text-black border border-[#C8FF00] shadow-[0_0_18px_rgba(200,255,0,0.6)] z-10 font-black'
                                : tier === 'vip'
                                ? 'bg-[#181a27] border border-[#C8FF00]/40 text-[#C8FF00] hover:border-[#C8FF00] hover:bg-[#1e2233]'
                                : tier === 'premium'
                                ? 'bg-[#141622] border border-white/20 text-slate-200 hover:border-[#C8FF00] hover:text-[#C8FF00]'
                                : 'bg-[#11121a] border border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                            }`}
                          >
                            {isSelected ? (
                              <Check className="w-4 h-4 stroke-[3]" />
                            ) : isOccupied ? (
                              <X className="w-3 h-3 text-slate-700" />
                            ) : (
                              <span>{colNum}</span>
                            )}
                          </motion.button>

                          {/* Hover Tooltip — Sharp Solid Black Box */}
                          {!isOccupied && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                              <div className="bg-[#050608] border border-[#C8FF00] text-white text-[10px] font-mono font-bold py-1 px-2 shadow-xl whitespace-nowrap">
                                <span>SEAT {seatId}</span>
                                <span className="text-[#C8FF00] ml-1.5">${price.toFixed(2)}</span>
                                <span className="text-[9px] block text-slate-400 uppercase">{tier} TIER</span>
                              </div>
                              <div className="w-2 h-2 bg-[#050608] border-r border-b border-[#C8FF00] rotate-45 -mt-1" />
                            </div>
                          )}
                        </div>

                        {/* Aisle space */}
                        {hasAisleRight && (
                          <div className="w-3 sm:w-6 pointer-events-none" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Row Label Right */}
                <div className="w-6 text-xs font-mono font-bold text-slate-400 text-center flex items-center justify-center">
                  {row}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tiers Legend & Seat Status Indicator — Sharp Solid Panel */}
      <div className="mt-8 w-full max-w-2xl bg-[#11121a] border border-white/15 p-4 flex flex-wrap items-center justify-around gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#11121a] border border-white/20" />
          <span className="text-slate-300">AVAILABLE</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#C8FF00] text-black border border-[#C8FF00] shadow-[0_0_8px_#C8FF00]" />
          <span className="text-white font-bold">SELECTED</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-[#0e0f14] border border-white/5 flex items-center justify-center text-[10px] text-slate-700">✕</div>
          <span className="text-slate-500">SOLD OUT</span>
        </div>

        <div className="w-px h-4 bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-slate-500" />
          <span className="text-slate-400">STANDARD (${currentEvent?.pricing.standard.toFixed(0)})</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-white border border-white" />
          <span className="text-slate-300">PRIME (${currentEvent?.pricing.premium.toFixed(0)})</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#C8FF00] shadow-[0_0_8px_#C8FF00]" />
          <span className="text-[#C8FF00] font-bold">VIP (${currentEvent?.pricing.vip.toFixed(0)})</span>
        </div>
      </div>
    </div>
  );
}
