import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenTestimonials?: () => void;
}

export default function Hero({ onOpenEstimator }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] bg-[#1c2619] flex flex-col justify-end overflow-hidden">
      {/* Full-bleed garden photo with a slow, gentle zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/landscaping_hero_1783790885940.jpg"
          alt="Landscaped garden with fresh lawn, patio and planting"
          className="hero-zoom w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Deep forest-green shading so the text reads clearly */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c2619] via-[#1c2619]/55 to-[#1c2619]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c2619]/85 via-[#1c2619]/35 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 pt-40 pb-24 md:pb-32">
        {/* Thin accent line */}
        <div className="w-16 h-px bg-[#a3b29c] mb-8 md:mb-10" />

        <h1 className="font-sans text-[#faf9f5] font-light tracking-tight leading-[0.95] text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]">
          Your Vision,
          <br />
          <span className="font-bold text-[#a3b29c]">Our Craft.</span>
        </h1>

        <button
          onClick={onOpenEstimator}
          className="group mt-10 md:mt-14 inline-flex items-center gap-3 px-9 py-5 bg-[#829379] text-white hover:bg-[#92a389] font-bold text-xs md:text-sm tracking-[0.2em] uppercase rounded-none shadow-2xl transition-all duration-300"
        >
          <span>Calculate Cost Range</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Scroll cue */}
      <ChevronDown
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-6 h-6 text-[#faf9f5]/60 animate-bounce"
      />
    </section>
  );
}
