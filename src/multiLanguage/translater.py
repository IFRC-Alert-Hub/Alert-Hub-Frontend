"""
Translation Script
Author: Piraveenan Kirupakaran

This script utilises the googletrans library to facilitate the translation of text values from a source language
to a target language. It defines a TranslationManager class that encapsulates the translation process and provides
methods for translating values, updating translated data, and managing supported languages. The main function
coordinates the translation process by interacting with the user for language preferences and overwriting options.

It also allows you to delete languages from the supported list, removing their translation files from the 'public' folder as well.

Dependencies:
- This script requires the googletrans library for language translation.
  Install it using: pip install googletrans==3.1.0a0

Usage:
1. Run the script and follow the prompts to either translate text values or delete a language.
   a. For translation, enter the target language code (e.g., 'es' for Spanish) and specify whether existing translations should be overwritten.
   b. For deletion, confirm that you want to delete a language, provide the language code, and the script will remove the language from the supported list and delete its translation file from the 'public' folder.
   Note: This library only supports the language codes inside /LanguageCodes/LanguageCode.json or https://py-googletrans.readthedocs.io/en/latest/#language-detection

2. The script will translate text values from the 'en.json' source file to the target language, update the output
   translation file, and maintain a record of supported languages in the 'supportedLanguages.json' file.

File Structure:
- 'en.json': The source data in English that needs to be translated.
- 'locales/': Folder containing output translation files for different languages.
- 'LanguageCodes/LanguageCodes.json': JSON file mapping language codes to language names.
- 'locales/supportedLanguages.json': JSON file maintaining the list of supported languages.

Note:
- Ensure that the required input files and directories are present in the same directory as this script before execution.
"""


import json
from googletrans import Translator
import os
# pip install googletrans==3.1.0a0

class TranslationManager:
    def __init__(self, target_language_code):
        # Initialise the TranslationManager with a target language code
        self.target_language_code = target_language_code
        self.translator = Translator()

    def translate_values(self, values):
        # Translate a list of values using Google Translate API
        translations = [self.translator.translate(value, dest=self.target_language_code).text for value in values]
        return translations

    def translate_and_save(self, input_file, output_file, locales_folder, language_codes_file, supported_languages_file, overwrite=False):
        try:
            # Try to load existing translated data from the output file
            with open(str(locales_folder + output_file), 'r', encoding='utf-8') as output_file_obj:
                existing_translated_data = json.load(output_file_obj)
        except FileNotFoundError:
            # If output file doesn't exist, initialise an empty dictionary
            existing_translated_data = {}
            overwrite = False

        # Load the source data from the English locale file
        with open(locales_folder + 'en.json', 'r', encoding='utf-8', newline='') as user_file:
            input_data = json.load(user_file)

        # Extract the values to be translated
        values_to_translate = list(input_data.values())

        # Translate the values
        translated_values = self.translate_values(values_to_translate)

        # Update the existing translated data with new translations
        for key, value in zip(input_data.keys(), translated_values):
            if overwrite or key not in existing_translated_data:
                existing_translated_data[key] = value

        # Save the updated translated data to the output file
        with open(str(locales_folder + output_file), 'w', encoding='utf-8', newline='') as output_file_obj:
            json.dump(existing_translated_data, output_file_obj, ensure_ascii=False, indent=4)

        print(f"Translated data saved to '{output_file}'.")

        # Load language codes
        with open(language_codes_file, 'r') as lang_codes_file:
            language_codes = json.load(lang_codes_file)

        # Create an entry for the newly translated language
        language_entry = {"code": self.target_language_code, "name": language_codes[self.target_language_code]}

        # Load and update the list of supported languages
        with open(supported_languages_file, 'r') as supported_lang_file:
            supported_languages = json.load(supported_lang_file)

        existing_codes = [item["code"] for item in supported_languages]

        # Add the new language entry if not already in the list
        if self.target_language_code not in existing_codes:
            supported_languages.append(language_entry)
            with open(supported_languages_file, "w") as json_file:
                json.dump(supported_languages, json_file, indent=4)
        else:
            print(f'Dictionary with code "{self.target_language_code}" already exists.')


def main():
    delete_language = input("Do you want to delete a language? (y/n): ").strip().lower()

    if delete_language == 'y':
        delete_language_code = input("Enter the language code to delete: ")
        if delete_language_code == 'en':
            print("Cannot delete source language.")
            return
        else:
            # Load and update the list of supported languages
            with open('./locales/supportedLanguages.json', 'r') as supported_lang_file:
                supported_languages = json.load(supported_lang_file)

            existing_codes = [item["code"] for item in supported_languages]

            if delete_language_code in existing_codes:
                # Remove the language entry from the supported languages
                supported_languages = [lang for lang in supported_languages if lang["code"] != delete_language_code]

                # Save the updated supported languages list
                with open('./locales/supportedLanguages.json', 'w') as json_file:
                    json.dump(supported_languages, json_file, indent=4)
                
                print(f'Language with code "{delete_language_code}" deleted from supported languages.')
                translation_file_path = f'./../../public/locales/{delete_language_code}.json'
                if os.path.exists(translation_file_path):
                    os.remove(translation_file_path)
                    print(f'Translation file "{delete_language_code}.json" deleted from public folder.')
                else:
                    print(f'Translation file "{delete_language_code}.json" not found in public folder.')


            else:
                print(f'Language with code "{delete_language_code}" does not exist in supported languages.')
    elif delete_language == 'n':
        target_language_code = input("Enter the target language code (e.g., 'es' for Spanish): ")
        overwrite_input = input("Do you want to overwrite existing translations? (y/n): ").strip().lower()

        if overwrite_input == 'y':
            overwrite = True
        else:
            overwrite = False

        # Define filenames and paths
        output_filename = f"{target_language_code}.json"
        localesFolder = './../../public/locales/'
        languageCodes = './LanguageCodes/LanguageCodes.json'
        supportedLanguages = './locales/supportedLanguages.json'

        # Initialise the TranslationManager and perform translation and saving
        translator = TranslationManager(target_language_code)
        translator.translate_and_save('en.json', output_filename, localesFolder, languageCodes, supportedLanguages, overwrite=overwrite)

    else:
        print("Invalid input. Please enter 'y' or 'n'.")
        

if __name__ == "__main__":
    main()