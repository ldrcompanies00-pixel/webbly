import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle2, BarChart3 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LeadMagnetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if modal was already shown this session
    const hasShown = sessionStorage.getItem('leadMagnetShown');
    
    if (!hasShown) {
      // Set timer for 00 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('leadMagnetShown', 'true');
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  const validateURL = (url) => {
    try {
      // Allow URLs with or without protocol
      const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
      return urlPattern.test(url);
    } catch {
      return false;
    }
  };

  const handleClose = () => {
    if (!loading) {
      setIsOpen(false);
      setWebsite('');
      setEmail('');
      setError('');
      setSuccess(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!website.trim() || !email.trim()) {
      setError('Both fields are required.');
      return;
    }

    if (!validateURL(website.trim())) {
      setError('Please enter a valid website URL.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await pb.collection('leads').create({
        email: email.trim(),
        company: website.trim().replace(/^https?:\/\//, ''),
        name: 'Lead Magnet Modal',
        status: 'new'
      }, { 
        requestKey: null
      });

      // Track conversion
      if (typeof window !== 'undefined') {
        if (window.gtag) {
          window.gtag('event', 'generate_lead', {
            'event_label': 'Lead Magnet Modal',
            'value': 1.0,
            'currency': 'RON'
          });
        }
        if (window.fbq) {
          window.fbq('track', 'Lead', { content_name: 'Free Audit Modal' });
        }
      }

      setSuccess(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);

    } catch (err) {
      console.error('Lead submission error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              disabled={loading}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              {success ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">Thank you!</h3>
                  <p className="text-muted-foreground">
                    We've received your request. You'll receive your free audit report via email soon.
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-xs mb-4 border border-accent/20">
                      <BarChart3 className="w-3.5 h-3.5" />
                      Oferta Limita
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-2" style={{ letterSpacing: '-0.02em' }}>
                      Primeste Gratuit Website Audit!
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Afla cum imbunatatim SEO, design, si performantae.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="modal-website" className="text-sm font-semibold text-card-foreground">
                        Website URL *
                      </Label>
                      <Input
                        type="text"
                        id="modal-website"
                        value={website}
                        onChange={(e) => {
                          setWebsite(e.target.value);
                          setError('');
                        }}
                        placeholder="https://example.com"
                        disabled={loading}
                        className={error && !validateURL(website.trim()) ? 'border-red-500' : ''}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-email" className="text-sm font-semibold text-card-foreground">
                        Adresa de email *
                      </Label>
                      <Input
                        type="email"
                        id="modal-email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        placeholder="you@example.com"
                        disabled={loading}
                        className={error && !validateEmail(email.trim()) ? 'border-red-500' : ''}
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 font-medium">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 transition-all duration-200 active:scale-[0.98]"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        'Primeste Audit'
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Fara plata necesara. Rezultate livrate in 48 hours.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}