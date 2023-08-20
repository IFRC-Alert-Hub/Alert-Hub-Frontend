import json
from googletrans import Translator
import argparse

class TranslationManager:
    def __init__(self, target_language_code):
        self.target_language_code = target_language_code
        self.translator = Translator()

    def translate_values(self, values):
        translations = [self.translator.translate(value, dest=self.target_language_code).text for value in values]
        return translations

    def translate_and_save(self, input_file, output_file, locales_folder, language_codes_file, supported_languages_file, overwrite=False):
        try:
            with open(str(locales_folder + output_file), 'r', encoding='utf-8') as output_file_obj:
                existing_translated_data = json.load(output_file_obj)
        except FileNotFoundError:
            existing_translated_data = {}
            overwrite=False

        with open(locales_folder + 'en.json') as user_file:
            input_data = json.load(user_file)

        values_to_translate = list(input_data.values())

        translated_values = self.translate_values(values_to_translate)

        for key, value in zip(input_data.keys(), translated_values):
            if overwrite or key not in existing_translated_data:
                existing_translated_data[key] = value

        with open(str(locales_folder + output_file), 'w', encoding='utf-8') as output_file_obj:
            json.dump(existing_translated_data, output_file_obj, ensure_ascii=False, indent=2)

        print(f"Translated data saved to '{output_file}'.")

        with open(language_codes_file, 'r') as lang_codes_file:
            language_codes = json.load(lang_codes_file)

        language_entry = {"code": self.target_language_code, "name": language_codes[self.target_language_code]}

        with open(supported_languages_file, 'r') as supported_lang_file:
            supported_languages = json.load(supported_lang_file)

        existing_codes = [item["code"] for item in supported_languages]
        if self.target_language_code not in existing_codes:
            supported_languages.append(language_entry)
            with open(supported_languages_file, "w") as json_file:
                json.dump(supported_languages, json_file, indent=4)
        else:
            print(f'Dictionary with code "{self.target_language_code}" already exists.')


def main():
    target_language_code = input("Enter the target language code (e.g., 'es' for Spanish): ")
    overwrite_input = input("Do you want to overwrite existing translations? (y/n): ").strip().lower()

    if overwrite_input == 'y':
        overwrite = True
    else:
        overwrite = False

    output_filename = f"{target_language_code}.json"
    localesFolder = './locales/'
    languageCodes = './LanguageCodes/LanguageCodes.json'
    supportedLanguages = './locales/supportedLanguages.json'

    translator = TranslationManager(target_language_code)
    translator.translate_and_save('en.json', output_filename, localesFolder, languageCodes, supportedLanguages, overwrite=overwrite)


if __name__ == "__main__":
    main()
