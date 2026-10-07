import React from 'react';
import { Shield, Sparkles, Award, Star, Hammer, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenTestimonials: () => void;
}

export default function Hero({ onOpenEstimator, onOpenTestimonials }: HeroProps) {
  return (
    <div className="relative min-h-screen bg-[#2d3a27] flex flex-col justify-center overflow-hidden pt-16">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/landscaping_hero_1783790885940.jpg"
          alt="Premium Landscaping Backyard"
          className="w-full h-full object-cover object-center opacity-25 transform scale-100 transition-transform"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d3a27] via-[#2d3a27]/90 to-[#2d3a27]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d3a27]/95 via-[#2d3a27]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main content column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tagline badge */}
            <div className="inline-flex items-center space-x-2 bg-[#829379]/15 border border-[#829379]/40 px-4 py-1.5 rounded-none text-[#a3b29c] text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#829379] animate-pulse" />
              <span>Hampshire & Berkshire Premier Landscaping</span>
            </div>

            {/* Main title */}
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-light text-[#faf9f5] leading-[1.1] tracking-tight">
              Your Vision,<br />
              <span className="text-[#829379] font-bold">Our Craft.</span>
            </h1>

            {/* Description */}
            <p className="text-[#faf9f5]/80 text-base md:text-lg max-w-xl leading-relaxed font-light">
              Transforming outdoor spaces with high-end fencing, timber decking, natural sandstone patios, and pristine lawns. Family-run, fully insured, and highly reviewed across Basingstoke, Winchester, and Reading.
            </p>

            {/* Key credentials bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-[#faf9f5]/90 py-2">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#829379] shrink-0" />
                <span className="font-medium">10-Year Timber Rot Warranty</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#829379] shrink-0" />
                <span className="font-medium">£5,000,000 Public Liability</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#829379] shrink-0" />
                <span className="font-medium">Checkatrade Members (9.9/10)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#829379] shrink-0" />
                <span className="font-medium">No-Obligation Free Quotes</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={onOpenEstimator}
                className="px-8 py-4 bg-[#829379] text-white hover:bg-[#92a389] font-bold text-xs tracking-widest uppercase rounded-none shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Calculate Cost Range</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenTestimonials}
                className="px-8 py-4 bg-transparent border-2 border-white/20 text-[#faf9f5] hover:border-white hover:bg-white/10 font-bold text-xs tracking-widest uppercase rounded-none transition-all duration-300 flex items-center justify-center"
              >
                View Real Testimonials
              </button>
            </div>
          </div>

          {/* Trust card side column */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="bg-[#3d4f35]/90 backdrop-blur-md border border-white/10 rounded-none p-8 shadow-2xl relative">
              {/* Geometric element behind */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#829379]/5 pointer-events-none border-b border-l border-white/10" />

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#829379]/10 border border-[#829379]/20 text-[#829379]">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#faf9f5]">Trusted Local Experts</h3>
                    <p className="text-xs text-[#faf9f5]/60">Reliability, punctuality, craftsmanship</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-4 font-semibold uppercase tracking-wider text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#faf9f5]/70">Average Rating</span>
                    <span className="font-bold text-[#faf9f5] flex items-center">
                      9.9 / 10 <Star className="w-4 h-4 fill-[#829379] text-[#829379] ml-1.5" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#faf9f5]/70">Active Experience</span>
                    <span className="font-bold text-[#faf9f5]">15+ Years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#faf9f5]/70">Projects Completed</span>
                    <span className="font-bold text-[#faf9f5]">800+ in Hampshire</span>
                  </div>
                </div>

                <div className="bg-[#2d3a27]/50 border border-[#3d4f35]/60 rounded-none p-4 text-xs text-[#faf9f5]/80 italic">
                  "The closeboard fence is rock solid, and the patio looks stunning. The cleanest and most professional builders I’ve had in years."
                  <span className="block mt-2 text-right font-semibold text-[#829379] not-italic">— David H., Basingstoke</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="bg-[#1c2619] border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-[#faf9f5]/65">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#829379]">100% Insured</span>
              <span className="text-[10px] text-[#faf9f5]/45">£5M Public Liability Cover</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#829379]">Checkatrade APPROVED</span>
              <span className="text-[10px] text-[#faf9f5]/45">Full Vet & Monitor Status</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#829379]">Local Family Run</span>
              <span className="text-[10px] text-[#faf9f5]/45">No Pushy Salespeople</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#829379]">Quality Wood Only</span>
              <span className="text-[10px] text-[#faf9f5]/45">Pressure Treated (FSC-Certified)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
