import React, { useState } from 'react';
import { SERVICES } from '../data';
import { Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  onSelectServiceForEstimate: (serviceId: string) => void;
}

export default function Services({ onSelectServiceForEstimate }: ServicesProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'fencing' | 'decking' | 'patios' | 'landscaping'>('all');

  const filteredServices = activeFilter === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeFilter);

  const filterTabs = [
    { id: 'all', label: 'All Services' },
    { id: 'fencing', label: 'Fencing & Gates' },
    { id: 'patios', label: 'Patios & Paving' },
    { id: 'decking', label: 'Garden Decking' },
    { id: 'landscaping', label: 'Lawn & Clearance' },
  ];

  return (
    <section id="services" className="py-24 bg-[#f4f7f2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#829379] uppercase tracking-[0.2em] text-xs font-bold block">Professional Craftsmanship</span>
          <h2 className="font-sans text-3xl md:text-5xl font-light text-[#2d3a27] leading-tight">
            Our Expert <span className="font-bold">Services</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#829379] mx-auto"></div>
          <p className="text-[#3d4f35] text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            We deliver premium, durable timber work, pristine stone masonry, and garden renovations tailored specifically for modern Hampshire and Berkshire backyards.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-none text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === tab.id
                  ? 'bg-[#2d3a27] text-[#f4f7f2]'
                  : 'bg-white border border-[#2d3a27]/10 text-[#3d4f35] hover:border-[#2d3a27] hover:text-[#2d3a27]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: Service) => (
            <div 
              key={service.id} 
              id={`service-card-${service.id}`}
              className="bg-white border border-[#2d3a27]/10 rounded-none overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image container */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <span className="absolute top-4 left-4 bg-[#2d3a27] text-[#f4f7f2] border border-[#829379]/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-none shadow">
                  {service.category}
                </span>

                {/* Base price indicator tag */}
                <div className="absolute bottom-4 right-4 bg-white border border-[#2d3a27]/10 text-[#2d3a27] rounded-none px-3 py-1.5 shadow flex items-center space-x-1.5">
                  <span className="text-[10px] font-semibold text-[#3d4f35] uppercase">From</span>
                  <span className="font-sans font-bold text-sm">£{service.basePricePerUnit}</span>
                  <span className="text-[10px] text-[#3d4f35]">/{service.unitLabel}</span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-sans text-lg font-bold uppercase tracking-wide text-[#2d3a27] group-hover:text-[#829379] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#3d4f35] text-xs md:text-sm leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 pt-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-[#2d3a27]">
                        <Check className="w-4 h-4 text-[#829379] mr-2 shrink-0 mt-0.5" />
                        <span className="font-light text-[#3d4f35]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action footer */}
                <div className="mt-8 pt-6 border-t border-[#f4f7f2] flex items-center justify-between">
                  <span className="text-[10px] text-[#3d4f35] font-medium flex items-center uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#829379] mr-1.5" /> Free Site Survey
                  </span>
                  
                  <button
                    onClick={() => onSelectServiceForEstimate(service.id)}
                    className="text-xs font-bold tracking-wider uppercase text-[#2d3a27] hover:text-[#829379] flex items-center space-x-1 transition-colors"
                  >
                    <span>Estimate Price</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality guarantee notice banner */}
        <div className="mt-16 bg-[#2d3a27] border border-white/10 rounded-none p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#829379]/5 pointer-events-none" />
          <div className="space-y-3 mb-6 md:mb-0 max-w-2xl text-left">
            <span className="text-[#829379] text-xs font-semibold uppercase tracking-wider flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Premium Lumber & Masonry Guarantee
            </span>
            <h4 className="font-sans text-lg md:text-xl font-bold text-[#faf9f5]">
              Looking for custom dimensions or structural garden clearance?
            </h4>
            <p className="text-[#faf9f5]/70 text-xs md:text-sm font-light leading-relaxed">
              We design and construct custom items like raised garden planters, retaining sleepers, bespoke brickwork, timber stairs, and architectural pergolas. Speak directly with us for a tailor-made design.
            </p>
          </div>
          <button
            onClick={() => onSelectServiceForEstimate('closeboard-fencing')}
            className="px-6 py-3.5 bg-[#829379] hover:bg-[#92a389] text-white font-bold text-xs tracking-widest uppercase rounded-none transition-all duration-300 whitespace-nowrap"
          >
            Open Price Calculator
          </button>
        </div>
      </div>
    </section>
  );
}
