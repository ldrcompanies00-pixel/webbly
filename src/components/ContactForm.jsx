import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

// Copy and paste this helper function at the top of your file
const fireLeadEvents = () => {
  // This tells Google Analytics a lead was created
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      'event_label': 'Contact Form',
      'value': 1.0,
      'currency': 'RON' // You can change this to USD or EUR
    });
  }

  // This tells Meta (Facebook) a lead was created
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }
};
 
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. First, check for errors
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Câmp obligatoriu';
    if (!formData.email.trim()) {
      newErrors.email = 'Câmp obligatoriu';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email invalid';
    }
    if (!formData.website.trim()) newErrors.website = 'Câmp obligatoriu';
    if (!formData.message.trim()) newErrors.message = 'Câmp obligatoriu';

    // 2. If there are errors, STOP here and don't fire the tags
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 3. SUCCESS: The form is valid! 
    // Now we fire the Google and Meta tags
    fireLeadEvents();

    setStatus('loading');

    try {
      await pb.collection('contacts').create({
        ...formData,
        status: 'new'
      }, { $autoCancel: false });
      
      setStatus('success');
      setFormData({ name: '', email: '', website: '', message: '' });
    } catch (error) {
      console.error('Contact submission error:', error);
      setErrors({ form: 'A apărut o eroare. Te rugăm să încerci din nou.' });
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-card p-10 rounded-2xl border border-border text-center shadow-sm animate-fade-in flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-primary mb-4">Mulțumim!</h3>
        <p className="text-secondary leading-relaxed text-lg">
          Cererea ta a fost trimisă cu succes. Echipa noastră va răspunde în 24 de ore.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {errors.form && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium mb-4">
          {errors.form}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">Nume *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? '!border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? '!border-red-500' : ''}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-primary mb-1.5">Website URL *</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className={errors.website ? '!border-red-500' : ''}
        />
        {errors.website && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.website}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-primary mb-1.5">Mesaj *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Cum putem să te ajutăm?"
          rows={5}
          className={`resize-y min-h-[120px] ${errors.message ? '!border-red-500' : ''}`}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1.5 font-medium">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gold w-full sm:w-auto"
      >
        {status === 'loading' ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          'Trimite Cerere'
        )}
      </button>
    </form>
  );
}