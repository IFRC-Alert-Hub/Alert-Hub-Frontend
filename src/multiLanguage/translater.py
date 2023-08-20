import json
from googletrans import Translator
#pip3 install googletrans==3.1.0a0 
def translate_values(values, target_language):
    translator = Translator()
    translations = [translator.translate(value, dest=target_language).text for value in values]
    return translations

target_language_code = 'es'
output_filename = f"{target_language_code}.json"
localesFolder = './locales/'
languageCodes = './LanguageCodes/LanguageCodes.json'
supportedLanguages = './locales/supportedLanguages.json'

try:
    with open(output_filename, 'r', encoding='utf-8') as output_file:
        existing_translated_data = json.load(output_file)
except FileNotFoundError:
    existing_translated_data = {}

with open(localesFolder + 'en.json') as user_file:
    input_data = json.load(user_file)

values_to_translate = list(input_data.values())

translated_values = translate_values(values_to_translate, target_language_code)

for key, value in zip(input_data.keys(), translated_values):
    if key not in existing_translated_data:
        existing_translated_data[key] = value

with open(localesFolder + output_filename, 'w', encoding='utf-8') as output_file:
    json.dump(existing_translated_data, output_file,
              ensure_ascii=False, indent=2)

print(f"Translated data saved to '{output_filename}'.")


# Load LanguageCodes.json
with open(languageCodes, 'r') as lang_codes_file:
    language_codes = json.load(lang_codes_file)

a =   { "code": target_language_code, "name": language_codes[target_language_code] }
print(a)

with open(supportedLanguages, 'r') as supported_lang_file:
    supported_languages = json.load(supported_lang_file)


existing_codes = [item["code"] for item in supported_languages]
if target_language_code not in existing_codes: 
    supported_languages.append(a)
    with open(supportedLanguages, "w") as json_file:
        json.dump(supported_languages, json_file, indent=4)
else:
    print(f'Dictionary with code "{target_language_code}" already exists.')
