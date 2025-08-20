import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export const Projects = () => {
  useEffect(() => {
    // Section animation
    gsap.fromTo('.projects-section', 
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
          trigger: '.projects-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cards stagger animation
    gsap.fromTo('.project-card', 
      {
        opacity: 0,
        y: 80,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Card hover animations
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          scale: 1.02,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.card-glow'), {
          opacity: 1,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(card.querySelector('.card-glow'), {
          opacity: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "Gaming Portfolio",
      description: "Interactive gaming portfolio with 3D elements and immersive animations",
  image: "/images/project-1.png",
      tech: ["React", "Three.js", "GSAP"],
      color: "primary"
    },
    {
      title: "Animation Tools Platform",
      description: "Educational platform for learning web animation techniques",
  image: "/images/project-2.png",
      tech: ["Next.js", "TypeScript", "Framer Motion"],
      color: "secondary"
    },
    {
      title: "Developer Portfolio",
      description: "Modern portfolio showcasing creative development skills",
  image: "/images/project-3.png",
      tech: ["React", "GSAP", "Tailwind"],
      color: "accent"
    },
    {
      title: "AuthKit Dashboard",
      description: "Authentication solution with clean, modern interface",
  image: "/images/project-4.png",
      tech: ["Vue.js", "Node.js", "MongoDB"],
      color: "primary"
    },
    {
      title: "3D Web Experience",
      description: "Interactive 3D web application with immersive user experience",
  image: "/images/project-5.png",
      tech: ["React", "Three.js", "WebGL"],
      color: "secondary"
    },
    {
      title: "Gaming UI System",
      description: "Next-level gaming interface with advanced interactions",
  image: "/images/project-6.png",
      tech: ["React", "Electron", "WebGL"],
      color: "accent"
    }
  ];

  return (
    <section id="projects" className="projects-section py-20 bg-gradient-to-b from-card/50 to-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-glow-accent mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work in web development, 3D experiences, and interactive design
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card relative group cursor-pointer">
              {/* Glow effect */}
              <div className={`card-glow absolute inset-0 bg-${project.color}/20 blur-xl rounded-2xl opacity-0 scale-95`}></div>
              
              {/* Card content */}
              <div className="relative glass rounded-2xl border border-border/50 overflow-hidden h-full">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
                  
                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="glass p-2 rounded-full hover:bg-primary/20 transition-colors">
                      <ArrowUpRight size={16} className="text-primary" />
                    </button>
                    <button className="glass p-2 rounded-full hover:bg-primary/20 transition-colors">
                      <GithubLogo size={16} className="text-primary" />
                    </button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-border/50 text-foreground rounded-full border border-border/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="glass border border-primary/30 hover:bg-primary/10 px-8 py-4 rounded-full text-primary font-medium transition-all duration-300 hover:scale-105 hover:shadow-glow">
            View All Projects
          </button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
    </section>
  );
};