import React, { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import en from "../../public/locales/en.json";
import fr from "../../public/locales/fr.json";
import es from "../../public/locales/es.json";
import ar from "../../public/locales/ar.json";

import { getLanguage } from "../multiLanguage/helpers/useLanguage";

interface ProviderProps {
  children: ReactNode;
}

const messages: any = { en: en, fr: fr, es: es, ar: ar };
const language = getLanguage();
const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <MemoryRouter>
      <IntlProvider locale={language} messages={messages[language]}>
        {children}
      </IntlProvider>
    </MemoryRouter>
  );
};

export default Provider;
