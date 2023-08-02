import json
from translate import Translator


def translate_values(values, target_language):
    translator = Translator(from_lang='en', to_lang=target_language)
    translations = [translator.translate(value) for value in values]
    return translations


target_language_code = 'es'
output_filename = f"{target_language_code}.json"

try:
    with open(output_filename, 'r', encoding='utf-8') as output_file:
        existing_translated_data = json.load(output_file)
except FileNotFoundError:
    existing_translated_data = {}

with open('en.json') as user_file:
    input_data = json.load(user_file)

values_to_translate = list(input_data.values())

translated_values = translate_values(values_to_translate, target_language_code)

for key, value in zip(input_data.keys(), translated_values):
    if key not in existing_translated_data:
        existing_translated_data[key] = value

with open(output_filename, 'w', encoding='utf-8') as output_file:
    json.dump(existing_translated_data, output_file,
              ensure_ascii=False, indent=2)

print(f"Translated data saved to '{output_filename}'.")
