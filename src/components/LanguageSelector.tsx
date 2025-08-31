import React, { useEffect, useState } from 'react';
import i18n from '../i18n';

const LanguageSelector = () => {
  const [selectedLocale, setSelectedLocale] = useState('en_Us');

  const locales = [
    { code: 'en_US', label: 'USA', flag: '🇺🇸' },
    { code: 'es_ES', label: 'Spain', flag: '🇪🇸' },
    { code: 'fr_FR', label: 'France', flag: '🇫🇷' },
    { code: 'np_Nep', label: 'Nepal', flag: '🇳🇵' },
    { code: 'hi_IN', label: 'India', flag: '🇮🇳' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setSelectedLocale(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem("i18nextLng")
    if (!savedLocale) return
    const locale = locales.find((f) => f.code === savedLocale)
    setSelectedLocale(locale?.code!)

  }, [])

  return (
    <div>
      <label htmlFor="language-select" className="mr-2">
        Select Language:
      </label>
      <select
        id="language-select"
        value={selectedLocale}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      >
        {locales.map((localeObj) => (
          <option key={localeObj.code} value={localeObj.code}>
            {localeObj.flag} {localeObj.label} ({localeObj.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
