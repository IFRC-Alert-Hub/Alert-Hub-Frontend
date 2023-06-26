import { useEffect, useState } from "react";
import {
  getLanguage,
  setLanguage,
  Language,
} from "../../multiLanguage/helpers/useLanguage";
import { useIntl } from "react-intl";

const ChangeLanguageDropdownComponent = () => {
  const language = getLanguage();

  const [currentLanguage, setCurrentLanguage] = useState<Language>(language);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  function handleChangeLanguage(lang: string) {
    setCurrentLanguage(lang as Language);
    window.location.reload();
  }

  return (
    <>
      <select
        value={currentLanguage}
        onChange={(event) => handleChangeLanguage(event.target.value)}
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
      </select>
    </>
  );
};

export default ChangeLanguageDropdownComponent;
