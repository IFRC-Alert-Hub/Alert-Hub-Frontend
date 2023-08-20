// Load supported languages from supportedLanguages.json
import languages from "./../locales/supportedLanguages.json";
type Language = {
  code: string;
  name: string;
};

// Define a type for your messages
type MessageObject = {
  [key: string]: any;
};

async function loadLocaleMessages(localeCode: string): Promise<MessageObject> {
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL}/locales/${localeCode}.json`
    );
    const jsonObject: MessageObject = await response.json();
    return jsonObject;
  } catch (error) {
    console.error(`Error loading messages for locale '${localeCode}':`, error);
    return {};
  }
}

async function fetchAndLoadMessages() {
  const messages: Record<string, MessageObject> = {};

  for (const language of languages as Language[]) {
    const loadedMessages = await loadLocaleMessages(language.code);
    messages[language.code] = loadedMessages;
  }

  console.log("Messages: ", messages);
  return messages;
}

export default fetchAndLoadMessages;
