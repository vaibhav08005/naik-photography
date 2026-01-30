import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#visit' },
  ];

  const services = [
    'Wedding Photography',
    'Birthday Celebrations',
    'Engagement Shoots',
    'Maternity Portraits',
    'Kids & Newborn',
    'Videography',
  ];

  return (
    <footer ref={footerRef} className="bg-[#0f0f0f] text-white py-20 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.3) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top section */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif italic text-3xl mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">Naik</span>
            </h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
              Capturing timeless memories with precision and passion. Nanded's premier photography studio since 2024.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-400/40 hover:bg-amber-400/5 transition-all duration-300 group">
                <Instagram className="w-4 h-4 text-white/60 group-hover:text-amber-400 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-amber-400/40 hover:bg-amber-400/5 transition-all duration-300 group">
                <Facebook className="w-4 h-4 text-white/60 group-hover:text-amber-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-200/60 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-200/60 mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-400 hover:text-white transition-colors duration-300 cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-amber-200/60 mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400/60 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  Near Sant Ganudas Maharaj High School,<br />
                  Shirur Tanda, Bhokar Umri Road,<br />
                  Umri, Nanded - 431807
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                <a href="tel:+918401658648" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +91 84016 58648
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400/60 flex-shrink-0" />
                <a href="mailto:contact@naikphotography.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  contact@naikphotography.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Large brand name */}
        <div className={`relative mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-serif italic text-[15vw] md:text-[12vw] leading-none tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none">
            Naik
          </h2>
        </div>

        {/* Bottom bar */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © 2024 Naik Photography. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
