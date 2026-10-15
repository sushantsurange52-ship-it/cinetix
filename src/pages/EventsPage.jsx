import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { SAMPLE_EVENTS, CATEGORIES, CITIES } from '../data/events';
import { Search, Filter, SlidersHorizontal, RotateCcw, MapPin, X, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || 'All';
  const initialCity = searchParams.get('city') || 'All Cities';
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [maxPrice, setMaxPrice] = useState(120);
  const [sortBy, setSortBy] = useState('rating');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredEvents = useMemo(() => {
    return SAMPLE_EVENTS.filter((event) => {
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }
      if (selectedCity !== 'All Cities' && event.venue.city !== selectedCity) {
        return false;
      }
      if (event.pricing.standard > maxPrice) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesGenre = event.genre.some((g) => g.toLowerCase().includes(q));
        const matchesVenue = event.venue.name.toLowerCase().includes(q);
        const matchesCast = event.cast.some((c) => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesGenre && !matchesVenue && !matchesCast) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricing.standard - b.pricing.standard;
      if (sortBy === 'price-desc') return b.pricing.standard - a.pricing.standard;
      return b.rating - a.rating;
    });
  }, [selectedCategory, selectedCity, maxPrice, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedCity('All Cities');
    setMaxPrice(120);
    setSearchQuery('');
    setSortBy('rating');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0a0a0f]">
      {/* Page Header */}
      <div className="mb-8 pb-4 border-b border-white/10">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C8FF00]">
          // SCHEDULE DATABASE
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-white mt-1 uppercase tracking-tight">
          EXPLORE TICKETS & SHOWTIMES
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-1 uppercase">
          FILTER BY VENUE, ACOUSTIC FORMAT, PRICE BRACKET OR METRO CITY.
        </p>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filter Sidebar — Solid CAMP Panel */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-[#11121a] p-6 border border-white/15 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-wider">
                <SlidersHorizontal className="w-4 h-4 text-[#C8FF00]" />
                <span>FILTER CRITERIA</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-mono font-bold text-slate-400 hover:text-[#C8FF00] flex items-center gap-1 transition-colors uppercase"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div className="mt-5">
              <label className="text-[10px] font-mono font-bold text-slate-300 block mb-2 uppercase tracking-wider">
                SEARCH TITLE / ARTIST
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#C8FF00] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="E.G. NOLAN, DUNE, LIVE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#0a0a0f] border border-white/15 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#C8FF00] uppercase"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mt-6">
              <label className="text-[10px] font-mono font-bold text-slate-300 block mb-2 uppercase tracking-wider">
                CATEGORY
              </label>
              <div className="flex flex-col gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 text-xs font-mono font-bold text-left transition-all flex items-center justify-between uppercase border ${
                      selectedCategory === cat
                        ? 'bg-[#C8FF00] text-black border-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.3)]'
                        : 'bg-[#0a0a0f] text-slate-400 border-white/10 hover:border-[#C8FF00] hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span className="w-1.5 h-1.5 bg-black" />}
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div className="mt-6">
              <label className="text-[10px] font-mono font-bold text-slate-300 block mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#C8FF00]" />
                <span>METRO CITY</span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-[#0a0a0f] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C8FF00] cursor-pointer uppercase"
              >
                <option value="All Cities">ALL CITIES</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Max Standard Ticket Price */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-300 mb-2 uppercase">
                <span>MAX STARTING TICKET</span>
                <span className="text-[#C8FF00]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                className="w-full accent-[#C8FF00] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>$15</span>
                <span>$65</span>
                <span>$120</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Main Search & Control Bar */}
          <div className="bg-[#11121a] p-4 border border-white/15 space-y-3">
            {/* Top Search Input with Neon Accent */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 flex items-center bg-[#0a0a0f] border border-white/15 focus-within:border-[#C8FF00] transition-colors">
                <Search className="w-4 h-4 text-[#C8FF00] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="SEARCH MOVIES, SHOWS, CAST, DIRECTORS OR VENUES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 bg-transparent text-xs font-mono text-white placeholder-slate-500 uppercase tracking-wider focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 text-slate-400 hover:text-white transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Category Buttons */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 text-xs font-mono font-bold uppercase transition-all whitespace-nowrap border ${
                      selectedCategory === cat
                        ? 'bg-[#C8FF00] text-black border-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.3)]'
                        : 'bg-[#0a0a0f] text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-bar with Showing Count, Mobile Filter Trigger, and Sort */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 uppercase">SHOWING:</span>
                <span className="text-[#C8FF00] font-black">{filteredEvents.length}</span>
                <span className="text-white font-bold">AVAILABLE</span>
                {searchQuery && (
                  <span className="text-slate-400 hidden sm:inline">
                    FOR "<span className="text-white">{searchQuery}</span>"
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0f] border border-white/20 text-xs text-white hover:border-[#C8FF00] transition-colors"
                >
                  <Filter className="w-3.5 h-3.5 text-[#C8FF00]" />
                  <span>FILTERS</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 hidden sm:inline uppercase">SORT:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#0a0a0f] border border-white/15 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#C8FF00] cursor-pointer uppercase font-mono"
                  >
                    <option value="rating">HIGHEST RATED</option>
                    <option value="price-asc">PRICE: LOW TO HIGH</option>
                    <option value="price-desc">PRICE: HIGH TO LOW</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Collapsible Filters */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-[#11121a] p-5 border border-white/15 space-y-4"
              >
                <div className="flex items-center justify-between font-mono">
                  <span className="text-xs font-bold text-white uppercase">FILTER EVENTS</span>
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-[#C8FF00] uppercase font-bold"
                  >
                    RESET ALL
                  </button>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 mb-1 block uppercase">SEARCH TITLE / ARTIST</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#C8FF00] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="SEARCH MOVIES..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#0a0a0f] border border-white/15 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#C8FF00] uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 mb-1 block uppercase">CATEGORY</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-white/15 px-3 py-2 text-xs font-mono text-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 mb-1 block uppercase">CITY</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-white/15 px-3 py-2 text-xs font-mono text-white"
                    >
                      <option value="All Cities">ALL CITIES</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Event Cards Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="bg-[#11121a] p-12 border border-white/15 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0a0a0f] border border-white/10 flex items-center justify-center text-slate-500 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-mono font-black uppercase text-white">NO MATCHES FOUND</h3>
              <p className="text-xs font-mono text-slate-400 mt-1 max-w-sm uppercase">
                WE COULD NOT LOCATE ANY EVENTS MATCHING YOUR PARAMETERS.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 px-6 py-2.5 font-mono text-xs font-black bg-[#C8FF00] text-black hover:bg-[#b5e600] uppercase tracking-wider"
              >
                CLEAR ALL FILTERS
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
