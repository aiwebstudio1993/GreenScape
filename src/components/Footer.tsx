import React from 'react';
import { Star, MapPin, ShieldCheck, Mail, Phone, Clock } from 'lucide-react';
import { LOCAL_AREAS } from '../data';

export default function Footer() {
  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#2d3a27] text-[#f4f7f2]/80 pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Upper footer grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10 text-left">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white text-[#2d3a27] p-1.5 rounded-none border border-[#829379]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#2d3a27]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22V12" />
                  <path d="M12 12a5 5 0 0 0-5-5H3" />
                  <path d="M12 12a5 5 0 0 1 5-5h4" />
                </svg>
              </div>
              <span className="font-sans text-xl font-bold text-white tracking-widest uppercase">TC Fencing</span>
            </div>
            
            <p className="text-xs text-[#f4f7f2]/65 leading-relaxed font-light">
              Premium fencing, decking, paving, and landscaping specialists based in Basingstoke. Providing robust pressure-treated boundaries and garden clearouts across Hampshire and Berkshire for over 15 years.
            </p>

            <div className="flex items-center space-x-1.5 text-xs text-[#829379]">
              <div className="flex text-[#829379]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold">Checkatrade Member: 9.9★</span>
            </div>
          </div>

          {/* Column 2: Navigation links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[#829379] text-xs font-bold uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleScrollTo('services')} className="hover:text-white hover:underline transition-all">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('testimonials')} className="hover:text-white hover:underline transition-all">
                  Client Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('estimator')} className="hover:text-white hover:underline transition-all">
                  Price Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('gallery')} className="hover:text-white hover:underline transition-all">
                  Project Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('contact')} className="hover:text-white hover:underline transition-all">
                  Book Site Visit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact info summary */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#829379] text-xs font-bold uppercase tracking-widest">Get in Touch</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#829379] shrink-0" />
                <a href="tel:01256830024" className="hover:text-white">01256 830024</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#829379] shrink-0" />
                <a href="tel:07788349910" className="hover:text-white">07788 349910</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#829379] shrink-0" />
                <a href="mailto:info@tcfencinglandscaping.co.uk" className="hover:text-white break-all">info@tcfencinglandscaping.co.uk</a>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#829379] shrink-0" />
                <span>Mon-Sat: 8am - 6pm</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Local SEO Coverage List */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#829379] text-xs font-bold uppercase tracking-widest">Our Main Areas</h4>
            <p className="text-[10px] text-[#f4f7f2]/60 font-light leading-relaxed">
              We travel to homeowners in Basingstoke, Winchester, Andover, Fleet, Farnborough, Aldershot, Hook, Oakley, Tadley, Hatch Warren, Chineham, and surrounding Hampshire villages.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-white">
              <ShieldCheck className="w-4 h-4 text-[#829379]" />
              <span className="font-medium text-[10px]">No Travel Surcharges Locally</span>
            </div>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#f4f7f2]/50 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4">
            <span>© {new Date().getFullYear()} TC Fencing & Landscaping. All Rights Reserved.</span>
            <span className="hidden md:inline">|</span>
            <span>Registered Hampshire Landscaping Contractors</span>
          </div>

          <div className="flex space-x-6">
            <span className="text-[10px] text-[#829379] uppercase tracking-wider font-bold">10-Year rot protection guaranteed</span>
            <span className="text-[10px] text-white uppercase tracking-wider font-bold">Checkatrade vetted</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
