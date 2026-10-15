import React from 'react';
import { Film, ShieldCheck, Zap, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#07080b] border-t border-white/10 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges — Sharp Solid CAMP Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4 p-5 bg-[#0d0e15] border border-white/10 hover:border-[#C8FF00]/40 transition-colors">
            <div className="w-10 h-10 bg-[#141622] border border-[#C8FF00] flex items-center justify-center text-[#C8FF00] shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider">0.02S SMARTPASS ISSUANCE</h4>
              <p className="text-[11px] font-mono text-slate-400 mt-1">Direct cryptographic credential to Apple & Google Wallet</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-[#0d0e15] border border-white/10 hover:border-[#C8FF00]/40 transition-colors">
            <div className="w-10 h-10 bg-[#141622] border border-[#C8FF00] flex items-center justify-center text-[#C8FF00] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider">100% HARDWARE SEAT LOCK</h4>
              <p className="text-[11px] font-mono text-slate-400 mt-1">Zero race conditions, synchronized directly with venue API</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-[#0d0e15] border border-white/10 hover:border-[#C8FF00]/40 transition-colors">
            <div className="w-10 h-10 bg-[#141622] border border-[#C8FF00] flex items-center justify-center text-[#C8FF00] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider">TRANSPARENT SETTLEMENT</h4>
              <p className="text-[11px] font-mono text-slate-400 mt-1">Zero hidden booking surcharges at final checkout step</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#11121a] border border-[#C8FF00] flex items-center justify-center shadow-[0_0_10px_rgba(200,255,0,0.3)]">
                <Film className="w-4 h-4 text-[#C8FF00]" />
              </div>
              <span className="text-lg font-black font-display tracking-tight text-white">
                CINE<span className="text-[#C8FF00]">TIX</span>
              </span>
            </Link>
            <p className="mt-4 text-xs font-mono text-slate-400 leading-relaxed max-w-sm uppercase">
              NEXT-GEN ENTERTAINMENT RESERVATION PROTOCOL. HIGH FIDELITY IMAX 70MM, DOLBY ATMOS & ARENA LIVE MUSIC.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-[#C8FF00] bg-[#11121a] border border-[#C8FF00]/30 px-3 py-1">
                <span className="w-2 h-2 bg-[#C8FF00] animate-pulse"></span>
                SYSTEM STATUS: OPERATIONAL
              </span>
            </div>
          </div>

          <div>
            <h5 className="font-mono font-bold text-xs uppercase tracking-widest text-[#C8FF00] mb-4">[ DIRECTORY ]</h5>
            <ul className="space-y-2.5 text-xs font-mono">
              <li><Link to="/events" className="text-slate-400 hover:text-white transition-colors">ALL SHOWTIMES</Link></li>
              <li><Link to="/events?category=Movies" className="text-slate-400 hover:text-white transition-colors">IMAX 70MM FILMS</Link></li>
              <li><Link to="/events?category=Concerts" className="text-slate-400 hover:text-white transition-colors">LIVE ARENA CONCERTS</Link></li>
              <li><Link to="/events?category=Theater" className="text-slate-400 hover:text-white transition-colors">THEATER & OPERA</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono font-bold text-xs uppercase tracking-widest text-[#C8FF00] mb-4">[ BOOKING ]</h5>
            <ul className="space-y-2.5 text-xs font-mono">
              <li><Link to="/seats" className="text-slate-400 hover:text-white transition-colors">INTERACTIVE SEAT MAP</Link></li>
              <li><Link to="/checkout" className="text-slate-400 hover:text-white transition-colors">EXPRESS CHECKOUT</Link></li>
              <li><Link to="/confirmation" className="text-slate-400 hover:text-white transition-colors">RETRIEVE DIGITAL PASS</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono font-bold text-xs uppercase tracking-widest text-[#C8FF00] mb-4">[ EARLY ACCESS ]</h5>
            <p className="text-[11px] font-mono text-slate-400 mb-3 uppercase">PRESALE ALERTS FOR 70MM PREMIERES.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to VIP presale alerts!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                required
                className="w-full bg-[#11121a] border border-white/15 px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#C8FF00]"
              />
              <button
                type="submit"
                className="w-full text-xs font-mono font-black bg-[#C8FF00] hover:bg-[#b5e600] text-black py-2 tracking-wider uppercase transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500 uppercase">
          <p>© {new Date().getFullYear()} CINETIX PROTOCOL INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2">
            <span>HIGH CONTRAST CAMP THEME // ZERO BLUR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
