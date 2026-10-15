import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import InteractiveBackground from './components/InteractiveBackground';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.16,
      ease: 'easeIn',
    },
  },
};

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f] text-slate-100 overflow-x-hidden selection:bg-[#C8FF00] selection:text-black relative">
      <ScrollToTop />
      
      {/* Interactive Cyberpunk Canvas Background */}
      <InteractiveBackground />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Routed Page Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/event/:id" element={<EventDetailsPage />} />
              <Route path="/seats" element={<SeatSelectionPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
