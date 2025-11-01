import React, { useState, useEffect } from 'react';
import { X, Globe, DollarSign, Check } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';

const WelcomeModal: React.FC = () => {
  const {
    showWelcomeModal,
    setShowWelcomeModal,
    language,
    currency,
    setLanguage,
    setCurrency,
    t,
    languages,
    currencies
  } = useLocalization();

  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  // 🌍 Detect browser locale and auto-set defaults
  useEffect(() => {
    if (!language && !currency) {
      const browserLang = navigator.language || navigator.languages[0] || 'en';
      const langCode = browserLang.split('-')[0]; // e.g. "en" from "en-US"

      // Define fallback currency by region
      const localeDefaults: Record<string, { lang: string; curr: string }> = {
        de: { lang: 'de', curr: 'EUR' }, // Germany
        fr: { lang: 'fr', curr: 'EUR' }, // France
        es: { lang: 'es', curr: 'EUR' }, // Spain
        it: { lang: 'it', curr: 'EUR' }, // Italy
        en: { lang: 'en', curr: 'USD' }, // Default English to USD
        nl: { lang: 'nl', curr: 'EUR' }, // Netherlands
        pt: { lang: 'pt', curr: 'EUR' }, // Portugal
        pl: { lang: 'pl', curr: 'EUR' }, // Poland
        ru: { lang: 'ru', curr: 'EUR' },
        ja: { lang: 'ja', curr: 'JPY' },
        zh: { lang: 'zh', curr: 'CNY' },
      };

      const defaults = localeDefaults[langCode] || localeDefaults['en'];
      setSelectedLanguage(defaults.lang);
      setSelectedCurrency(defaults.curr);
    }
  }, [language, currency]);

  if (!showWelcomeModal) return null;

  const handleConfirm = () => {
    setLanguage(selectedLanguage);
    setCurrency(selectedCurrency);
    localStorage.setItem('eoa-welcome-seen', 'true');
    setShowWelcomeModal(false);
  };

  const isSelectionComplete = selectedLanguage && selectedCurrency;

  const popularLanguages = [
    { country: 'Germany', language: 'de', flag: '🇩🇪' },
    { country: 'United Kingdom', language: 'en', flag: '🇬🇧' },
    { country: 'France', language: 'fr', flag: '🇫🇷' },
    { country: 'Spain', language: 'es', flag: '🇪🇸' },
    { country: 'Italy', language: 'it', flag: '🇮🇹' },
    { country: 'United States', language: 'en', flag: '🇺🇸' },
  ];

  const popularCurrencies = [

    { symbol: 'EUR', name: 'Euro', flag: '🇪🇺' },           // European Union
    { symbol: 'USD', name: 'US Dollar', flag: '🇺🇸' },       // United States
    { symbol: 'GBP', name: 'British Pound', flag: '🇬🇧' },   // United Kingdom
    { symbol: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' }, // Canada
    { symbol: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' }, // Australia
    { symbol: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' }, // New Zealand
    { symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },     // Switzerland
    { symbol: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },    // Japan
    { symbol: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },    // China
    { symbol: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' }, // Hong Kong
    { symbol: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' }, // Singapore
    { symbol: 'ZAR', name: 'South African Rand', flag: '🇿🇦' }, // South Africa
    { symbol: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },  // Nigeria
    { symbol: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },   // Ghana
    { symbol: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' }, // Kenya
    { symbol: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },    // India
    { symbol: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },  // Brazil
    { symbol: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },    // Mexico
    { symbol: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },   // Sweden
    { symbol: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' }, // Norway
    { symbol: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },    // Denmark
    { symbol: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },      // United Arab Emirates
    { symbol: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },     // Saudi Arabia
    { symbol: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },    // Turkey
    { symbol: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },  // Egypt
    { symbol: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰' }, // Pakistan
    { symbol: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩' }, // Bangladesh
    { symbol: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' }, // Philippines
    { symbol: 'KRW', name: 'South Korean Won', flag: '🇰🇷' }, // South Korea
    { symbol: 'PLN', name: 'Polish Zloty', flag: '🇵🇱' },    // Poland
  ];

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <img
              src="https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/tumie-images/DSC06360.jpg"
              alt="E.O.A Fashion"
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="text-center p-8 border-b border-gray-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                  src="https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/e.o.a-logo/E.O.A%20Logo.jpg"
                  alt="E.O.A Logo"
                  className="h-16 w-16 rounded-full border-2 border-orange-400"
              />
            </div>
            <h2 className="text-3xl font-serif font-medium text-gray-900 mb-2">
              Welcome to E.O.A
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('welcomeSubtitle')}
            </p>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto flex-1">
            {/* Language Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-serif font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-600" />
                {t('selectLanguage')}
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {popularLanguages.map((lang) => (
                    <button
                        key={lang.country}
                        onClick={() => setSelectedLanguage(lang.language)}
                        className={`p-4 border-2 rounded-lg text-left transition-all hover:border-black hover:bg-gray-50 ${
                            selectedLanguage === lang.language ? 'border-black bg-gray-50' : 'border-gray-200'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="font-medium text-gray-900">{lang.country}</div>
                        {selectedLanguage === lang.language && (
                            <Check className="w-5 h-5 text-black ml-auto" />
                        )}
                      </div>
                    </button>
                ))}
              </div>

              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {languages.map((lang) => (
                    <button
                        key={lang[0]}
                        onClick={() => setSelectedLanguage(lang[0])}
                        className={`w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                            selectedLanguage === lang[0] ? 'bg-gray-100 text-black' : ''
                        }`}
                    >
                      <div className="font-medium flex items-center gap-3">
                        <span className="text-xl">{lang[4]}</span>
                        {lang[2]}
                      </div>
                      <div className="text-sm text-gray-600">{lang[1]}</div>
                    </button>
                ))}
              </div>
            </div>

            {/* Currency Selection */}
            <div>
              <h3 className="text-lg font-serif font-medium text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary-600" />
                {t('selectCurrency')}
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {popularCurrencies.map((curr) => (
                    <button
                        key={curr.symbol}
                        onClick={() => setSelectedCurrency(curr.symbol)}
                        className={`p-4 border-2 rounded-lg text-left transition-all hover:border-black hover:bg-gray-50 ${
                            selectedCurrency === curr.symbol ? 'border-black bg-gray-50' : 'border-gray-200'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{curr.flag}</span>
                        <div className="font-medium text-gray-900">
                          {curr.name} ({curr.symbol})
                        </div>
                        {selectedCurrency === curr.symbol && (
                            <Check className="w-5 h-5 text-black ml-auto" />
                        )}
                      </div>
                    </button>
                ))}
              </div>

              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                {currencies.map((curr) => (
                    <button
                        key={curr[0]}
                        onClick={() => setSelectedCurrency(curr[0])}
                        className={`w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                            selectedCurrency === curr[0] ? 'bg-gray-100 text-black' : ''
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{curr[1]}</div>
                          <div className="text-sm text-gray-600">{curr[3]}</div>
                        </div>
                        <div className="text-lg font-medium text-black">{curr[2]}</div>
                      </div>
                    </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-white flex-shrink-0">
            <button
                onClick={handleConfirm}
                disabled={!isSelectionComplete}
                className={`w-full py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg mb-4 ${
                    isSelectionComplete
                        ? 'bg-black text-white hover:bg-gray-800 hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                }`}
            >
              {t('confirmShippingLocation')}
            </button>
            <p className="text-center text-sm text-gray-500">
              {isSelectionComplete
                  ? 'You can change these settings anytime in the footer'
                  : 'Please select both language and currency to continue'}
            </p>
          </div>
        </div>
      </div>
  );
};

export default WelcomeModal;
