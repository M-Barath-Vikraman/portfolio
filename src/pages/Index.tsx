import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Ensure content becomes visible after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      setContentVisible(true);
      document.body.classList.add('loaded');
    }, 2000); // Give more time for loading

    // Fallback to ensure content is always visible
    const fallbackTimer = setTimeout(() => {
      console.log('Fallback: Making content visible');
      setIsLoading(false);
      setContentVisible(true);
      document.body.classList.add('loaded');
      
      // Force visibility
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.filter = 'none';
        mainElement.style.opacity = '1';
        mainElement.style.transform = 'none';
      }
    }, 4000); // Fallback after 4 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setContentVisible(true);
    document.body.classList.add('loaded');
    
    // Force content to be visible
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.style.filter = 'none';
      mainElement.style.opacity = '1';
      mainElement.style.transform = 'none';
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative">
      <Navigation />
      <main 
        className={`transition-all duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          filter: contentVisible ? 'none' : 'blur(10px)',
          transform: contentVisible ? 'none' : 'scale(1.05)'
        }}
      >
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
