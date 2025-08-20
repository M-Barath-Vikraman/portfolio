import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'phosphor-react';

export const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2 }); // Increased delay to let background load

    // Main content animation - simplified for background layout
    tl.from('.hero-title', {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-cta', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Background fade-in animation
    gsap.from('.spline-background', {
      opacity: 0,
      duration: 2,
      ease: 'power2.out'
    });

    // Floating orbs animation
    gsap.to('.hero-orb', {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.5,
        from: 'random'
      }
    });

    // CTA button hover animation setup
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Spline 3D Background - Full Screen */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/aibrain-bBtN1GxxJvol5dw1xMSk5TaF/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
          style={{ minHeight: '100vh' }}
        ></iframe>
        
        {/* Overlay to hide Spline watermark */}
        <div className="spline-overlay"></div>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60"></div>
      </div>

      {/* Background Elements - kept for additional ambiance */}
      <div className="absolute inset-0 z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        
        {/* Floating orbs - made more subtle */}
        <div className="hero-orb absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="hero-orb absolute top-1/3 right-1/4 w-24 h-24 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="hero-orb absolute bottom-1/4 left-1/3 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content - Centered and overlaid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <div className="hero-title">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block text-glow-primary bg-gradient-primary bg-clip-text text-transparent">
                Barath Vikraman
              </span>
              <span className="block text-3xl md:text-5xl text-muted-foreground font-normal mt-4">
                Web Developer
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="hero-subtitle">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={scrollToProjects}
              className="cta-button group bg-gradient-primary hover:shadow-glow px-8 py-4 rounded-full text-primary-foreground font-medium transition-all duration-300 flex items-center gap-2 justify-center"
            >
              View My Work
              <ArrowRight 
                size={20} 
                className="group-hover:translate-x-1 transition-transform duration-300" 
              />
            </button>
            
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="glass border border-primary/30 hover:bg-primary/10 px-8 py-4 rounded-full text-primary font-medium transition-all duration-300 hover:scale-105 backdrop-blur-md"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};