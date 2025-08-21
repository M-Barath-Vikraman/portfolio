import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PaperPlaneTilt, 
  GithubLogo, 
  LinkedinLogo,
  EnvelopeSimple,
  User,
  ChatCircleText
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Section animation
    gsap.fromTo('.contact-section', 
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
          trigger: '.contact-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Form inputs animation
    gsap.fromTo('.form-input', 
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Social icons animation
    gsap.fromTo('.social-icon', 
      {
        opacity: 0,
        scale: 0,
        rotation: -180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.social-links',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Input focus animations
    const inputs = document.querySelectorAll('.contact-input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      input.addEventListener('blur', () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const submitBtn = document.querySelector('.submit-btn');

  // Animate button click
  gsap.to(submitBtn, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
    onComplete: async () => {
      try {
        // Determine API URL based on environment
        const apiUrl = import.meta.env.DEV 
          ? "http://localhost:3001/api/contact"  // Local development server
          : "/api/contact";                      // Production (Vercel)
        
        // Call backend API
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          // Reset form
          setFormData({ name: "", email: "", message: "" });

          // Success animation (green flash)
          gsap.to(submitBtn, {
            backgroundColor: "#10B981", // emerald-500
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          });
        } else {
          // Error animation (red flash)
          gsap.to(submitBtn, {
            backgroundColor: "#EF4444", // red-500
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);

        // Error animation (red flash)
        gsap.to(submitBtn, {
          backgroundColor: "#EF4444", // red-500
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });
      }
    }
  });
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section py-20 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-glow-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
          <div className="w-24 h-1 bg-gradient-secondary mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <User size={16} className="inline mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input w-full glass px-4 py-3 rounded-xl border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder-muted-foreground transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <EnvelopeSimple size={16} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input w-full glass px-4 py-3 rounded-xl border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder-muted-foreground transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              {/* Message Input */}
              <div className="form-input">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <ChatCircleText size={16} className="inline mr-2" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="contact-input w-full glass px-4 py-3 rounded-xl border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder-muted-foreground transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn w-full bg-gradient-primary hover:shadow-glow px-8 py-4 rounded-xl text-primary-foreground font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Send Message
                <PaperPlaneTilt 
                  size={20} 
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                />
              </button>
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="glass p-8 rounded-2xl border border-border/50">
              <h3 className="text-2xl font-bold text-foreground mb-6">Let's Connect</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <EnvelopeSimple size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">barathvikraman909@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <ChatCircleText size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="text-foreground font-medium">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <h4 className="text-lg font-semibold text-foreground mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/M-Barath-Vikraman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-12 h-12 glass rounded-xl flex items-center justify-center border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                >
                  <GithubLogo size={20} className="text-foreground group-hover:text-primary transition-colors" />
                </a>
                
                <a
                  href="https://www.linkedin.com/in/barath-vikraman-m-587b18217"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-12 h-12 glass rounded-xl flex items-center justify-center border border-border/50 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300 group"
                >
                  <LinkedinLogo size={20} className="text-foreground group-hover:text-secondary transition-colors" />
                </a>
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