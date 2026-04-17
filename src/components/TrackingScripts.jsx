
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TrackingScripts = () => {

  useEffect(() => {
    // 1. Initialize Google Consent Mode v2 (Mandatory from March 2024 for EU regulations)
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    // Set initial default consent to 'denied' for all parameters
    gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });

    // 2. Load Google Tag Manager immediately so Consent Mode can intercept tags
    if (!window.gtmLoaded) {
      window.gtmLoaded = true;
      const gtmScript = document.createElement('script');
      gtmScript.async = true;
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NW5FFLBH');
      `;
      document.head.appendChild(gtmScript);
    }

    const updateConsentAndLoadScripts = () => {
      try {
        const consentData = localStorage.getItem('cookieConsent');
        if (!consentData) return; // Wait for user to make a choice

        const consent = JSON.parse(consentData);

        // 3. Update Google Consent Mode based on user preferences
        gtag('consent', 'update', {
          'analytics_storage': consent.statistics ? 'granted' : 'denied',
          'ad_storage': consent.marketing ? 'granted' : 'denied',
          'ad_user_data': consent.marketing ? 'granted' : 'denied',
          'ad_personalization': consent.marketing ? 'granted' : 'denied'
        });

        // 4. Meta Pixel (Marketing) - Prior blocking logic: Only load if 'marketing' === true
        if (consent.marketing && !window.metaLoaded) {
          window.metaLoaded = true;
          const metaScript = document.createElement('script');
          metaScript.async = true;
          metaScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1396694312210401');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(metaScript);
        }
      } catch (error) {
        console.error('Error evaluating tracking consent:', error);
      }
    };

    // Load scripts and update consent on mount (if consent already exists in localStorage)
    updateConsentAndLoadScripts();

    // Listen for consent updates from the CookieConsent component
    window.addEventListener('cookieConsentUpdated', updateConsentAndLoadScripts);

    return () => {
      window.removeEventListener('cookieConsentUpdated', updateConsentAndLoadScripts);
    };
  }, []);

  return (
    <Helmet>
      {/* Preconnect and DNS prefetch tags for optimal loading when scripts are injected */}
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />
    </Helmet>
  );
};

export default TrackingScripts;
