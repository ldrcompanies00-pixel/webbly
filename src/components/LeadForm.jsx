"use client";

import React, { useState } from 'react';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

const fireLeadMagnetTracking = () => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        'event_label': 'Lead Magnet Audit',
        'value': 1.0,
        'currency': 'RON'
      });
    }
    if (window.fbq) {
      window.fbq('track', 'Lead', { content_name: 'Audit Gratuit' });
    }
  }
};

export default function LeadForm() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validări
    if (!email.trim() || !website.trim()) {
      setError('Toate câmpurile sunt obligatorii.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Email invalid. Verifică formatul.');
      return;
    }

    setLoading(true);

    try {
      await pb.collection('leads').create({
        email: email.trim(),
        company: website.trim().replace(/^https?:\/\//, ''),
        name: 'Lead Magnet Audit',
        status: 'new'
      }, { 
        requestKey: null // Mai sigur decat $autoCancel pentru formulare
      });
      
      fireLeadMagnetTracking();
      
      setSuccess(true);
      setEmail('');
      setWebsite('');
    } catch (err) {
      console.error('Lead submission error:', err);
      setError('A apărut o eroare la trimiterea formularului. Te rugăm să încerci din nou.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setEmail('');
    setWebsite('');
    setError('');
  };

  if (success) {
    return (
      <div className="bg-card p-8 rounded-2xl border border-border text-center shadow-sm animate-fade-in">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground mb-3">Mulțumim!</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Am primit site-ul tău. Auditorul nostru îl va analiza și vei primi raportul pe email.
        </p>
        
        <button 
          onClick={handleReset}
          className="text-sm font-medium text-primary flex items-center justify-center gap-2 mx-auto hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Trimite alt audit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label htmlFor="lead-website" className="block text-sm font-semibold text-foreground mb-1.5 sr-only">
          Website *
        </label>
        <input
          type="url"
          id="lead-website"
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
            setError('');
          }}
          placeholder="ex: website-ul-tau.ro"
          className={`w-full ${error && !website.trim() ? '!border-red-500' : ''}`}
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="lead-email" className="block text-sm font-semibold text-foreground mb-1.5 sr-only">
          Email *
        </label>
        <input
          type="email"
          id="lead-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          placeholder="Adresa ta de email"
          className={`w-full ${error && !validateEmail(email) ? '!border-red-500' : ''}`}
          disabled={loading}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium mb-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full flex justify-center items-center mt-2"
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          'Primesc Audit Gratuit'
        )}
      </button>
    </form>
  );
}