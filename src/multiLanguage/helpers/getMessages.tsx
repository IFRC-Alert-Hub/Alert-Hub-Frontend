// import en from "./../locales/en.json";
// import fr from "./../locales/fr.json";
// export const messages = { en: en, fr: fr };
import languages from "./../locales/supportedLanguages.json";

// Define a type for your messages
type MessageObject = {
  // Define the structure of your messages here
  // For example: home: { title: string; ... }
  [key: string]: any;
};

async function loadLocaleMessages(localeCode: string): Promise<MessageObject> {
  try {
    const { default: jsonObject } = await import(
      `./../locales/${localeCode}.json`
    );

    return jsonObject;
  } catch (error) {
    console.error(`Error loading messages for locale '${localeCode}':`, error);
    return {};
  }
}

async function fetchAndLoadMessages() {
  const messages: Record<string, MessageObject> = {}; // Annotate messages object with its type

  for (const language of languages) {
    const loadedMessages = await loadLocaleMessages(language.code);
    messages[language.code] = loadedMessages;
  }

  console.log("Messages: ", messages);
  return messages;
}

export default fetchAndLoadMessages;
