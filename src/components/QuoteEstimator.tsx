import React, { useState, useEffect } from 'react';
import { SERVICES } from '../data';
import { Sparkles, Calculator, Ruler, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

interface QuoteEstimatorProps {
  selectedServiceId: string;
  onSendEstimateToContact: (estimateData: {
    serviceType: string;
    details: string;
    minCost: number;
    maxCost: number;
  }) => void;
}

export default function QuoteEstimator({ selectedServiceId, onSendEstimateToContact }: QuoteEstimatorProps) {
  const [serviceId, setServiceId] = useState('closeboard-fencing');
  
  // Dimensions state
  const [length, setLength] = useState(15); // for fencing
  const [area, setArea] = useState(25); // for patios/decking/turfing
  const [quantity, setQuantity] = useState(1); // for gates

  // Material & options state
  const [postType, setPostType] = useState<'timber' | 'concrete'>('concrete');
  const [fenceHeight, setFenceHeight] = useState<'4ft' | '5ft' | '6ft'>('6ft');
  
  const [pavingType, setPavingType] = useState<'sandstone' | 'porcelain' | 'block'>('porcelain');
  const [deckType, setDeckType] = useState<'timber' | 'composite'>('composite');
  const [turfType, setTurfType] = useState<'natural' | 'artificial'>('natural');
  const [gateStyle, setGateStyle] = useState<'single' | 'double'>('single');

  // Sync selectedServiceId from outer component when clicked "Estimate Price" from services tab
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
      // Automatically adjust selector to matching type
    }
  }, [selectedServiceId]);

  const activeService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];

  // Dynamic calculations
  const calculateCosts = () => {
    let basePrice = activeService.basePricePerUnit;
    let factor = 1.0;
    let addOnCost = 0;

    // Fencing customizations
    if (activeService.category === 'fencing') {
      if (postType === 'concrete') factor += 0.15; // Concrete is sturdier, more expensive
      if (fenceHeight === '5ft') factor += 0.05;
      if (fenceHeight === '6ft') factor += 0.12;
      
      const pricePerMeter = basePrice * factor;
      const totalBase = pricePerMeter * length;
      const min = Math.round(totalBase * 0.9);
      const max = Math.round(totalBase * 1.1);
      return { min, max, unitQty: length, unitLbl: 'meters' };
    }

    // Patios customizations
    if (activeService.category === 'patios') {
      if (pavingType === 'sandstone') factor = 0.95; // Indian Sandstone base
      if (pavingType === 'porcelain') factor = 1.25; // Premium porcelain paving
      if (pavingType === 'block') factor = 0.85; // Block paving is cheaper
      
      const pricePerSqm = basePrice * factor;
      const totalBase = pricePerSqm * area;
      const min = Math.round(totalBase * 0.92);
      const max = Math.round(totalBase * 1.08);
      return { min, max, unitQty: area, unitLbl: 'sqm' };
    }

    // Decking customizations
    if (activeService.category === 'decking') {
      if (deckType === 'timber') factor = 0.8;
      if (deckType === 'composite') factor = 1.35; // Premium composite deck
      
      const pricePerSqm = basePrice * factor;
      const totalBase = pricePerSqm * area;
      const min = Math.round(totalBase * 0.9);
      const max = Math.round(totalBase * 1.12);
      return { min, max, unitQty: area, unitLbl: 'sqm' };
    }

    // Landscaping customizations
    if (activeService.category === 'landscaping') {
      if (turfType === 'natural') factor = 0.75; // Turf lawn
      if (turfType === 'artificial') factor = 2.2; // Premium artificial grass has drainage, sand layers, high labor
      
      const pricePerSqm = basePrice * factor;
      const totalBase = pricePerSqm * area;
      const min = Math.round(totalBase * 0.93);
      const max = Math.round(totalBase * 1.07);
      return { min, max, unitQty: area, unitLbl: 'sqm' };
    }

    // Gates customizations
    if (activeService.category === 'gates') {
      if (gateStyle === 'single') {
        addOnCost = 0;
      } else {
        addOnCost = 280; // Double gate frame surcharge
      }
      const totalBase = (basePrice + addOnCost) * quantity;
      const min = Math.round(totalBase * 0.95);
      const max = Math.round(totalBase * 1.05);
      return { min, max, unitQty: quantity, unitLbl: 'gate(s)' };
    }

    return { min: 200, max: 300, unitQty: 0, unitLbl: '' };
  };

  const { min, max, unitQty, unitLbl } = calculateCosts();

  const handleSendRequest = () => {
    let detailsStr = '';
    if (activeService.category === 'fencing') {
      detailsStr = `Fencing: ${length} meters of closeboard fencing (${fenceHeight} height) using ${postType} posts.`;
    } else if (activeService.category === 'patios') {
      detailsStr = `Patios: ${area} sqm patio laid with ${pavingType === 'sandstone' ? 'Indian Sandstone' : pavingType === 'porcelain' ? 'Premium Porcelain' : 'Block Paving'}.`;
    } else if (activeService.category === 'decking') {
      detailsStr = `Decking: ${area} sqm deck using ${deckType === 'timber' ? 'Scandinavian Redwood Timber' : 'High-density Composite Decking'}.`;
    } else if (activeService.category === 'landscaping') {
      detailsStr = `Landscaping: ${area} sqm cover of ${turfType === 'natural' ? 'Fresh cultivated natural Turf' : 'Child & Pet Friendly Artificial Grass'}.`;
    } else if (activeService.category === 'gates') {
      detailsStr = `Gates: ${quantity} ${gateStyle === 'single' ? 'Single side garden gate' : 'Double matching driveway gates'}.`;
    }

    onSendEstimateToContact({
      serviceType: activeService.title,
      details: detailsStr,
      minCost: min,
      maxCost: max
    });
  };

  return (
    <section id="estimator" className="py-24 bg-[#f4f7f2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[#829379] uppercase tracking-[0.2em] text-xs font-bold block">Instant Price Guide</span>
          <h2 className="font-sans text-3xl md:text-5xl font-light text-[#2d3a27] leading-tight">
            Interactive Cost <span className="font-bold">Range Calculator</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#829379] mx-auto"></div>
          <p className="text-[#3d4f35] text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Select a service, customize your options, and adjust dimensions to calculate a real-world, honest labor and materials estimate.
          </p>
        </div>

        {/* CALCULATOR PANEL */}
        <div className="bg-white border border-[#2d3a27]/10 rounded-none overflow-hidden shadow-none grid grid-cols-1 lg:grid-cols-12">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 p-6 md:p-10 text-left space-y-8">
            
            {/* Service select row */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#2d3a27] uppercase tracking-widest">Select Garden Service</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setServiceId(srv.id)}
                    className={`px-4 py-3 rounded-none border text-xs font-bold uppercase tracking-wider text-center transition-all ${
                      serviceId === srv.id
                        ? 'bg-[#2d3a27] text-[#f4f7f2] border-[#2d3a27]'
                        : 'bg-[#f4f7f2] text-[#3d4f35] border-[#2d3a27]/10 hover:border-[#2d3a27] hover:text-[#2d3a27]'
                    }`}
                  >
                    {srv.title.split(' ').slice(1).join(' ') || srv.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Dimensions based on type */}
            <div className="space-y-6 pt-4 border-t border-[#f4f7f2]">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-[#2d3a27] uppercase tracking-widest flex items-center">
                  <Ruler className="w-4 h-4 text-[#829379] mr-1.5" />
                  Specify Project Dimensions
                </span>
                <span className="bg-[#f4f7f2] text-[#2d3a27] border border-[#2d3a27]/15 font-mono text-xs font-bold px-3 py-1.5 rounded-none">
                  {activeService.category === 'fencing' && `${length} Linear Meters`}
                  {(activeService.category === 'patios' || activeService.category === 'decking' || activeService.category === 'landscaping') && `${area} Sq. Meters (m²)`}
                  {activeService.category === 'gates' && `${quantity} Gate(s)`}
                </span>
              </div>

              {/* Fencing slider */}
              {activeService.category === 'fencing' && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min="3"
                    max="80"
                    step="1"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-none appearance-none cursor-pointer accent-[#829379]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>Min: 3m (Small garden/side gap)</span>
                    <span>Max: 80m (Large boundary perimeter)</span>
                  </div>
                </div>
              )}

              {/* Area slider for Decking, Patio, Turfing */}
              {(activeService.category === 'patios' || activeService.category === 'decking' || activeService.category === 'landscaping') && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="1"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-none appearance-none cursor-pointer accent-[#829379]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>Min: 5m² (Bistro nook/side patio)</span>
                    <span>Max: 120m² (Expansive entertainment zone)</span>
                  </div>
                </div>
              )}

              {/* Gate quantity stepper */}
              {activeService.category === 'gates' && (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-[#2d3a27]/15 bg-white font-bold text-lg rounded-none text-[#2d3a27] hover:bg-[#2d3a27] hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-sans font-bold text-xl w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    className="w-10 h-10 border border-[#2d3a27]/15 bg-white font-bold text-lg rounded-none text-[#2d3a27] hover:bg-[#2d3a27] hover:text-white transition-colors"
                  >
                    +
                  </button>
                  <span className="text-xs text-[#3d4f35] font-light">(Up to 5 gates per residential contract)</span>
                </div>
              )}
            </div>

            {/* Custom Options selection based on service */}
            <div className="space-y-4 pt-4 border-t border-[#f4f7f2]">
              <label className="block text-xs font-semibold text-[#2d3a27] uppercase tracking-widest">Customize Materials & Specifications</label>

              {/* Fencing Options */}
              {activeService.category === 'fencing' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs text-[#3d4f35] uppercase tracking-wider font-semibold">Post Material Type</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPostType('timber')}
                        className={`py-2 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                          postType === 'timber' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                        }`}
                      >
                        Timber Posts
                      </button>
                      <button
                        onClick={() => setPostType('concrete')}
                        className={`py-2 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                          postType === 'concrete' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                        }`}
                      >
                        Concrete Posts
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs text-[#3d4f35] uppercase tracking-wider font-semibold">Fence Panel Height</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['4ft', '5ft', '6ft'].map((ht) => (
                        <button
                          key={ht}
                          onClick={() => setFenceHeight(ht as any)}
                          className={`py-2 px-1 rounded-none border text-xs font-bold uppercase tracking-wider ${
                            fenceHeight === ht ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                          }`}
                        >
                          {ht} Panel
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Patio Options */}
              {activeService.category === 'patios' && (
                <div className="space-y-1.5">
                  <span className="text-xs text-[#3d4f35] uppercase tracking-wider font-semibold">Select Paving Medium</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPavingType('sandstone')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        pavingType === 'sandstone' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Indian Sandstone
                    </button>
                    <button
                      onClick={() => setPavingType('porcelain')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        pavingType === 'porcelain' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Italian Porcelain
                    </button>
                    <button
                      onClick={() => setPavingType('block')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        pavingType === 'block' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Block Paving
                    </button>
                  </div>
                </div>
              )}

              {/* Decking Options */}
              {activeService.category === 'decking' && (
                <div className="space-y-1.5">
                  <span className="text-xs text-[#3d4f35] uppercase tracking-wider font-semibold">Select Decking Plank Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDeckType('timber')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        deckType === 'timber' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Scandic Red Timber
                    </button>
                    <button
                      onClick={() => setDeckType('composite')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        deckType === 'composite' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Premium Composite
                    </button>
                  </div>
                </div>
              )}

              {/* Landscaping Options */}
              {activeService.category === 'landscaping' && (
                <div className="space-y-1.5">
                  <span className="text-xs text-[#3d4f35] uppercase tracking-wider font-semibold">Select Lawn Covering</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTurfType('natural')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        turfType === 'natural' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Cultivated Lawn Turf
                    </button>
                    <button
                      onClick={() => setTurfType('artificial')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        turfType === 'artificial' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Artificial Grass
                    </button>
                  </div>
                </div>
              )}

              {/* Gates Options */}
              {activeService.category === 'gates' && (
                <div className="space-y-1.5">
                  <span className="text-xs text-[#3d4f35] uppercase tracking-wider font-semibold">Gate Style Structure</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setGateStyle('single')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        gateStyle === 'single' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Single Pedestrian Gate
                    </button>
                    <button
                      onClick={() => setGateStyle('double')}
                      className={`py-2.5 px-3 rounded-none border text-xs font-bold uppercase tracking-wider ${
                        gateStyle === 'double' ? 'bg-[#829379]/15 border-[#829379] text-[#2d3a27]' : 'bg-white border-[#2d3a27]/10 text-[#3d4f35]'
                      }`}
                    >
                      Double Driveway Gates
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-[#2d3a27] text-[#f4f7f2] p-6 md:p-10 flex flex-col justify-between text-left border-l border-white/10">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-white/15">
                <Calculator className="w-5 h-5 text-[#829379]" />
                <h4 className="font-sans font-bold uppercase tracking-wider text-base text-white">Estimated Cost Range</h4>
              </div>

              {/* Large Price Range Display */}
              <div className="space-y-1.5 py-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#829379]">Project Cost Range Estimate</span>
                <div className="font-sans text-3xl md:text-4xl font-bold text-white tracking-tight flex items-baseline">
                  £{min.toLocaleString()} <span className="mx-2 text-[#829379] text-xl font-light">to</span> £{max.toLocaleString()}
                </div>
                <p className="text-[10px] text-[#f4f7f2]/65 italic">
                  *Estimate includes fully treated high-grade materials, structural fixings, ground preparation, waste bags, and professional tradesperson labor.
                </p>
              </div>

              {/* Cost breakdown checklist */}
              <div className="space-y-3 pt-4 border-t border-white/15 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#829379] block mb-2">Estimate Inclusions</span>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#829379] shrink-0 mt-0.5" />
                  <span className="font-light">Pressure-treated timber & premium aggregate sub-base materials</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#829379] shrink-0 mt-0.5" />
                  <span className="font-light">Full excavation, weed barrier laying & heavy-duty leveling labor</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#829379] shrink-0 mt-0.5" />
                  <span className="font-light">Disposal of rotted timber / excavated soil in professional skips</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#829379] shrink-0 mt-0.5" />
                  <span className="font-light">Post-project clean down & 10-year structural integrity guarantee</span>
                </div>
              </div>
            </div>

            {/* Quote Action button */}
            <div className="pt-8 border-t border-white/15 mt-8 space-y-3">
              <button
                onClick={handleSendRequest}
                className="w-full py-4 bg-[#829379] text-white hover:bg-[#92a389] font-bold text-xs tracking-widest uppercase rounded-none transition-all shadow-none flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Submit Specs For Free Survey</span>
              </button>
              
              <div className="flex items-center space-x-2 justify-center text-[10px] text-[#f4f7f2]/60 pt-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#829379] shrink-0" />
                <span>Final price depends on soil layout, slope, and access hurdles.</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
