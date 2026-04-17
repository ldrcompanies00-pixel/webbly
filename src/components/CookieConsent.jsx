import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CookieSettings from './CookieSettings.jsx';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    statistics: false,
    marketing: false,
  });

  // EFFECT 1: Check LocalStorage and update Google Tags on Page Load
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
        setShowBanner(false);

        // Tell Google the consent status as soon as the app loads
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            'analytics_storage': parsed.statistics ? 'granted' : 'denied',
            'ad_storage': parsed.marketing ? 'granted' : 'denied',
            'ad_user_data': parsed.marketing ? 'granted' : 'denied',
            'ad_personalization': parsed.marketing ? 'granted' : 'denied'
          });
        }
      } catch (e) {
        console.error("Error parsing cookie consent", e);
        setTimeout(() => setShowBanner(true), 1500);
      }
    } else {
      setTimeout(() => setShowBanner(true), 1500);
    }
  }, []);

  // EFFECT 2: Listen for custom event to open settings from footer
  useEffect(() => {
    const handleOpenSettings = () => setShowSettings(true);
    window.addEventListener('openCookieSettings', handleOpenSettings);
    
    return () => {
      window.removeEventListener('openCookieSettings', handleOpenSettings);
    };
  }, []);

  const saveAndApply = (newPreferences) => {
    try {
      // 1. Calculate the score (Necessary is always 1)
      const score = 1 + (newPreferences.statistics ? 1 : 0) + (newPreferences.marketing ? 1 : 0);

      // 2. Define the data object
      const dataToSave = {
        ...newPreferences,
        necessary: true,
        timestamp: Date.now(),
        version: '2.0',
        consent_score: score.toString()
      };

     // 3. Update State and Local Storage
      localStorage.setItem('cookieConsent', JSON.stringify(dataToSave));
      setPreferences(dataToSave);
      setShowBanner(false);
      setShowSettings(false);

      // 4. UPDATE GOOGLE CONSENT FIRST (Before the trigger!)
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'analytics_storage': newPreferences.statistics ? 'granted' : 'denied',
          'ad_storage': newPreferences.marketing ? 'granted' : 'denied',
          'ad_user_data': newPreferences.marketing ? 'granted' : 'denied',
          'ad_personalization': newPreferences.marketing ? 'granted' : 'denied'
        });
      }

      // 5. THEN FIRE THE GTM EVENT
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'cookie_consent_update',
        'consent_statistics': newPreferences.statistics ? 'granted' : 'denied',
        'consent_marketing': newPreferences.marketing ? 'granted' : 'denied',
        'consent_score': score.toString()
      });
      

      window.dispatchEvent(new CustomEvent('cookieConsentUpdated'));
    } catch (error) {
      console.error("Error saving consent:", error);
      setShowBanner(false);
    }
  };

  const handleAcceptAll = () => {
    saveAndApply({
      necessary: true,
      statistics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    saveAndApply({
      necessary: true,
      statistics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveAndApply(preferences);
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0F172A] text-white p-6 md:p-8 shadow-2xl border-t border-[#334155]/50 animate-slide-up">
          <div className="container mx-auto max-w-7xl flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Cookie className="w-6 h-6 text-[#D4AF37]" />
                <h2 className="text-2xl font-bold text-white">Respectăm confidențialitatea ta</h2>
              </div>
              <p className="text-gray-300 text-base leading-relaxed max-w-4xl">
                Folosim cookies pentru a asigura funcționarea corectă a site-ului, a măsura traficul și a-ți oferi o experiență personalizată. Poți alege să accepți toate cookie-urile sau poți personaliza preferințele tale. Mai multe detalii găsești în{' '}
                <Link to="/privacy-policy" className="text-[#D4AF37] hover:underline font-medium">
                  Politica de Confidențialitate
                </Link>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-4 shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 font-semibold text-white border-2 border-[#334155] rounded-lg hover:bg-[#334155]/50 transition-colors whitespace-nowrap"
              >
                Setări
              </button>
              <button
                onClick={handleRejectAll}
                className="px-6 py-3 font-bold text-[#D4AF37] border-2 border-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-colors whitespace-nowrap"
              >
                Refuză tot
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 font-bold bg-[#D4AF37] text-[#0F172A] rounded-lg hover:brightness-95 hover:shadow-lg transition-all whitespace-nowrap"
              >
                Acceptă tot
              </button>
            </div>

          </div>
        </div>
      )}

      <CookieSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        onSave={handleSavePreferences}
        onRejectAll={handleRejectAll}
        preferences={preferences}
        setPreferences={setPreferences}
      />
    </>
  );
}