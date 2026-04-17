
import React from 'react';
import { X, ShieldCheck, BarChart2, Megaphone } from 'lucide-react';

export default function CookieSettings({ isOpen, onClose, onSave, onRejectAll, preferences, setPreferences }) {
  if (!isOpen) return null;

  const handleToggle = (key) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#0F172A]/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-slide-up flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="cookie-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 id="cookie-modal-title" className="text-2xl font-extrabold text-[#0F172A]">Preferințele tale de cookies</h2>
            <p className="text-sm font-medium text-[#334155] mt-1">Alege ce tipuri de cookies să accepți pe acest site.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-[#334155] transition-colors"
            aria-label="Închide modalul"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Necessary */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <div className="flex gap-4">
              <div className="mt-1 w-10 h-10 rounded-full bg-[#0F172A]/5 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#0F172A]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Strict Necesare</h3>
                <p className="text-sm text-[#334155] mt-1 leading-relaxed">
                  Necesare pentru funcționarea site-ului (sesiuni, securitate, salvarea preferințelor). Nu pot fi dezactivate.
                </p>
              </div>
            </div>
            <button 
              role="switch" 
              aria-checked="true" 
              disabled 
              className="cookie-toggle shrink-0"
              aria-label="Cookies necesare"
            >
              <span className="cookie-toggle-thumb" />
            </button>
          </div>

          {/* Statistics */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100">
            <div className="flex gap-4">
              <div className="mt-1 w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <BarChart2 className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Statistici și Analiză</h3>
                <p className="text-sm text-[#334155] mt-1 leading-relaxed">
                  Ne ajută să înțelegem cum folosești site-ul pentru a-l îmbunătăți, prin colectarea și raportarea informațiilor în mod anonim.
                </p>
              </div>
            </div>
            <button 
              type="button"
              role="switch" 
              aria-checked={preferences.statistics} 
              onClick={() => handleToggle('statistics')}
              className="cookie-toggle shrink-0"
              aria-label="Cookies pentru statistici"
            >
              <span className="cookie-toggle-thumb" />
            </button>
          </div>

          {/* Marketing */}
          <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-100">
            <div className="flex gap-4">
              <div className="mt-1 w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Marketing și Publicitate</h3>
                <p className="text-sm text-[#334155] mt-1 leading-relaxed">
                  Folosite pentru a-ți urmări navigarea pe site-uri, cu scopul de a afișa reclame relevante și antrenante pentru tine.
                </p>
              </div>
            </div>
            <button 
              type="button"
              role="switch" 
              aria-checked={preferences.marketing} 
              onClick={() => handleToggle('marketing')}
              className="cookie-toggle shrink-0"
              aria-label="Cookies pentru marketing"
            >
              <span className="cookie-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-end">
          <button 
            onClick={onRejectAll}
            className="px-6 py-3 font-bold text-[#0F172A] border-2 border-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-colors w-full sm:w-auto"
          >
            Refuză tot
          </button>
          <button 
            onClick={onSave}
            className="px-6 py-3 font-bold bg-[#D4AF37] text-[#0F172A] rounded-lg hover:brightness-95 hover:shadow-lg transition-all w-full sm:w-auto"
          >
            Salvează Preferințe
          </button>
        </div>
      </div>
    </div>
  );
}
