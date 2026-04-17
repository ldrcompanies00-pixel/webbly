
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact CTA Section before links */}
        <div className="mb-16 pb-12 border-b border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-3xl font-bold text-primary-foreground mb-2">Ai un proiect în minte?</h3>
            <p className="text-lg text-primary-foreground/80">Hai să discutăm despre cum te putem ajuta să crești.</p>
          </div>
          <Button asChild size="lg" className="bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold h-14 px-8 text-lg transition-all shadow-none">
            <Link to="/contact">Contactează-ne</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="text-3xl font-extrabold text-primary-foreground tracking-tight">
              Webbly<span className="text-accent">.</span>
            </span>
            <p className="mt-6 text-primary-foreground/80 leading-relaxed text-base">
              Agenție premium de web design și marketing digital. Transformăm vizitatorii în clienți fideli prin strategii validate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-xl font-bold text-accent mb-6 block">Link-uri rapide</span>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-medium">Acasă</Link>
              <Link to="/servicii" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-medium">Servicii</Link>
              <Link to="/portofoliu" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-medium">Portofoliu</Link>
              <Link to="/despre" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-medium">Despre noi</Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300 font-medium">Contact</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <span className="text-xl font-bold text-accent mb-6 block">Contact direct</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <a href="mailto:contact@webbly.ro" className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <span>contact@webbly.ro</span>
                </a>
                <a href="tel:+40737898500" className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <span>+40 737 898 500</span>
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <a href="https://wa.me/40737898500" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <span>WhatsApp Support</span>
                </a>
                <div className="flex gap-4 mt-2">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-primary-foreground/60 text-sm font-medium">
            © {currentYear} Webbly. Toate drepturile rezervate.
          </p>
          
          {/* Legal Links Section */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-bold">
            <Link to="/privacy-policy" className="text-[#D4AF37] hover:text-white transition-colors duration-300">
              Politica de Confidențialitate
            </Link>
            <Link to="/terms-and-conditions" className="text-[#D4AF37] hover:text-white transition-colors duration-300">
              Termeni și Condiții
            </Link>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openCookieSettings'))} 
              className="text-[#D4AF37] hover:text-white transition-colors duration-300"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
