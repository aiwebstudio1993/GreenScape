import { Service, Testimonial, GalleryItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'closeboard-fencing',
    title: 'Premium Closeboard Fencing',
    category: 'fencing',
    description: 'Our signature heavy-duty vertical board fencing. Extremely sturdy, constructed with pressure-treated timber, sturdy posts, and weather-defying gravel boards to ensure maximum security and longevity.',
    features: [
      'Pressure-treated British softwood',
      'Robust concrete or timber posts',
      'Protective wooden or concrete gravel boards',
      'Strong wind-resistant construction',
      'Includes a 10-year timber rot warranty'
    ],
    image: '/images/fencing_work_1783790899588.jpg',
    basePricePerUnit: 95, // £ per linear meter
    unitLabel: 'meter'
  },
  {
    id: 'luxury-patios',
    title: 'Porcelain & Indian Sandstone Patios',
    category: 'patios',
    description: 'Transform your outdoor living area with high-quality paving. We specialize in contemporary luxury porcelain tiles and character-filled natural Indian Sandstone, professionally laid with full sub-base preparation.',
    features: [
      'Full excavation & structural sub-base',
      'High-performance polymer grouting',
      'Slip-resistant premium stone surfaces',
      'Bespoke brickwork borders & steps',
      'Fully sealed and stain-resistant finishes'
    ],
    image: '/images/patio_work_1783790912469.jpg',
    basePricePerUnit: 140, // £ per square meter
    unitLabel: 'sqm'
  },
  {
    id: 'composite-decking',
    title: 'Modern Timber & Composite Decking',
    category: 'decking',
    description: 'Sleek, structural garden decking that extends your living area. Choose from premium pressure-treated Scandinavian redwood timber or high-density composite decking that resists fading, mold, and splintering.',
    features: [
      'Heavy-duty load-bearing sub-frames',
      'Premium concealed fixings',
      'Ultra-low maintenance composite options',
      'Matching integrated handrails & steps',
      'Slip-resistant texture patterns'
    ],
    image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=800&q=80',
    basePricePerUnit: 120, // £ per square meter
    unitLabel: 'sqm'
  },
  {
    id: 'premium-turfing',
    title: 'Lawn Turfing & Artificial Grass',
    category: 'landscaping',
    description: 'Instantly revitalize your garden with lush green cover. We lay premium, weed-free local turf or high-density, child-and-pet-friendly artificial grass designed to remain vibrant all year round.',
    features: [
      'Full topsoil rotavation & leveling',
      'Weed-free, highly durable local turf',
      'Multi-layer drainage system for artificial grass',
      'Ultra-realistic multi-tonal fibers',
      'Child-safe & pet-friendly fibers'
    ],
    image: '/images/landscaping_hero_1783790885940.jpg',
    basePricePerUnit: 35, // £ per square meter
    unitLabel: 'sqm'
  },
  {
    id: 'bespoke-gates',
    title: 'Bespoke Matching Garden Gates',
    category: 'gates',
    description: 'Bespoke gates built to fit any opening. Our gates are constructed with heavy-duty mortise and tenon joints, clad in matching closeboard or tongue-and-groove boards, and finished with premium ironmongery.',
    features: [
      'Heavy-duty mortise and tenon frame',
      'Hot-dip galvanized, heavy-duty ironmongery',
      'Secure ring latches and key-lock options',
      'Fully matching cladding styles',
      'Reinforced structural posts'
    ],
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
    basePricePerUnit: 250, // £ per single gate (flat rate base)
    unitLabel: 'gate'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'review-1',
    author: 'David H.',
    location: 'Lichfield, Staffordshire',
    serviceType: 'Closeboard Fencing & Gate',
    date: '2026-06-15',
    rating: 5,
    comment: 'GreenScape Landscaping did an absolutely superb job. They took down our storm-damaged fence and replaced it with a beautiful closeboard fence and a matching side gate. The workmanship is second to none, the posts are securely set in concrete, and everything is completely straight and tidy. Cleaned up all the debris before leaving. Highly recommend!',
    reply: 'Thank you for the kind words, David! It was a pleasure working on your project and replacing that old boundary fence with our signature heavy-duty timber panels.',
    projectImages: {
      before: 'https://images.unsplash.com/photo-1500333186434-756997a01621?auto=format&fit=crop&w=800&q=80', // Old run-down fence
      after: '/images/fencing_work_1783790899588.jpg'
    },
    verified: true
  },
  {
    id: 'review-2',
    author: 'Sarah & Mark L.',
    location: 'Tamworth, Staffordshire',
    serviceType: 'Porcelain Patio & Turfing',
    date: '2026-05-24',
    rating: 5,
    comment: 'Absolutely blown away by the transformation of our back garden. We had an old slopey grass area that was practically unusable. The team excavated, put down a solid sub-base, and laid a gorgeous porcelain tile patio. They also re-leveled the upper lawn and laid fresh turf. It looks like a luxury resort now! They worked hard, stayed within budget, and were extremely polite.',
    reply: 'Sarah & Mark, thank you so much! It was a major earthwork excavation to level that slope, but the final porcelain tiles paired with that fresh grass look absolutely spectacular.',
    projectImages: {
      before: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80', // Sloped weedy ground
      after: '/images/patio_work_1783790912469.jpg'
    },
    verified: true
  },
  {
    id: 'review-3',
    author: 'Michael S.',
    location: 'Burton upon Trent, Staffordshire',
    serviceType: 'Composite Decking',
    date: '2026-06-02',
    rating: 5,
    comment: 'We contacted GreenScape to install composite decking on our terrace. The quote was very competitive, and they explained all the material choices thoroughly. The installation process was exceptionally smooth, done in just three days, and the hidden clip fastening makes the surface completely sleek and safe for the kids. Tremendous work.',
    reply: 'Greatly appreciate your review, Michael. Enjoy your low-maintenance composite deck—perfect for those summer BBQs with the family!',
    verified: true
  },
  {
    id: 'review-4',
    author: 'Patricia M.',
    location: 'Stafford, Staffordshire',
    serviceType: 'Boundary Fencing & Clearance',
    date: '2026-04-18',
    rating: 5,
    comment: 'I am so pleased with my new panel fencing. The old hedges were completely overgrown and pushing into the driveway. The guys cleared the hedge thoroughly, took away all the green waste, and installed robust gravel board panels. They worked through awful weather to make sure my garden was secure for my dog. Highly professional team.',
    reply: 'It was a cold week indeed, Patricia! But we wanted to ensure your dog had a secure garden as soon as possible. Thank you for keeping us supplied with tea and biscuits!',
    verified: true
  },
  {
    id: 'review-5',
    author: 'Robert J.',
    location: 'Sutton Coldfield, West Midlands',
    serviceType: 'Indian Sandstone Patio',
    date: '2026-03-30',
    rating: 5,
    comment: 'This is the second time I’ve used GreenScape Landscaping—they previously did my front fencing. This time, they laid an Indian Sandstone patio. Once again, their attention to detail was top notch. The jointing lines are beautifully consistent, and they graded the drainage perfectly away from the house. Reliable local tradespeople.',
    reply: 'Thank you for inviting us back, Robert! It is always a massive compliment to work for returning customers. Hope you enjoy the patio throughout the summer.',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    category: 'fencing',
    title: 'Closeboard Boundary Fencing',
    description: 'Heavy duty vertical closeboard fencing with concrete posts and matching gravel boards.',
    image: '/images/fencing_work_1783790899588.jpg'
  },
  {
    id: 'g-2',
    category: 'patios',
    title: 'Indian Sandstone Paving',
    description: 'Multi-tonal natural stone patio with matching brick retainer walls and stone paving borders.',
    image: '/images/patio_work_1783790912469.jpg'
  },
  {
    id: 'g-3',
    category: 'decking',
    title: 'Contemporary Composite Deck',
    description: 'Charcoal grey high-density composite decking with integrated steps and hidden fasteners.',
    image: 'https://images.unsplash.com/photo-1591857172899-41d9943f014e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-4',
    category: 'landscaping',
    title: 'Lawn Re-Turfing & Excavation',
    description: 'Full garden clearance, soil preparation, and premium cultivated turf installation.',
    image: '/images/landscaping_hero_1783790885940.jpg'
  },
  {
    id: 'g-5',
    category: 'gates',
    title: 'Bespoke T&G Double Driveway Gates',
    description: 'Custom mortise and tenon timber gates with heavy-duty galvanized hinges and secure drop bolts.',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g-6',
    category: 'fencing',
    title: 'Decorative Trellis Topped Fence',
    description: 'Closeboard panels with integrated diagonal-mesh trellis toppers for climbing garden plants.',
    image: 'https://images.unsplash.com/photo-1549294413-26f195afcbff?auto=format&fit=crop&w=800&q=80'
  }
];

export const LOCAL_AREAS = [
  'Lichfield', 'Tamworth', 'Burton upon Trent', 'Stafford', 'Cannock', 'Rugeley', 'Sutton Coldfield', 'Uttoxeter', 'Alrewas', 'Whittington', 'Shenstone', 'Fazeley', 'Polesworth', 'Armitage', 'Barton-under-Needwood', 'Burntwood', 'Hednesford', 'Stone', 'Brewood', 'Kings Bromley'
];
