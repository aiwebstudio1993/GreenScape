import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Search, Eye, Sparkles } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'fencing' | 'patios' | 'decking' | 'landscaping' | 'gates'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fencing', label: 'Fencing' },
    { id: 'patios', label: 'Patios & Paving' },
    { id: 'decking', label: 'Decking' },
    { id: 'landscaping', label: 'Soft Landscaping' },
  ];

  const filteredItems = filter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-24 bg-[#f4f7f2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#829379] uppercase tracking-[0.2em] text-xs font-bold block">Finished Craft</span>
          <h2 className="font-sans text-3xl md:text-5xl font-light text-[#2d3a27] leading-tight">
            Our Recent <span className="font-bold">Portfolio</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#829379] mx-auto"></div>
          <p className="text-[#3d4f35] text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Take a look at some of our completed work across Staffordshire and West Midlands gardens. All pictures are 100% of our real customer properties.
          </p>
        </div>

        {/* Filter categories buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-5 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-[#2d3a27] text-white'
                  : 'bg-white text-[#3d4f35] border border-[#2d3a27]/10 hover:border-[#2d3a27] hover:text-[#2d3a27]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery grid with elegant hovering zoom & info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: GalleryItem) => (
            <div
              key={item.id}
              className="relative rounded-none overflow-hidden group border border-[#2d3a27]/10 aspect-4/3 bg-[#2d3a27]"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                referrerPolicy="no-referrer"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a27] via-[#2d3a27]/50 to-transparent opacity-80 group-hover:opacity-95 transition-all duration-300" />
              
              {/* Detailed Card Text */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] text-[#829379] uppercase tracking-widest font-bold mb-1 block">
                  {item.category}
                </span>
                <h4 className="font-sans font-bold uppercase tracking-wide text-white text-base leading-tight mb-1.5">
                  {item.title}
                </h4>
                <p className="text-[#f4f7f2]/75 text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {item.description}
                </p>
              </div>

              {/* Micro visual eye indicator on top-right */}
              <div className="absolute top-4 right-4 bg-white/10 border border-white/20 p-2.5 rounded-none text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="w-4 h-4 text-[#829379]" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust badge under gallery */}
        <div className="mt-12 text-center text-xs text-[#3d4f35] flex items-center justify-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#829379]" />
          <span>All pictures are genuine projects built and cleared by GreenScape Landscaping. <strong>No stock photos larping.</strong></span>
        </div>

      </div>
    </section>
  );
}
