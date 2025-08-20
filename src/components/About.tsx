import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Rocket, 
  Lightning,
  Globe,
  Database
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  useEffect(() => {
    // Section fade in animation
    gsap.fromTo('.about-section', 
      {
        opacity: 0,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Profile image animation
    gsap.fromTo('.profile-image', 
      {
        opacity: 0,
        x: -100,
        rotateY: -15
      },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.profile-image',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Bio text animation
    gsap.fromTo('.bio-text', 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bio-text',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Skills stagger animation
    gsap.fromTo('.skill-item', 
      {
        opacity: 0,
        y: 30,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Profile image hover effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
      profileImage.addEventListener('mouseenter', () => {
        gsap.to(profileImage, {
          scale: 1.05,
          rotateY: 5,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      profileImage.addEventListener('mouseleave', () => {
        gsap.to(profileImage, {
          scale: 1,
          rotateY: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'Frontend', icon: Code, color: 'text-primary' },
    { name: 'UI/UX', icon: Palette, color: 'text-secondary' },
    { name: 'React', icon: Lightning, color: 'text-accent' },
    { name: 'Performance', icon: Rocket, color: 'text-primary' },
    { name: 'Web APIs', icon: Globe, color: 'text-secondary' },
    { name: 'Databases', icon: Database, color: 'text-accent' }
  ];

  return (
    <section id="about" className="about-section py-20 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-glow-secondary mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div className="relative">
            <div className="profile-image relative w-80 h-80 mx-auto">
              {/* Glowing border */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-30"></div>
              
              {/* Main image container */}
              <div className="relative w-full h-full glass rounded-full p-2 border-2 border-primary/30">
                <img 
                  src="/images/profile.png"
                  alt="Barath Vikraman - Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full blur-sm opacity-60 float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full blur-sm opacity-60 float-delayed"></div>
            </div>
          </div>

          {/* Bio Content */}
          <div className="space-y-8">
            <div className="bio-text space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                Creative Developer & 
                <span className="text-glow-primary bg-gradient-primary bg-clip-text text-transparent block">
                  Digital Innovator
                </span>
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                I specialize in creating immersive digital experiences that blend cutting-edge technology 
                with stunning visual design. With expertise in modern web technologies and a passion for 
                innovation, I transform ideas into engaging, high-performance applications.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                My approach combines technical excellence with creative vision, ensuring every project 
                not only functions flawlessly but also captivates and inspires users through thoughtful 
                interaction design and seamless user experiences.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              <h4 className="text-xl font-semibold text-foreground mb-6">Core Expertise</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-item glass p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <skill.icon 
                        size={24} 
                        className={`${skill.color} group-hover:scale-110 transition-transform duration-300`} 
                      />
                      <span className="text-foreground font-medium">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots opacity-5 pointer-events-none"></div>
    </section>
  );
};