import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';

const translations = { en, hi };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // स्थानीय स्टोरेज से या डिफ़ॉल्ट रूप से 'hi' (हिंदी) से भाषा प्राप्त करें
  const [language, setLanguage] = useState(localStorage.getItem('appLanguage') || 'hi');

  useEffect(() => {
    // भाषा बदलने पर स्थानीय स्टोरेज में सहेजें
    localStorage.setItem('appLanguage', language);
  }, [language]);

  // अनुवाद फ़ंक्शन: कुंजी के आधार पर वर्तमान भाषा का टेक्स्ट लौटाता है
  const t = (key) => {
    // Handle nested keys like 'categories.fruits'
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // अगर कुंजी नहीं मिलती है, तो कुंजी ही लौटा दें
      }
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// हुक का उपयोग करके कॉन्टेक्स्ट को आसानी से एक्सेस करें
export const useLanguage = () => useContext(LanguageContext);