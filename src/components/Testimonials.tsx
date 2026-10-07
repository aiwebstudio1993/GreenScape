import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';
import { Star, Quote, MapPin, CheckCircle2, MessageSquare, Plus, X, Upload, Sparkles, Filter } from 'lucide-react';

interface TestimonialsProps {
  // Option to auto-expand form
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    location: '',
    serviceType: 'Closeboard Fencing',
    rating: 5,
    comment: ''
  });
  const [formSuccess, setFormSuccess] = useState(false);

  // Before & After Sliders state
  const [sliderPos1, setSliderPos1] = useState(50); // Review 1 fence slider
  const [sliderPos2, setSliderPos2] = useState(50); // Review 2 patio slider
  const sliderRef1 = useRef<HTMLDivElement>(null);
  const sliderRef2 = useRef<HTMLDivElement>(null);

  // Load testimonials from state/localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tc_landscaping_testimonials');
    if (saved) {
      try {
        setTestimonials(JSON.parse(saved));
      } catch (e) {
        setTestimonials(TESTIMONIALS);
      }
    } else {
      setTestimonials(TESTIMONIALS);
    }
  }, []);

  const handleSliderMove = (e: MouseEvent | TouchEvent, sliderId: 1 | 2) => {
    const ref = sliderId === 1 ? sliderRef1 : sliderRef2;
    const setPos = sliderId === 1 ? setSliderPos1 : setSliderPos2;
    
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(percentage);
  };

  const initSliderDrag = (sliderId: 1 | 2) => {
    const moveHandler = (e: MouseEvent | TouchEvent) => handleSliderMove(e, sliderId);
    const stopHandler = () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', stopHandler);
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', stopHandler);
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', stopHandler);
    window.addEventListener('touchmove', moveHandler);
    window.addEventListener('touchend', stopHandler);
  };

  // Filter types
  const categories = ['all', 'Fencing', 'Patio', 'Decking', 'Turfing'];

  const filteredReviews = testimonials.filter(r => {
    if (filter === 'all') return true;
    return r.serviceType.toLowerCase().includes(filter.toLowerCase());
  });

  // Testimonial stats calculations
  const totalReviews = testimonials.length;
  const averageRating = (testimonials.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

  const starCounts = [0, 0, 0, 0, 0]; // Index 0-4 for 1-5 stars
  testimonials.forEach(r => {
    const idx = Math.floor(r.rating) - 1;
    if (idx >= 0 && idx < 5) starCounts[idx]++;
  });

  // Handle Review submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.location || !newReview.comment) return;

    const addedReview: Testimonial = {
      id: `review-custom-${Date.now()}`,
      author: newReview.author,
      location: newReview.location,
      serviceType: newReview.serviceType,
      date: new Date().toISOString().split('T')[0],
      rating: newReview.rating,
      comment: newReview.comment,
      verified: true
    };

    const updated = [addedReview, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('tc_landscaping_testimonials', JSON.stringify(updated));
    setFormSuccess(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setFormSuccess(false);
      setNewReview({
        author: '',
        location: '',
        serviceType: 'Closeboard Fencing',
        rating: 5,
        comment: ''
      });
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#f4f7f2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#829379] uppercase tracking-[0.2em] text-xs font-bold block">Customer Feedback</span>
          <h2 className="font-sans text-3xl md:text-5xl font-light text-[#2d3a27] leading-tight">
            What Our <span className="font-bold">Clients Say</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#829379] mx-auto"></div>
          <p className="text-[#3d4f35] text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Real reviews from local homeowners in Basingstoke, Winchester, and Reading. Read about our punctuality, neat craftsmanship, and transparent service.
          </p>
        </div>

        {/* STATS OVERVIEW PANEL */}
        <div className="bg-white border border-[#2d3a27]/10 rounded-none p-6 md:p-10 shadow-none mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Big Score */}
          <div className="lg:col-span-3 text-center lg:border-r border-[#2d3a27]/15 lg:pr-8">
            <h3 className="font-sans text-5xl md:text-6xl font-bold text-[#2d3a27]">{averageRating}</h3>
            <div className="flex justify-center text-[#829379] my-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.round(Number(averageRating)) ? 'fill-current' : 'text-gray-200'}`} 
                />
              ))}
            </div>
            <p className="text-xs text-[#3d4f35] font-medium tracking-wider uppercase">Average Score based on {totalReviews} Reviews</p>
            
            {/* Trust badge */}
            <div className="mt-4 inline-flex items-center space-x-1.5 px-3 py-1 bg-[#829379]/10 text-[#2d3a27] rounded-none text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#829379]" />
              <span>100% Verified Members</span>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="lg:col-span-5 space-y-2 lg:px-4">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starCounts[stars - 1];
              const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center text-sm">
                  <span className="w-16 text-xs text-[#3d4f35] font-medium flex items-center uppercase tracking-wider">
                    {stars} Star <Star className="w-3.5 h-3.5 fill-[#829379] text-[#829379] ml-1" />
                  </span>
                  <div className="flex-1 h-2.5 bg-[#f4f7f2] rounded-none mx-3 overflow-hidden">
                    <div 
                      className="h-full bg-[#829379] rounded-none transition-all duration-500" 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs text-[#3d4f35] font-bold">
                    {percent.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA & Summary */}
          <div className="lg:col-span-4 text-center lg:text-left lg:pl-8 space-y-4">
            <h4 className="font-sans text-lg font-bold text-[#2d3a27] uppercase tracking-wider">100% Recommendation Rate</h4>
            <p className="text-xs text-[#3d4f35] leading-relaxed font-light">
              We take tremendous pride in our customer care. Every fence panel, timber frame, and paving stone is aligned with professional care.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-[#2d3a27] hover:bg-[#3d4f35] text-white font-bold text-xs tracking-widest uppercase rounded-none shadow-none flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <Plus className="w-4 h-4 text-[#829379]" />
              <span>Write a Testimonial</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE BEFORE & AFTER SLIDERS */}
        <div className="mb-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-sans text-2xl font-bold uppercase tracking-wide text-[#2d3a27]">See Our Transformations</h3>
            <p className="text-xs text-[#3d4f35] mt-1 font-light">
              Drag the sage slider bar left and right to inspect the quality of our landscaping transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Before After Card 1: Fencing */}
            <div className="bg-white border border-[#2d3a27]/10 rounded-none overflow-hidden p-6 shadow-none">
              <div 
                ref={sliderRef1}
                className="relative h-72 md:h-80 w-full rounded-none overflow-hidden select-none cursor-ew-resize border border-[#2d3a27]/10"
                onMouseDown={() => initSliderDrag(1)}
                onTouchStart={() => initSliderDrag(1)}
              >
                {/* AFTER IMAGE (Background) */}
                <img
                  src="/images/fencing_work_1783790899588.jpg"
                  alt="After Closeboard Fencing"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 right-4 z-20 bg-[#2d3a27] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none">
                  AFTER WORK
                </span>

                {/* BEFORE IMAGE (Foreground clip container) */}
                <div 
                  className="absolute inset-0 z-10 overflow-hidden"
                  style={{ width: `${sliderPos1}%` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1500333186434-756997a01621?auto=format&fit=crop&w=800&q=80"
                    alt="Before Storm Damaged Fence"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: sliderRef1.current?.getBoundingClientRect().width }}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-4 left-4 z-20 bg-red-800 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none">
                    BEFORE: Overgrown & Storm Rotted
                  </span>
                </div>

                {/* SLIDER CONTROLLER LINE */}
                <div 
                  className="absolute top-0 bottom-0 z-30 w-1 bg-[#829379] cursor-ew-resize"
                  style={{ left: `${sliderPos1}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#829379] text-white border-2 border-[#2d3a27] rounded-none shadow-lg flex items-center justify-center font-bold text-sm">
                    ↔
                  </div>
                </div>
              </div>

              {/* Slider description */}
              <div className="mt-4 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#829379]">Closeboard Fencing Replacement — Basingstoke</span>
                <p className="text-xs text-[#3d4f35] font-light mt-1">
                  Replaced an old rotted boundary fence leaning on a collapsing tree. Cleared hedges and installed sturdy pressure-treated timber with concrete posts.
                </p>
              </div>
            </div>

            {/* Before After Card 2: Patio */}
            <div className="bg-white border border-[#2d3a27]/10 rounded-none overflow-hidden p-6 shadow-none">
              <div 
                ref={sliderRef2}
                className="relative h-72 md:h-80 w-full rounded-none overflow-hidden select-none cursor-ew-resize border border-[#2d3a27]/10"
                onMouseDown={() => initSliderDrag(2)}
                onTouchStart={() => initSliderDrag(2)}
              >
                {/* AFTER IMAGE (Background) */}
                <img
                  src="/images/patio_work_1783790912469.jpg"
                  alt="After Indian Sandstone Patio"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 right-4 z-20 bg-[#2d3a27] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none">
                  AFTER WORK
                </span>

                {/* BEFORE IMAGE (Foreground clip container) */}
                <div 
                  className="absolute inset-0 z-10 overflow-hidden"
                  style={{ width: `${sliderPos2}%` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&w=800&q=80"
                    alt="Before Muddy Slope"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: sliderRef2.current?.getBoundingClientRect().width }}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-4 left-4 z-20 bg-red-800 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none">
                    BEFORE: Muddy sloped lawn
                  </span>
                </div>

                {/* SLIDER CONTROLLER LINE */}
                <div 
                  className="absolute top-0 bottom-0 z-30 w-1 bg-[#829379] cursor-ew-resize"
                  style={{ left: `${sliderPos2}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#829379] text-white border-2 border-[#2d3a27] rounded-none shadow-lg flex items-center justify-center font-bold text-sm">
                    ↔
                  </div>
                </div>
              </div>

              {/* Slider description */}
              <div className="mt-4 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#829379]">Indian Sandstone Patio & Excavation — Winchester</span>
                <p className="text-xs text-[#3d4f35] font-light mt-1">
                  Excavated, re-graded, and leveled a steep muddy garden lawn. Created a durable, dual-tier sandstone terrace ideal for seating.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* REVIEWS FILTER BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-[#2d3a27]/10 pb-6 mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-[#2d3a27]">
            <Filter className="w-4 h-4 text-[#829379]" />
            <span className="font-sans font-bold uppercase tracking-widest text-lg">Client Reviews</span>
            <span className="text-xs bg-[#829379]/15 text-[#2d3a27] px-2.5 py-1 rounded-none font-bold">
              {filteredReviews.length} Matches
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-none text-xs font-semibold uppercase tracking-widest transition-all ${
                  filter === cat
                    ? 'bg-[#2d3a27] text-white'
                    : 'bg-white text-[#3d4f35] border border-[#2d3a27]/10 hover:border-[#2d3a27]'
                }`}
              >
                {cat === 'all' ? 'Show All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* LIST OF TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredReviews.map((item: Testimonial) => (
            <div 
              key={item.id}
              className="bg-white border border-[#2d3a27]/10 rounded-none p-6 md:p-8 hover:shadow-md transition-shadow flex flex-col justify-between text-left relative"
            >
              {/* Giant quote background symbol */}
              <Quote className="absolute right-6 top-6 w-16 h-16 text-[#f4f7f2] pointer-events-none fill-current z-0" />

              <div className="space-y-4 relative z-10">
                {/* Header author and star info */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-sans font-bold uppercase tracking-wide text-[#2d3a27] text-base">{item.author}</h4>
                    <span className="text-xs text-[#3d4f35] flex items-center mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#829379] mr-1" />
                      {item.location}
                    </span>
                  </div>
                  <div className="flex text-[#829379]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-gray-100'}`} />
                    ))}
                  </div>
                </div>

                {/* Service Tag */}
                <div className="inline-block bg-[#f4f7f2] border border-[#2d3a27]/10 text-[#3d4f35] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-none">
                  Service: {item.serviceType}
                </div>

                {/* Comment */}
                <p className="text-[#2d3a27] text-sm leading-relaxed font-light italic">
                  "{item.comment}"
                </p>

                {/* Owner Reply */}
                {item.reply && (
                  <div className="bg-[#f4f7f2] border-l-2 border-[#829379] p-4 rounded-none space-y-1.5 mt-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#2d3a27] block">
                      TC Fencing Response:
                    </span>
                    <p className="text-xs text-[#3d4f35] leading-relaxed font-light">
                      {item.reply}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom detail date tag */}
              <div className="mt-6 pt-4 border-t border-[#f4f7f2] text-[10px] text-gray-400 font-medium">
                Review submitted on {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          ))}
        </div>

        {/* WRITE A REVIEW MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white border border-[#2d3a27]/10 rounded-none max-w-lg w-full overflow-hidden shadow-2xl animate-scale-up text-left">
              <div className="bg-[#2d3a27] p-6 text-[#f4f7f2] flex justify-between items-center border-b border-[#829379]/30">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-[#829379]" />
                  <h3 className="font-sans font-bold uppercase tracking-wider text-base">Submit Your Testimonial</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-none text-[#f4f7f2]/80 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#f4f7f2] rounded-none flex items-center justify-center mx-auto text-[#2d3a27]">
                    <Sparkles className="w-8 h-8 text-[#829379] animate-bounce" />
                  </div>
                  <h4 className="font-sans text-2xl font-bold text-[#2d3a27]">Review Saved!</h4>
                  <p className="text-xs text-[#3d4f35] font-light max-w-sm mx-auto">
                    Thank you! Your testimonial has been saved. It is now listed under the reviews section below.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="p-6 md:p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2d3a27] uppercase tracking-wider mb-1.5">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        placeholder="e.g., Jonathan W."
                        className="w-full bg-[#f4f7f2] border border-[#2d3a27]/10 rounded-none p-3 text-sm focus:outline-none focus:border-[#2d3a27]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2d3a27] uppercase tracking-wider mb-1.5">Your Location *</label>
                      <input 
                        type="text" 
                        required
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                        placeholder="e.g., Basingstoke, Hampshire"
                        className="w-full bg-[#f4f7f2] border border-[#2d3a27]/10 rounded-none p-3 text-sm focus:outline-none focus:border-[#2d3a27]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2d3a27] uppercase tracking-wider mb-1.5">Service Received</label>
                      <select 
                        value={newReview.serviceType}
                        onChange={(e) => setNewReview({ ...newReview, serviceType: e.target.value })}
                        className="w-full bg-[#f4f7f2] border border-[#2d3a27]/10 rounded-none p-3 text-sm focus:outline-none focus:border-[#2d3a27]"
                      >
                        <option value="Closeboard Fencing">Closeboard Fencing</option>
                        <option value="Indian Sandstone Patio">Indian Sandstone Patio</option>
                        <option value="Modern Composite Decking">Modern Composite Decking</option>
                        <option value="Lawn Re-Turfing">Lawn Re-Turfing</option>
                        <option value="Bespoke Garden Gate">Bespoke Garden Gate</option>
                        <option value="Complete Garden Clearance">Complete Garden Clearance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2d3a27] uppercase tracking-wider mb-1.5">Overall Rating</label>
                      <div className="flex items-center space-x-1.5 pt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="p-0.5 text-[#829379] focus:outline-none"
                          >
                            <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-current' : 'text-gray-200'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2d3a27] uppercase tracking-wider mb-1.5">Review Comment *</label>
                    <textarea 
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share your experience working with TC Fencing & Landscaping..."
                      className="w-full bg-[#f4f7f2] border border-[#2d3a27]/10 rounded-none p-3 text-sm focus:outline-none focus:border-[#2d3a27] resize-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#3d4f35] uppercase tracking-wider hover:text-[#2d3a27]"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-3 bg-[#829379] hover:bg-[#92a389] text-white font-bold text-xs tracking-wider uppercase rounded-none transition-all"
                    >
                      Post Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
