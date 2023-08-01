import json
from translate import Translator
import json


def translate_values(values, target_language):
    translator = Translator(from_lang='en', to_lang=target_language)
    translations = [translator.translate(value) for value in values]
    return translations


target_language_code = 'es'
with open('en.json') as user_file:
    input_data = json.load(user_file)

print(input_data)
values_to_translate = list(input_data.values())
print(values_to_translate)

translated_values = translate_values(values_to_translate, target_language_code)

translated_data = dict(zip(input_data.keys(), translated_values))

output_filename = f"{target_language_code}.json"
with open(output_filename, 'w', encoding='utf-8') as output_file:
    json.dump(translated_data, output_file, ensure_ascii=False, indent=2)

print(f"Translated data saved to '{output_filename}'.")
