
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-smart-navy/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="safe-zone">
        <div className="flex items-center justify-between py-4">
          <Logo 
            showText={!isMobile} 
            size={isMobile ? 'sm' : 'md'} 
            className="cursor-pointer"
            onClick={() => scrollToSection('hero')}
          />
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => scrollToSection('demo')}
              className="bg-smart-cyan hover:bg-smart-gold text-white font-montserrat font-semibold px-6 py-2 transition-all duration-300 transform hover:scale-105"
            >
              Watch Demo
            </Button>
            
            <Button
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-smart-gold text-smart-gold hover:bg-smart-gold hover:text-smart-navy font-montserrat font-semibold px-6 py-2 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
