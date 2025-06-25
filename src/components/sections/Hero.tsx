
import React from 'react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '../VideoPlayer';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-beauty-purple to-beauty-pink relative overflow-hidden">
      <div className="safe-zone relative z-10">
        <div className="pt-32 pb-20">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="font-montserrat font-bold text-white mb-6 leading-tight">
              <span className="block text-3xl md:text-5xl lg:text-6xl">
                <span className="md:hidden">Smart Leads AI</span>
                <span className="hidden md:block">Smart <span className="text-beauty-lavender">Leads</span> AI</span>
              </span>
              <span className="block text-2xl md:text-4xl lg:text-5xl mt-2 text-beauty-lavender">
                AI Agents for Beauty Businesses
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Automate your customer conversations with AI agents that sound exactly like you. 
              Perfect for hair salons, nail bars, spas, and aesthetic clinics.
            </p>
          </div>

          {/* Video Container */}
          <div className="mb-12">
            <VideoPlayer
              src="/ai-demo.mp4"
              poster="/beauty-hero.jpg"
              className="mx-auto"
            />
          </div>

          {/* Subtext and CTAs */}
          <div className="text-center">
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              24/7 automated booking, customer support, and lead qualification. 
              Your AI agent learns your voice and handles conversations just like you would.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => scrollToSection('demo')}
                size="lg"
                className="bg-beauty-lavender hover:bg-beauty-purple text-white font-montserrat font-bold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                Watch Live Demo
              </Button>
              
              <Button
                onClick={() => scrollToSection('pricing')}
                variant="outline"
                size="lg"
                className="border-2 border-beauty-lavender text-beauty-lavender hover:bg-beauty-lavender hover:text-white font-montserrat font-bold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-circle absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-beauty-lavender/20 to-beauty-pink/20 rounded-full"></div>
        <div className="floating-circle absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-beauty-pink/20 to-beauty-lavender/20 rounded-full" style={{ animationDelay: '-2s' }}></div>
        <div className="floating-circle absolute bottom-1/3 left-1/6 w-20 h-20 bg-gradient-to-br from-beauty-purple/40 to-beauty-lavender/40 rounded-full" style={{ animationDelay: '-4s' }}></div>
      </div>
    </section>
  );
};

export default Hero;
