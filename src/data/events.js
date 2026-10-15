export const CATEGORIES = ['All', 'Movies', 'Concerts', 'Theater', 'Premieres'];

export const CITIES = ['New York', 'Los Angeles', 'San Francisco', 'London', 'Tokyo'];

export const SAMPLE_EVENTS = [
  {
    id: 'evt-101',
    title: 'Dune: Part Three — Awakening',
    subtitle: 'The Epic Climax in 70mm IMAX Laser Experience',
    category: 'Movies',
    isTrending: true,
    rating: 4.9,
    votes: 3420,
    duration: '2h 55m',
    ageRating: 'PG-13',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    language: 'English (Dolby Atmos)',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking vengeance against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.',
    synopsis: 'Experience the thunderous conclusion of the Arrakis saga on the world’s largest ultra-contrast IMAX screen with dual 4K laser projection and next-generation 12-channel spatial audio.',
    cast: ['Timothée Chalamet', 'Zendaya', 'Florence Pugh', 'Javier Bardem', 'Rebecca Ferguson'],
    director: 'Denis Villeneuve',
    pricing: {
      standard: 18.50,
      premium: 26.00,
      vip: 38.00
    },
    dates: ['Today, Oct 12', 'Tomorrow, Oct 13', 'Sun, Oct 14', 'Mon, Oct 15'],
    showtimes: [
      { id: 'st-1', time: '14:00', format: 'IMAX Laser 2D', priceMultiplier: 1.0 },
      { id: 'st-2', time: '17:30', format: 'IMAX 70mm Special', priceMultiplier: 1.2 },
      { id: 'st-3', time: '20:45', format: 'Dolby Atmos Prime', priceMultiplier: 1.15 },
      { id: 'st-4', time: '23:30', format: 'Late Night ScreenX', priceMultiplier: 0.95 }
    ],
    venue: {
      name: 'OmniSphere IMAX Cinema Dome',
      address: '742 Broadway Avenue, Times Square District',
      city: 'New York',
      hall: 'Auditorium 1 — Grand Titan',
      parking: 'Valet parking available at 44th St entrance',
      audio: '12-channel Immersive Spatial Surround',
      coordinates: '40.758896, -73.985130'
    },
    reviews: [
      {
        id: 'r1',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '2 days ago',
        comment: 'Visually transcendent! The sound design shook the entire theater during the desert worm sequences.'
      },
      {
        id: 'r2',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '4 days ago',
        comment: 'The VIP recliner seats in Row D/E are the ultimate sweet spot for IMAX. Worth every single penny!'
      }
    ],
    occupiedSeats: ['A3', 'A4', 'B5', 'B6', 'C7', 'C8', 'D5', 'D6', 'D7', 'E8', 'E9', 'F4', 'F5']
  },
  {
    id: 'evt-102',
    title: 'Cyberpunk Symphony 2077: Live Orchestra',
    subtitle: 'Electronic Synthesizers Meet 80-Piece Philharmonic',
    category: 'Concerts',
    isTrending: true,
    rating: 4.8,
    votes: 2150,
    duration: '2h 15m',
    ageRating: 'All Ages',
    genre: ['Electronic', 'Orchestral', 'Synthwave'],
    language: 'Instrumental & Vocal',
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
    description: 'An electrifying multi-sensory live performance fusing gritty analog modular synthesizers with the majesty of a full live symphony orchestra and holographic stage projections.',
    synopsis: 'Featuring live guest appearances from iconic electronic artists, synchronized reactive laser shows, and heart-pounding bass engineered specifically for modern arena acoustics.',
    cast: ['Night City Philharmonic', 'Guest DJ Hyper', 'Marcin Przybyłowicz'],
    director: 'Sarah Chen-Morrison',
    pricing: {
      standard: 35.00,
      premium: 58.00,
      vip: 89.00
    },
    dates: ['Today, Oct 12', 'Tomorrow, Oct 13', 'Fri, Oct 19'],
    showtimes: [
      { id: 'st-5', time: '19:00', format: 'Symphonic Live Stage', priceMultiplier: 1.0 },
      { id: 'st-6', time: '21:30', format: 'Encore Laser Mix', priceMultiplier: 1.1 }
    ],
    venue: {
      name: 'The Neon Apex Arena',
      address: '1000 Live Way, Downtown Center',
      city: 'Los Angeles',
      hall: 'Main Soundstage & Bowl',
      parking: 'Subterranean Lot B & C validation included',
      audio: 'L-Acoustics K1 Hyperreal Sound',
      coordinates: '34.043017, -118.267254'
    },
    reviews: [
      {
        id: 'r3',
        author: 'Liam Gallagher Jr.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: 'Yesterday',
        comment: 'The holographic visuals combined with the live brass section gave me goosebumps for 2 solid hours.'
      }
    ],
    occupiedSeats: ['B2', 'B3', 'C4', 'C5', 'D6', 'E5', 'E6', 'F7', 'G3']
  },
  {
    id: 'evt-103',
    title: 'Interstellar: 10th Anniversary in 4DX',
    subtitle: 'Relive Nolan’s Masterpiece with Physical Motion & Atmospheric FX',
    category: 'Movies',
    isTrending: false,
    rating: 5.0,
    votes: 4980,
    duration: '2h 49m',
    ageRating: 'PG-13',
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    language: 'English (Original Hans Zimmer Score)',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600&auto=format&fit=crop',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    synopsis: 'Specially remastered for synchronized 4DX hydraulic motion seats, environmental wind, fog, and cosmic lighting bursts timed to the iconic pipe-organ score by Hans Zimmer.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    director: 'Christopher Nolan',
    pricing: {
      standard: 19.50,
      premium: 28.00,
      vip: 42.00
    },
    dates: ['Today, Oct 12', 'Sat, Oct 13', 'Sun, Oct 14'],
    showtimes: [
      { id: 'st-7', time: '16:15', format: '4DX Motion Theater', priceMultiplier: 1.1 },
      { id: 'st-8', time: '20:00', format: '4DX + Dolby Atmos', priceMultiplier: 1.25 }
    ],
    venue: {
      name: 'Starlight Galactic Cinema',
      address: '450 Mission St, SOMA District',
      city: 'San Francisco',
      hall: 'Screen 4 (Motion Simulation Suite)',
      parking: 'Reserved cinema validation stalls at Mission Plaza',
      audio: 'Dolby Atmos + ButtKicker Haptic Bass',
      coordinates: '37.7909, -122.399'
    },
    reviews: [
      {
        id: 'r4',
        author: 'Chloe Simmons',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '3 days ago',
        comment: 'The docking scene with the physical motion seats was intensely thrilling! An unforgettable experience.'
      }
    ],
    occupiedSeats: ['C3', 'C4', 'D4', 'D5', 'D6', 'E5', 'E6', 'F6', 'G6']
  },
  {
    id: 'evt-104',
    title: 'Neon Horizon: Electronic Odyssey Festival',
    subtitle: '3 Stages, 20+ Global Headliners & Laser Pyrotechnics',
    category: 'Concerts',
    isTrending: true,
    rating: 4.7,
    votes: 1890,
    duration: '6h 00m',
    ageRating: '18+',
    genre: ['EDM', 'Melodic Techno', 'House'],
    language: 'International',
    posterUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600&auto=format&fit=crop',
    description: 'The premier open-air electronic dance gathering bringing together boundary-pushing audio-visual art installations, world-class melodic techno producers, and mesmerizing drone shows.',
    synopsis: 'Immerse yourself into a glowing nocturnal paradise with curated botanical chillout zones, food truck pavilion, and three themed monumental sound arenas.',
    cast: ['Tale of Us', 'Anyma', 'Charlotte de Witte', 'Bicep Live'],
    director: 'Apex Events Worldwide',
    pricing: {
      standard: 45.00,
      premium: 75.00,
      vip: 120.00
    },
    dates: ['Sat, Oct 20', 'Sun, Oct 21'],
    showtimes: [
      { id: 'st-9', time: '17:00', format: 'Full Pass (All 3 Stages)', priceMultiplier: 1.0 },
      { id: 'st-10', time: '20:00', format: 'Night Headliner VIP Access', priceMultiplier: 1.3 }
    ],
    venue: {
      name: 'Dockside Warehouse Arena',
      address: 'Royal Docks, Silvertown Way',
      city: 'London',
      hall: 'Open Air Grounds + Hangar 1',
      parking: 'Public transit recommended (Custom House Station 3 min walk)',
      audio: 'Funktion-One Vero Vertical Array',
      coordinates: '51.5080, 0.0248'
    },
    reviews: [
      {
        id: 'r5',
        author: 'Daniel Craig',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '1 week ago',
        comment: 'Production value is completely next level! Sound is crystal clear even at the very back of the arena.'
      }
    ],
    occupiedSeats: ['A1', 'A2', 'C6', 'C7', 'D3', 'D4', 'E8', 'E9', 'G5', 'G6']
  },
  {
    id: 'evt-105',
    title: 'Phantom of the Metaverse: Immersive Opera',
    subtitle: 'Classic Gothic Romance Reimagined in Augmented Reality',
    category: 'Theater',
    isTrending: false,
    rating: 4.8,
    votes: 950,
    duration: '2h 20m',
    ageRating: '10+',
    genre: ['Musical', 'Drama', 'Classical'],
    language: 'English with French Arias',
    posterUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=800&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=1600&auto=format&fit=crop',
    description: 'A breathtaking new staging of the legendary opera blending physical Broadway-caliber live vocalists with dynamic spatial projection mapping that transforms the historic auditorium into an enchanted subterranean labyrinth.',
    synopsis: 'Each seat is equipped with optional lightweight AR spectacles providing real-time ethereal visual effects floating throughout the hall.',
    cast: ['Ramin Karimloo', 'Sierra Boggess', 'West End Philharmonic'],
    director: 'Sir Cameron Mackintosh',
    pricing: {
      standard: 32.00,
      premium: 54.00,
      vip: 85.00
    },
    dates: ['Today, Oct 12', 'Tue, Oct 16', 'Wed, Oct 17'],
    showtimes: [
      { id: 'st-11', time: '15:00', format: 'Matinee Performance', priceMultiplier: 0.9 },
      { id: 'st-12', time: '19:30', format: 'Evening Gala + AR Glasses', priceMultiplier: 1.15 }
    ],
    venue: {
      name: 'Imperial Majestic Theater',
      address: '245 West 44th Street',
      city: 'New York',
      hall: 'Orchestra & Royal Mezzanine',
      parking: 'Discounted theater district garage coupon included',
      audio: 'Acoustic Architectural Reverberation Engine',
      coordinates: '40.7577, -73.9870'
    },
    reviews: [
      {
        id: 'r6',
        author: 'Sophie Martin',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '5 days ago',
        comment: 'The chandelier scene with holographic sparks raining down was mesmerizing! Must watch!'
      }
    ],
    occupiedSeats: ['B4', 'B5', 'B6', 'D7', 'D8', 'E4', 'E5', 'F2', 'F3']
  },
  {
    id: 'evt-106',
    title: 'Blade Runner 2099: Replicant Dawn',
    subtitle: 'Denis Villeneuve Returns to Los Angeles with 70mm IMAX Laser',
    category: 'Movies',
    isTrending: true,
    rating: 4.9,
    votes: 3890,
    duration: '2h 42m',
    ageRating: 'R',
    genre: ['Sci-Fi', 'Neo-Noir', 'Thriller'],
    language: 'English (Dolby Atmos Spatial)',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop',
    description: 'Fifty years after the blackout, an underground nexus operative uncovers an encrypted genetic anomaly that threatens the fragile equilibrium between synthetic lifeforms and human civilization.',
    synopsis: 'Immerse in rain-drenched neon streets with 12-channel physical tactile subwoofer arrays and dual 4K laser projection.',
    cast: ['Ryan Gosling', 'Ana de Armas', 'Michelle Yeoh', 'Hunter Schafer'],
    director: 'Denis Villeneuve',
    pricing: {
      standard: 19.00,
      premium: 27.50,
      vip: 40.00
    },
    dates: ['Today, Oct 12', 'Tomorrow, Oct 13', 'Sun, Oct 14', 'Wed, Oct 17'],
    showtimes: [
      { id: 'st-13', time: '13:45', format: 'IMAX Laser 2D', priceMultiplier: 1.0 },
      { id: 'st-14', time: '17:15', format: 'IMAX 70mm Special', priceMultiplier: 1.25 },
      { id: 'st-15', time: '21:00', format: 'Dolby Atmos Prime', priceMultiplier: 1.15 }
    ],
    venue: {
      name: 'OmniSphere IMAX Cinema Dome',
      address: '742 Broadway Avenue, Times Square District',
      city: 'New York',
      hall: 'Auditorium 2 — Neo Tokyo',
      parking: 'Valet parking available at 44th St entrance',
      audio: '12-channel Immersive Spatial Surround',
      coordinates: '40.758896, -73.985130'
    },
    reviews: [
      {
        id: 'r7',
        author: 'Alex K.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '1 day ago',
        comment: 'Atmosphere is unreal. Synth score vibrates through your chest. Masterpiece.'
      }
    ],
    occupiedSeats: ['A5', 'A6', 'C7', 'D5', 'D6', 'E7', 'F5']
  },
  {
    id: 'evt-107',
    title: 'Oppenheimer: The 70mm Special Edition',
    subtitle: 'Christopher Nolan’s Nuclear Odyssey in Uncompressed Analog Film',
    category: 'Movies',
    isTrending: false,
    rating: 5.0,
    votes: 6240,
    duration: '3h 00m',
    ageRating: 'R',
    genre: ['Biography', 'Drama', 'History'],
    language: 'English (6-Track Magnetic Sound)',
    posterUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during the Manhattan Project, presented in authentic 15-perf 70mm physical film reel.',
    synopsis: 'Experience the Trinity test sequence exactly as Nolan intended: 18K theoretical resolution on a 100-foot screen.',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    director: 'Christopher Nolan',
    pricing: {
      standard: 20.00,
      premium: 29.00,
      vip: 45.00
    },
    dates: ['Today, Oct 12', 'Fri, Oct 19', 'Sat, Oct 20'],
    showtimes: [
      { id: 'st-16', time: '14:30', format: '15/70mm IMAX Film Print', priceMultiplier: 1.3 },
      { id: 'st-17', time: '19:00', format: '15/70mm IMAX Film Print', priceMultiplier: 1.3 }
    ],
    venue: {
      name: 'The Neon Apex Arena Cinema',
      address: '1000 Live Way, Downtown Center',
      city: 'Los Angeles',
      hall: 'Screen 1 — Analog Vault',
      parking: 'Subterranean Lot B & C validation included',
      audio: 'Full Dynamic Uncompressed Magnetic Audio',
      coordinates: '34.043017, -118.267254'
    },
    reviews: [
      {
        id: 'r8',
        author: 'Julian Thorne',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        date: '3 days ago',
        comment: 'Seeing the 70mm physical reel turn was pure cinematic magic. The countdown silence gave chills.'
      }
    ],
    occupiedSeats: ['B3', 'B4', 'C4', 'C5', 'D7', 'D8', 'E6', 'F6', 'F7']
  }
];

// Seat layout definition:
// Rows A to H
// Standard: Rows A, B, C (standard price)
// Premium: Rows D, E, F (premium price)
// VIP: Rows G, H (VIP luxury recliners)
export const SEAT_ROWS = [
  { row: 'A', tier: 'standard', name: 'Front Tier' },
  { row: 'B', tier: 'standard', name: 'Front Tier' },
  { row: 'C', tier: 'standard', name: 'Front Tier' },
  { row: 'D', tier: 'premium', name: 'Prime View Tier' },
  { row: 'E', tier: 'premium', name: 'Prime View Tier' },
  { row: 'F', tier: 'premium', name: 'Prime View Tier' },
  { row: 'G', tier: 'vip', name: 'VIP Recliner Suite' },
  { row: 'H', tier: 'vip', name: 'VIP Recliner Suite' }
];

export const SEATS_PER_ROW = 12; // 1 to 12
