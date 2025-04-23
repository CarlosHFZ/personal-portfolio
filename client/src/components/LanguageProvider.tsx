import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from '@/lib/i18n';

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // We don't need to use useTranslation() here as we're directly importing i18n
  
  const [language, setLanguage] = useState<Language>(() => {
    // Check for saved language preference or use browser language
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage === "en" || savedLanguage === "pt") {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    return browserLanguage === "pt" ? "pt" : "en";
  });

  useEffect(() => {
    // Make sure i18n is ready before changing language
    if (i18n.isInitialized) {
      i18n.changeLanguage(language);
    } else {
      i18n.on('initialized', () => {
        i18n.changeLanguage(language);
      });
    }
    
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "pt" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
