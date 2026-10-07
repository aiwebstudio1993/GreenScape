import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import QuoteEstimator from './components/QuoteEstimator';
import Gallery from './components/Gallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('services');
  const [selectedServiceIdForEstimate, setSelectedServiceIdForEstimate] = useState('closeboard-fencing');
  const [prefilledInquiry, setPrefilledInquiry] = useState<{
    serviceType: string;
    details: string;
    minCost: number;
    maxCost: number;
  } | null>(null);

  // Flow: Client clicks "Estimate Price" on a service card
  const handleSelectServiceForEstimate = (serviceId: string) => {
    setSelectedServiceIdForEstimate(serviceId);
    setActiveTab('estimator');
    
    // Smooth scroll to estimator panel
    const element = document.getElementById('estimator');
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

  // Flow: Client finishes online cost calculation, wants to submit formal query
  const handleSendEstimateToContact = (estimateData: {
    serviceType: string;
    details: string;
    minCost: number;
    maxCost: number;
  }) => {
    setPrefilledInquiry(estimateData);
    setActiveTab('contact');

    // Smooth scroll to contact form
    const element = document.getElementById('contact');
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

  // Quick action from header or hero to open Estimator panel
  const handleOpenEstimator = () => {
    setActiveTab('estimator');
    const element = document.getElementById('estimator');
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

  // Quick action to scroll to Testimonials
  const handleOpenTestimonials = () => {
    setActiveTab('testimonials');
    const element = document.getElementById('testimonials');
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

  // Open general contact form
  const handleOpenContact = () => {
    setActiveTab('contact');
    const element = document.getElementById('contact');
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
    <div className="min-h-screen bg-[#f4f7f2] flex flex-col font-sans selection:bg-[#829379]/30 selection:text-[#2d3a27]">
      
      {/* Dynamic Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQuote={handleOpenContact}
      />

      {/* Main Hero Banner Intro */}
      <Hero 
        onOpenEstimator={handleOpenEstimator}
        onOpenTestimonials={handleOpenTestimonials}
      />

      {/* Services Section */}
      <Services onSelectServiceForEstimate={handleSelectServiceForEstimate} />

      {/* Testimonials and Transformations Section */}
      <Testimonials />

      {/* Interactive Estimator cost planner */}
      <QuoteEstimator 
        selectedServiceId={selectedServiceIdForEstimate}
        onSendEstimateToContact={handleSendEstimateToContact}
      />

      {/* Gallery Showcase Section */}
      <Gallery />

      {/* Contact Form and Survey Scheduler */}
      <ContactForm 
        prefilledInquiry={prefilledInquiry}
        onClearPrefilled={() => setPrefilledInquiry(null)}
      />

      {/* Comprehensive Footer */}
      <Footer />

    </div>
  );
}
