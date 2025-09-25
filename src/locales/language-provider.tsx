import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import i18n from './i18n';

type LanguageCode = 'en' | 'bn' | 'hi';

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
};

const STORAGE_KEY = 'app_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: PropsWithChildren<{}>) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  // try to load saved language on mount (safe dynamic import of AsyncStorage)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && mounted) {
          // validate
          const code = (saved as LanguageCode) || 'en';
          setLanguageState(code);
          i18n.changeLanguage(code);
        }
      } catch (err) {
        // AsyncStorage not available or read failed — ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  // setLanguage wrapper: update state, change i18n language, and persist
  const setLanguage = useCallback(async (l: LanguageCode) => {
    setLanguageState(l);
    try {
      await i18n.changeLanguage(l);
    } catch (err) {
      // ignore i18n errors
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, l);
    } catch (err) {
      // persistence unavailable — ignore
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export type { LanguageCode };

