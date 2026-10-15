import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import StepProgress from '../components/StepProgress';
import { 
  User, Mail, Phone, CreditCard, ShieldCheck, ChevronLeft, 
  ArrowRight, Lock, Tag, Check, Loader2, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    currentEvent, 
    selectedDate, 
    selectedShowtime, 
    selectedSeats, 
    getSeatPrice, 
    subtotal, 
    serviceFee, 
    discountAmount, 
    tax, 
    total, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    contactInfo, 
    setContactInfo, 
    paymentInfo, 
    setPaymentInfo, 
    completeBooking 
  } = useBooking();

  const [step, setStep] = useState(1);
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (selectedSeats.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 px-4 text-center bg-[#0a0a0f]">
        <div className="w-14 h-14 bg-[#11121a] border border-[#C8FF00] flex items-center justify-center text-[#C8FF00] mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black font-display uppercase text-white">NO SEATS RESERVED</h2>
        <p className="text-xs font-mono text-slate-400 mt-2 max-w-sm uppercase">
          PLEASE SELECT AT LEAST ONE SEAT ON THE INTERACTIVE SEAT MAP BEFORE PROCEEDING TO CHECKOUT.
        </p>
        <Link
          to="/seats"
          className="mt-6 px-6 py-3 font-mono font-black text-xs bg-[#C8FF00] text-black uppercase tracking-wider hover:bg-[#b5e600]"
        >
          SELECT SEATS
        </Link>
      </div>
    );
  }

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoMsg(res.message);
  };

  const handleAutofillTestCard = () => {
    setPaymentInfo({
      method: 'card',
      cardNumber: '4242 •••• •••• 4242',
      cardHolder: contactInfo.fullName || 'Alex Vance',
      expiry: '08/29',
      cvv: '789'
    });
  };

  const handleFinalSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completeBooking();
      navigate('/confirmation');
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 pb-4 border-b border-white/10">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#C8FF00] bg-[#11121a] px-3 py-1 border border-[#C8FF00]/40 mb-3 uppercase">
          <Lock className="w-3.5 h-3.5" />
          <span>256-BIT ENCRYPTED CHECKOUT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-white uppercase tracking-tight">
          SECURE TICKET CHECKOUT
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-1 uppercase">
          REVIEW RESERVATION DATA, CONFIRM ATTENDEE CONTACT, AND AUTHORIZE SMARTPASS ISSUANCE.
        </p>
      </div>

      <StepProgress currentStep={step} setStep={setStep} />

      {/* Main Form & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#11121a] p-6 sm:p-8 border border-white/15 min-h-[460px] flex flex-col justify-between shadow-xl">
            <AnimatePresence mode="wait">
              {/* STEP 1: Contact Details */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-base font-black font-display text-white flex items-center gap-2 uppercase tracking-wide">
                      <User className="w-5 h-5 text-[#C8FF00]" />
                      <span>STEP 1: PRIMARY ATTENDEE & TICKET DELIVERY</span>
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5 uppercase">
                      DIGITAL PASSES WILL BE DISPATCHED INSTANTLY TO THIS EMAIL ADDRESS.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-[10px] font-mono font-bold text-slate-300 block mb-1.5 uppercase">
                        FULL LEGAL NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={contactInfo.fullName}
                        onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                        placeholder="E.G. ALEX VANCE"
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/15 text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-[#C8FF00] uppercase"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-300 block mb-1.5 uppercase">
                        EMAIL (FOR SMARTPASS)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                          placeholder="ALEX@EXAMPLE.COM"
                          className="w-full pl-10 pr-4 py-3 bg-[#0a0a0f] border border-white/15 text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-[#C8FF00]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-300 block mb-1.5 uppercase">
                        MOBILE PHONE (SMS PASS)
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-3 bg-[#0a0a0f] border border-white/15 text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-[#C8FF00]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0a0a0f] border border-white/10 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#C8FF00] shrink-0 mt-0.5" />
                    <p className="text-xs font-mono text-slate-300 uppercase leading-relaxed">
                      DOOR VALIDATION REQUIRES PHOTO IDENTIFICATION MATCHING ATTENDEE NAME. ZERO PAPER TICKETS REQUIRED.
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-3.5 font-mono font-black text-xs bg-[#C8FF00] hover:bg-[#b5e600] text-black flex items-center gap-2 shadow-[0_0_20px_rgba(200,255,0,0.4)] uppercase tracking-wider"
                    >
                      <span>CONTINUE TO PAYMENT</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Payment Method */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-base font-black font-display text-white flex items-center gap-2 uppercase tracking-wide">
                        <CreditCard className="w-5 h-5 text-[#C8FF00]" />
                        <span>STEP 2: PAYMENT METHOD</span>
                      </h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5 uppercase">
                        TOKENIZED INSTANT CLEARING GATEWAY.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAutofillTestCard}
                      className="text-[10px] font-mono font-bold px-3 py-1.5 bg-[#0a0a0f] text-[#C8FF00] border border-[#C8FF00]/40 uppercase tracking-wider hover:bg-[#181a27]"
                    >
                      AUTOFILL DEMO CARD
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'card', label: 'CREDIT CARD' },
                      { id: 'apple', label: 'APPLE PAY' },
                      { id: 'google', label: 'GOOGLE PAY' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentInfo({ ...paymentInfo, method: m.id })}
                        className={`p-3 border text-center transition-all font-mono text-xs font-bold uppercase ${
                          paymentInfo.method === m.id
                            ? 'bg-[#C8FF00] text-black border-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.3)]'
                            : 'bg-[#0a0a0f] border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                        }`}
                      >
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="text-[10px] font-mono font-bold text-slate-300 block mb-1.5 uppercase">
                        CARD NUMBER
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/15 text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-[#C8FF00]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-mono font-bold text-slate-300 block mb-1.5 uppercase">
                          EXPIRY
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.expiry}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/15 text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-[#C8FF00] text-center"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono font-bold text-slate-300 block mb-1.5 uppercase">
                          CVV
                        </label>
                        <input
                          type="password"
                          maxLength="4"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                          placeholder="•••"
                          className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/15 text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-[#C8FF00] text-center"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono font-bold text-slate-300 block mb-1.5 uppercase">
                          POSTAL ZIP
                        </label>
                        <input
                          type="text"
                          defaultValue="10036"
                          placeholder="ZIP"
                          className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/15 text-white placeholder-slate-600 text-xs font-mono focus:outline-none focus:border-[#C8FF00] text-center"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 text-slate-400 hover:text-white flex items-center gap-1.5 uppercase"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>RETURN</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-8 py-3.5 font-black bg-[#C8FF00] hover:bg-[#b5e600] text-black flex items-center gap-2 shadow-[0_0_20px_rgba(200,255,0,0.4)] uppercase tracking-wider"
                    >
                      <span>REVIEW RESERVATION</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Review & Final Authorization */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-base font-black font-display text-white flex items-center gap-2 uppercase tracking-wide">
                      <ShieldCheck className="w-5 h-5 text-[#C8FF00]" />
                      <span>STEP 3: AUTHORIZE FINAL SETTLEMENT</span>
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5 uppercase">
                      CONFIRM SEATING AND PERFORMANCE DETAILS BEFORE TRIGGERING SMARTPASS.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 bg-[#0a0a0f] border border-white/10 space-y-1">
                      <span className="text-slate-500 uppercase font-bold text-[10px]">ATTENDEE DISPATCH</span>
                      <div className="text-white font-bold text-sm uppercase">{contactInfo.fullName}</div>
                      <div className="text-slate-300">{contactInfo.email}</div>
                      <div className="text-slate-400">{contactInfo.phone}</div>
                    </div>

                    <div className="p-4 bg-[#0a0a0f] border border-white/10 space-y-1">
                      <span className="text-slate-500 uppercase font-bold text-[10px]">PAYMENT INSTRUMENT</span>
                      <div className="text-white font-bold text-sm uppercase">
                        {paymentInfo.method === 'card' ? 'CARD ENDING ' + paymentInfo.cardNumber.slice(-4) : 'DIGITAL WALLET'}
                      </div>
                      <div className="text-slate-300">EXP: {paymentInfo.expiry}</div>
                      <div className="text-[#C8FF00] font-bold uppercase">PRE-AUTHORIZED</div>
                    </div>
                  </div>

                  <div className="p-5 bg-[#141622] border border-[#C8FF00] flex items-center justify-between font-mono">
                    <div>
                      <span className="text-xs text-slate-300 uppercase">FINAL CHARGE AMOUNT</span>
                      <div className="text-2xl font-black text-white">${total.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#C8FF00] font-bold block uppercase">{selectedSeats.length} HELD CHAIRS</span>
                      <span className="text-[10px] text-slate-400 uppercase">{selectedSeats.join(', ')}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 text-slate-400 hover:text-white flex items-center gap-1.5 uppercase"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>RETURN</span>
                    </button>

                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleFinalSubmit}
                      className="px-8 py-4 font-black bg-[#C8FF00] hover:bg-[#b5e600] text-black flex items-center gap-2 shadow-[0_0_25px_rgba(200,255,0,0.5)] uppercase tracking-wider disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>ISSUING SMARTPASS...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>CONFIRM & PAY ${total.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right 1 Col: Summary Sidebar */}
        <div>
          <div className="bg-[#11121a] p-6 border border-white/15 sticky top-28 space-y-6">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white pb-3 border-b border-white/10">
              [ RESERVATION SUMMARY ]
            </h3>

            <div className="flex gap-3">
              <img
                src={currentEvent?.posterUrl}
                alt={currentEvent?.title}
                className="w-16 h-22 object-cover border border-white/15 shrink-0"
              />
              <div className="flex-1 min-w-0 font-mono">
                <span className="text-[9px] font-bold uppercase text-[#C8FF00] block">
                  {currentEvent?.category}
                </span>
                <h4 className="text-sm font-black text-white truncate uppercase">{currentEvent?.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{selectedDate}</p>
                <p className="text-xs text-slate-400">{selectedShowtime?.time} • {selectedShowtime?.format}</p>
              </div>
            </div>

            <div className="space-y-2 py-3 border-y border-white/10 text-xs font-mono">
              <div className="flex justify-between font-bold text-slate-300 mb-1 uppercase">
                <span>HELD SEATS ({selectedSeats.length})</span>
              </div>
              {selectedSeats.map((seatId) => (
                <div key={seatId} className="flex justify-between text-slate-400 uppercase">
                  <span>CHAIR {seatId}</span>
                  <span className="text-white">${getSeatPrice(seatId).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <div>
              <label className="text-[10px] font-mono font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5 uppercase">
                <Tag className="w-3.5 h-3.5 text-[#C8FF00]" />
                <span>DISCOUNT CODE</span>
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-[#0a0a0f] border border-[#C8FF00] text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#C8FF00] font-bold uppercase">
                    <Check className="w-3.5 h-3.5" />
                    <span>{appliedPromo.code} ({appliedPromo.label})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-slate-400 hover:text-red-400 text-[10px] uppercase font-bold"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="TRY 'CINETIX20'"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#0a0a0f] border border-white/15 text-xs font-mono text-white uppercase placeholder-slate-600 focus:outline-none focus:border-[#C8FF00]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0a0a0f] hover:bg-[#181a27] text-xs font-mono font-bold text-white border border-white/20 uppercase"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {promoMsg && !appliedPromo && (
                <p className="text-[10px] font-mono text-[#C8FF00] mt-1">{promoMsg}</p>
              )}
            </div>

            <div className="space-y-2 text-xs font-mono pt-2 border-t border-white/10 uppercase">
              <div className="flex justify-between text-slate-400">
                <span>SUBTOTAL</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-[#C8FF00] font-bold">
                  <span>PROMO DISCOUNT</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>SERVICE FEE</span>
                <span className="text-white">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>TAX (8.5%)</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/10">
                <span>TOTAL DUE</span>
                <span className="text-[#C8FF00]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
