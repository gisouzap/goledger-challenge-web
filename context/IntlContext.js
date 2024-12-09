'use client';

import { createContext, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import enMessages from '@/locales/en.json';
import ptMessages from '@/locales/pt.json';

const messages = {
  en: enMessages,
  pt: ptMessages,
};

const IntlContext = createContext();

export const IntlProviderWrapper = ({ children }) => {
  const [locale, setLocale] = useState('en');

  const switchLocale = newLocale => {
    setLocale(newLocale);
  };

  return (
    <IntlContext.Provider value={{ locale, switchLocale }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export const useIntlContext = () => useContext(IntlContext);
