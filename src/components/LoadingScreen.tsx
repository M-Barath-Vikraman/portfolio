import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the loading text
    tl.from('.loading-text', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out'
    });

    // Animate progress bar with shorter duration for faster loading
    const progressAnimation = gsap.to('.progress-fill', {
      width: '100%',
      duration: 1.5, // Reduced from 2.5s
      ease: 'power2.inOut',
      onUpdate: function() {
        const progressValue = Math.round(this.progress() * 100);
        setProgress(progressValue);
      },
      onComplete: () => {
        // Wait a brief moment, then fade out
        gsap.to('.preloader', {
          opacity: 0,
          scale: 0.95,
          duration: 0.5, // Faster fade
          ease: 'power2.inOut',
          delay: 0.2, // Shorter delay
          onComplete: () => {
            console.log('Loading screen completed'); // Debug log
            onComplete();
          }
        });
      }
    });

    // Floating orbs animation
    gsap.to('.floating-orb', {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3
    });

    return () => {
      tl.kill();
      progressAnimation.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 bg-gradient-dark flex items-center justify-center">
      {/* Floating background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
        <div className="floating-orb absolute top-1/3 right-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
        <div className="floating-orb absolute bottom-1/4 left-1/3 w-40 h-40 bg-accent/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Main loading text */}
        <div className="loading-text mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-glow-primary mb-4">
            Barath
          </h1>
          <p className="text-xl text-muted-foreground tracking-wide">
            Loading Experience...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-primary font-mono">{progress}%</span>
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div className="progress-fill h-full bg-gradient-primary w-0 rounded-full shadow-glow"></div>
          </div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
    </div>
  );
};