import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_EVENTS, SEAT_ROWS } from '../data/events';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  // Current active event being booked (default to first event if not set)
  const [currentEvent, setCurrentEvent] = useState(SAMPLE_EVENTS[0]);
  const [selectedDate, setSelectedDate] = useState(SAMPLE_EVENTS[0].dates[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(SAMPLE_EVENTS[0].showtimes[0]);
  const [selectedSeats, setSelectedSeats] = useState(['D5', 'D6']);
  const [appliedPromo, setAppliedPromo] = useState(null); // { code: 'SAVE15', discount: 0.15 }

  // Checkout form info
  const [contactInfo, setContactInfo] = useState({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 389-4421'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card', // 'card' | 'apple' | 'google'
    cardNumber: '•••• •••• •••• 4242',
    cardHolder: 'Alex Vance',
    expiry: '12/28',
    cvv: '984'
  });

  // Confirmed booking record
  const [confirmedBooking, setConfirmedBooking] = useState(() => {
    try {
      const saved = localStorage.getItem('cinetix_confirmed_booking');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // When event changes, update date & showtime to match event defaults
  const selectEvent = (event) => {
    setCurrentEvent(event);
    setSelectedDate(event.dates[0] || 'Today');
    setSelectedShowtime(event.showtimes[0] || null);
    setSelectedSeats([]);
  };

  // Toggle seat selection
  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((s) => s !== seatId);
      } else {
        if (prev.length >= 8) {
          alert('Maximum 8 seats per booking transaction.');
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  const clearSeats = () => setSelectedSeats([]);

  // Calculate pricing breakdown
  const getSeatTier = (seatId) => {
    const rowChar = seatId.charAt(0);
    const rowDef = SEAT_ROWS.find((r) => r.row === rowChar);
    return rowDef ? rowDef.tier : 'standard';
  };

  const getSeatPrice = (seatId) => {
    if (!currentEvent) return 0;
    const tier = getSeatTier(seatId);
    const basePrice = currentEvent.pricing[tier] || currentEvent.pricing.standard;
    const multiplier = selectedShowtime?.priceMultiplier || 1.0;
    return +(basePrice * multiplier).toFixed(2);
  };

  const calculateSubtotal = () => {
    return selectedSeats.reduce((acc, seatId) => acc + getSeatPrice(seatId), 0);
  };

  const subtotal = calculateSubtotal();
  const serviceFee = selectedSeats.length > 0 ? +(selectedSeats.length * 2.25).toFixed(2) : 0;
  const discountAmount = appliedPromo ? +(subtotal * appliedPromo.discount).toFixed(2) : 0;
  const tax = +((subtotal - discountAmount) * 0.085).toFixed(2);
  const total = +(Math.max(0, subtotal - discountAmount + serviceFee + tax)).toFixed(2);

  // Apply promo code
  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'CINETIX20' || cleanCode === 'VIP20') {
      setAppliedPromo({ code: cleanCode, discount: 0.20, label: '20% Special Discount' });
      return { success: true, message: '20% discount applied successfully!' };
    } else if (cleanCode === 'SAVE10') {
      setAppliedPromo({ code: cleanCode, discount: 0.10, label: '10% Savings' });
      return { success: true, message: '10% discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try "CINETIX20"' };
  };

  const removePromoCode = () => setAppliedPromo(null);

  // Finalize booking
  const completeBooking = () => {
    const bookingId = 'CTX-' + Math.floor(100000 + Math.random() * 900000);
    const bookingRecord = {
      bookingId,
      bookingTime: new Date().toISOString(),
      event: {
        id: currentEvent.id,
        title: currentEvent.title,
        subtitle: currentEvent.subtitle,
        category: currentEvent.category,
        bannerUrl: currentEvent.bannerUrl,
        posterUrl: currentEvent.posterUrl,
        venue: currentEvent.venue,
        ageRating: currentEvent.ageRating,
        duration: currentEvent.duration
      },
      showtime: selectedShowtime,
      date: selectedDate,
      seats: [...selectedSeats],
      pricing: {
        subtotal,
        serviceFee,
        discount: discountAmount,
        tax,
        total
      },
      contact: { ...contactInfo },
      payment: {
        method: paymentInfo.method,
        last4: paymentInfo.cardNumber.slice(-4) || '4242'
      }
    };

    setConfirmedBooking(bookingRecord);
    try {
      localStorage.setItem('cinetix_confirmed_booking', JSON.stringify(bookingRecord));
    } catch (e) {
      console.error(e);
    }
    return bookingRecord;
  };

  return (
    <BookingContext.Provider
      value={{
        currentEvent,
        setCurrentEvent,
        selectEvent,
        selectedDate,
        setSelectedDate,
        selectedShowtime,
        setSelectedShowtime,
        selectedSeats,
        setSelectedSeats,
        toggleSeat,
        clearSeats,
        getSeatPrice,
        getSeatTier,
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
        confirmedBooking,
        setConfirmedBooking,
        completeBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
