import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, ShieldCheck, MapPin, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { LOCAL_AREAS } from '../data';

interface ContactFormProps {
  prefilledInquiry?: {
    serviceType: string;
    details: string;
    minCost: number;
    maxCost: number;
  } | null;
  onClearPrefilled: () => void;
}

export default function ContactForm({ prefilledInquiry, onClearPrefilled }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    serviceType: 'Closeboard Fencing',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Apply prefilled calculations from Quote Estimator
  useEffect(() => {
    if (prefilledInquiry) {
      setFormData(prev => ({
        ...prev,
        serviceType: prefilledInquiry.serviceType,
        message: `Hello! I used your online estimator and calculated a guide range of £${prefilledInquiry.minCost} - £${prefilledInquiry.maxCost} for this project.\n\nProject details:\n${prefilledInquiry.details}\n\nI would like to book a free no-obligation site survey to verify measurements and receive a formal quote.`
      }));
    }
  }, [prefilledInquiry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.location) return;

    // Simulate submission
    const tid = 'TC-' + Math.floor(100000 + Math.random() * 900000);
    setTicketId(tid);
    setIsSubmitted(true);
    
    // Save lead in localStorage for trace/admin logs
    const existingLeads = JSON.parse(localStorage.getItem('tc_landscaping_leads') || '[]');
    existingLeads.push({
      id: tid,
      date: new Date().toISOString(),
      ...formData,
      estimateRef: prefilledInquiry ? {
        min: prefilledInquiry.minCost,
        max: prefilledInquiry.maxCost
      } : null
    });
    localStorage.setItem('tc_landscaping_leads', JSON.stringify(existingLeads));

    // Clear estimator state in App
    onClearPrefilled();
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      location: '',
      serviceType: 'Closeboard Fencing',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-[#2d3a27]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#829379] uppercase tracking-[0.2em] text-xs font-bold block">Contact & Survey</span>
          <h2 className="font-sans text-3xl md:text-5xl font-light text-[#2d3a27] leading-tight">
            Book a Free <span className="font-bold">Site Survey & Quote</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#829379] mx-auto"></div>
          <p className="text-[#3d4f35] text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Fill out our quick form below to request a site visit. We will measure the ground, verify levels, and supply a detailed written contract quotation.
          </p>
        </div>

        {/* Outer Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Quick info column */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div className="bg-[#f4f7f2] border border-[#2d3a27]/10 rounded-none p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#829379]/5 pointer-events-none" />

              <h3 className="font-sans font-bold uppercase tracking-wider text-sm text-[#2d3a27] pb-4 border-b border-[#2d3a27]/10">
                Contact Details
              </h3>

              <div className="space-y-4">
                <a href="tel:01214960738" className="flex items-start space-x-4 group">
                  <div className="p-3 bg-[#2d3a27] text-white rounded-none border border-white/10 group-hover:bg-[#829379] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#3d4f35] block tracking-wider">Call Landline</span>
                    <span className="font-sans font-bold text-[#2d3a27] text-base">0121 496 0738</span>
                    <span className="text-[10px] text-gray-400 block">Fastest for booking slot</span>
                  </div>
                </a>

                <a href="tel:07788349910" className="flex items-start space-x-4 group">
                  <div className="p-3 bg-[#2d3a27] text-white rounded-none border border-white/10 group-hover:bg-[#829379] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#3d4f35] block tracking-wider">Mobile / WhatsApp</span>
                    <span className="font-sans font-bold text-[#2d3a27] text-base">07788 349910</span>
                  </div>
                </a>

                <a href="mailto:hello@greenscape-staffs.co.uk" className="flex items-start space-x-4 group">
                  <div className="p-3 bg-[#2d3a27] text-white rounded-none border border-white/10 group-hover:bg-[#829379] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#3d4f35] block tracking-wider">Email Inquiry</span>
                    <span className="text-sm font-semibold text-[#2d3a27] break-all">hello@greenscape-staffs.co.uk</span>
                  </div>
                </a>
              </div>

              <div className="pt-6 border-t border-[#2d3a27]/10 space-y-3 text-xs text-[#3d4f35]">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#829379] shrink-0" />
                  <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#829379] shrink-0" />
                  <span>Fully Vetted & Insured up to £5m</span>
                </div>
              </div>
            </div>

            {/* Coverage Areas Panel */}
            <div className="bg-[#2d3a27] border border-white/10 rounded-none p-8 text-[#f4f7f2]">
              <h3 className="font-sans font-bold uppercase tracking-wider text-base mb-4 text-white flex items-center">
                <MapPin className="w-5 h-5 text-[#829379] mr-2" /> Coverage Regions
              </h3>
              <p className="text-xs text-[#f4f7f2]/75 mb-4 font-light leading-relaxed">
                We proudly serve residential gardens within a 25-mile radius of Lichfield, including:
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {LOCAL_AREAS.map((area) => (
                  <span key={area} className="text-[10px] font-mono bg-white/5 border border-white/10 rounded-none px-2 py-0.5 whitespace-nowrap">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-8">
            <div className="bg-[#f4f7f2] border border-[#2d3a27]/10 rounded-none p-6 md:p-10 shadow-none text-left">
              
              {isSubmitted ? (
                /* Success State */
                <div className="py-12 px-4 text-center space-y-6">
                  <div className="w-16 h-16 bg-white text-[#2d3a27] rounded-none flex items-center justify-center mx-auto border border-[#2d3a27]/10">
                    <CheckCircle2 className="w-8 h-8 text-[#829379]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-sans text-2xl font-bold uppercase tracking-wide text-[#2d3a27]">Inquiry Received!</h3>
                    <p className="text-xs text-gray-400 font-mono">Reference Ticket: {ticketId}</p>
                    <p className="text-sm text-[#3d4f35] font-light max-w-md mx-auto leading-relaxed">
                      Thank you for contacting GreenScape Landscaping, <strong>{formData.name}</strong>. Our team has received your details and we will call you back within 24 working hours to arrange your free site survey.
                    </p>
                  </div>

                  <div className="pt-4 max-w-sm mx-auto">
                    <button
                      onClick={handleResetForm}
                      className="w-full py-3 bg-[#2d3a27] hover:bg-[#3d4f35] text-white font-bold text-xs tracking-widest uppercase rounded-none transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {prefilledInquiry && (
                    <div className="bg-white border border-[#829379]/30 rounded-none p-4 flex items-start justify-between">
                      <div className="flex items-start space-x-3 text-left">
                        <Sparkles className="w-5 h-5 text-[#829379] shrink-0 mt-0.5 animate-pulse" />
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#2d3a27] block">Estimator Values Loaded!</span>
                          <p className="text-xs text-[#3d4f35] font-light">
                            Prefilled details for {prefilledInquiry.serviceType} (£{prefilledInquiry.minCost} - £{prefilledInquiry.maxCost}). Feel free to tweak before sending.
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={onClearPrefilled}
                        className="text-xs text-red-700 hover:underline font-bold"
                      >
                        Clear
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-[#2d3a27] uppercase tracking-widest mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Robert Smith"
                        className="w-full bg-white border border-[#2d3a27]/10 rounded-none p-3.5 text-sm focus:outline-none focus:border-[#2d3a27]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#2d3a27] uppercase tracking-widest mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. 0121 496 0738"
                        className="w-full bg-white border border-[#2d3a27]/10 rounded-none p-3.5 text-sm focus:outline-none focus:border-[#2d3a27]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-[#2d3a27] uppercase tracking-widest mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. robert@gmail.com"
                        className="w-full bg-white border border-[#2d3a27]/10 rounded-none p-3.5 text-sm focus:outline-none focus:border-[#2d3a27]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#2d3a27] uppercase tracking-widest mb-2">Your Location *</label>
                      <select
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-[#2d3a27]/10 rounded-none p-3.5 text-sm focus:outline-none focus:border-[#2d3a27]"
                      >
                        <option value="">-- Select Your Area --</option>
                        {LOCAL_AREAS.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                        <option value="Other Staffordshire">Other Staffordshire Location</option>
                        <option value="Other West Midlands">Other West Midlands Location</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2d3a27] uppercase tracking-widest mb-2">Service Required</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#2d3a27]/10 rounded-none p-3.5 text-sm focus:outline-none focus:border-[#2d3a27]"
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
                    <label className="block text-[10px] font-bold text-[#2d3a27] uppercase tracking-widest mb-2">Your Message / Project Details *</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please share details about your garden project..."
                      className="w-full bg-white border border-[#2d3a27]/10 rounded-none p-3.5 text-sm focus:outline-none focus:border-[#2d3a27] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-between items-center flex-wrap gap-4">
                    <span className="text-[10px] text-[#3d4f35] font-light flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#829379] mr-1.5" /> GDPR Compliant. Your personal details are strictly private.
                    </span>
                    
                    <button
                      type="submit"
                      className="px-8 py-4 bg-[#2d3a27] hover:bg-[#3d4f35] text-white font-bold text-xs tracking-widest uppercase rounded-none transition-all duration-300"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Survey Request</span>
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
