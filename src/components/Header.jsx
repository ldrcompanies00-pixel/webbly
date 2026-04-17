
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Acasă' },
    { path: '/servicii', label: 'Servicii' },
    { path: '/portofoliu', label: 'Portofoliu' },
    { path: '/despre', label: 'Despre' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-primary py-4 shadow-md transition-all duration-300 border-b border-primary-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-extrabold text-primary-foreground tracking-tight transition-colors duration-300">
              Webbly<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-semibold transition-all duration-300 hover:text-accent relative ${
                  isActive(link.path) ? 'text-accent' : 'text-primary-foreground/90'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/contact" className="btn-gold py-2.5 px-6 text-sm">
              Contactează-ne
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent hover:bg-primary-foreground/10">
                <Menu className="h-8 w-8" />
                <span className="sr-only">Meniu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-primary border-l-accent/20">
              <SheetTitle className="text-primary-foreground text-2xl font-bold mb-8 mt-4">Meniu</SheetTitle>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-xl font-semibold transition-colors duration-300 hover:text-accent ${
                      isActive(link.path) ? 'text-accent' : 'text-primary-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setIsOpen(false)} className="btn-gold mt-6 w-full">
                  Contactează-ne
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
