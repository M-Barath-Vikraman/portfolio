import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav on load
    gsap.from('.nav-item', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.5,
      ease: 'power3.out'
    });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Opening animation
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
      gsap.from('.mobile-nav-item', {
        opacity: 0,
        x: 50,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power3.out'
      });
    } else {
      // Closing animation
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.4,
        ease: 'power3.inOut'
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    if (isOpen) {
      // Close mobile menu with animation
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.4,
        ease: 'power3.inOut'
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-xl' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="nav-item">
              <h1 className="text-2xl font-bold text-glow-primary">BV</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="nav-item relative text-foreground hover:text-primary transition-colors duration-300 capitalize group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="nav-item glass px-6 py-2 rounded-full text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-glow"
              >
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-dark backdrop-blur-xl z-50 transform translate-x-full ${
        isOpen ? '' : 'pointer-events-none'
      }`}>
        <div className="p-6">
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMenu}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="mobile-nav-item block w-full text-left text-2xl font-medium text-foreground hover:text-primary transition-colors capitalize"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mobile-nav-item w-full glass px-6 py-3 rounded-full text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
};