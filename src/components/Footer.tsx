import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Copyright } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  useEffect(() => {
    // Footer animation
    gsap.fromTo('.footer-content', 
      {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-section',
          start: 'top 90%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.5,
        from: 'random'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section relative bg-gradient-to-t from-card to-background border-t border-border/30">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="footer-particle absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full blur-sm"></div>
        <div className="footer-particle absolute top-1/3 right-1/3 w-3 h-3 bg-secondary/30 rounded-full blur-sm"></div>
        <div className="footer-particle absolute bottom-1/4 left-1/2 w-2 h-2 bg-accent/30 rounded-full blur-sm"></div>
        <div className="footer-particle absolute top-1/2 right-1/4 w-4 h-4 bg-primary/20 rounded-full blur-md"></div>
      </div>

      <div className="footer-content relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-glow-primary">BV</h3>
            <p className="text-muted-foreground max-w-xs leading-relaxed">
              Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-300 capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Let's Connect</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Ready to bring your ideas to life?
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors duration-300"
              >
                Get in touch
                <span className="text-sm">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Copyright size={16} />
            <span>2024 Barath Vikraman. Made with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>and lots of coffee.</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="glass px-4 py-2 rounded-full text-primary border border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:scale-105 text-sm"
          >
            Back to Top ↑
          </button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
    </footer>
  );
};