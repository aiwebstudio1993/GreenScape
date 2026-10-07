import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, Star, ShieldCheck, Clock } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenQuote }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'services', label: 'Our Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'estimator', label: 'Quote Estimator' },
    { id: 'gallery', label: 'Project Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to target section if on home, or just let App handle it
    const element = document.getElementById(tabId);
    if (element) {
      const offset = 90; // Header height
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top bar */}
      <div className="bg-[#2d3a27] text-[#f4f7f2]/90 text-xs py-2 px-4 border-b border-[#3d4f35] hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-[#829379]">
              <MapPin className="w-3.5 h-3.5 mr-1.5" />
              Serving Hampshire & Berkshire (Basingstoke, Winchester, Reading, Fleet)
            </span>
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-[#a3b29c]" />
              Mon - Sat: 8:00 AM - 6:00 PM
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="tel:01256830024" className="flex items-center hover:text-[#829379] transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              01256 830024
            </a>
            <a href="mailto:info@tcfencinglandscaping.co.uk" className="flex items-center hover:text-[#829379] transition-colors">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              info@tcfencinglandscaping.co.uk
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-white py-4'
      } border-b border-[#2d3a27]/10`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-[#2d3a27] flex items-center justify-center shrink-0">
              <div className="w-4 h-4 border-2 border-white rotate-45"></div>
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-sans text-lg md:text-xl font-bold text-[#2d3a27] tracking-tight">TC</span>
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-[#829379] ml-2 mt-1">Fencing & Landscaping</span>
              </div>
              <div className="flex items-center space-x-1 mt-0.5">
                <div className="flex text-[#829379]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-current" />
                  ))}
                </div>
                <span className="text-[9px] text-[#2d3a27]/70 font-semibold tracking-wider uppercase">Checkatrade Approved 9.9★</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 rounded-none ${
                    isActive
                      ? 'text-[#2d3a27] border-b-2 border-[#2d3a27] pb-1'
                      : 'text-[#2d3a27]/70 hover:text-[#2d3a27] pb-1'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onOpenQuote}
              className="px-6 py-2.5 bg-[#2d3a27] text-white hover:bg-[#3d4f35] font-bold text-xs tracking-widest uppercase rounded-none transition-all duration-300"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <a href="tel:01256830024" className="p-2 bg-[#2d3a27]/10 rounded-none text-[#2d3a27] hover:bg-[#2d3a27]/20">
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-[#2d3a27]/10 rounded-none text-[#2d3a27] hover:bg-[#2d3a27]/20"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#2d3a27]/10 py-4 px-6 space-y-4 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-3 px-4 text-left font-semibold text-xs uppercase tracking-wider rounded-none transition-all ${
                  activeTab === item.id
                    ? 'text-white bg-[#2d3a27]'
                    : 'text-[#2d3a27]/80 hover:bg-[#2d3a27]/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#2d3a27]/10 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 bg-[#2d3a27] text-white font-bold text-center text-xs tracking-wider uppercase rounded-none block"
            >
              Get Free Quote
            </button>
            <div className="text-center text-xs text-[#2d3a27]/70 pt-2 flex flex-col space-y-1 font-semibold tracking-wider uppercase">
              <span className="flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-[#829379]" /> Basingstoke & local areas
              </span>
              <span>📞 01256 830024</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
