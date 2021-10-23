import {
  NWN_COLOR_TABLE,
  COLOR_KEYS_REGEX,
  COLOR_END_REGEX,
} from '../constants';

export const getAsciiCharCode = (character) => {
  let value = character.charCodeAt(0);

  if (value > 255) {
    const index = Object.values(NWN_COLOR_TABLE).findIndex((current) => (current === character));
    value = index >= 0 ? index : value;
  }

  return value >= 0 && value <= 255 ? value : 252;
};

export const convertToRGB = (r, g, b) => (
  [getAsciiCharCode(r), getAsciiCharCode(g), getAsciiCharCode(b)]
);

export const matchToColoredMessage = (_, r, g, b, message) => {
  const color = convertToRGB(r, g, b);

  return [color, message];
};

const getUsername = (message) => {
  const usernameSearch = message.match(/^\[([^\]]*)\]/);
  // eslint-disable-next-line no-unused-vars
  const [_, username] = usernameSearch || ['', false];

  return username;
};

const getDatetime = (message) => {
  const datetimeSearch = message.match(/^\[CHAT WINDOW TEXT\] \[([^\]]*)\]/);
  // eslint-disable-next-line no-unused-vars
  const [_, datetime] = datetimeSearch || ['', false];

  return datetime;
};

const getCharacter = (message, type) => {
  const search = new RegExp(`] ([^:]*): \\[${type}\\]`);

  let characterSearch = message.match(search);

  if (characterSearch === null) {
    characterSearch = message.match(new RegExp(/(.*)(?=:)/));
  }

  // eslint-disable-next-line no-unused-vars
  const [_, character] = characterSearch || ['', ''];

  return character.trim() || false;
};

const getContent = (message, type) => {
  const search = new RegExp(`\\[${type}\\]\\s*(.*)$`);
  const contentSearch = message.match(search);
  // eslint-disable-next-line no-unused-vars
  const [_, text] = contentSearch || ['', ''];

  const content = text
    .replace(COLOR_KEYS_REGEX, '')
    .replace(COLOR_END_REGEX, '')
    .replace(/\[([^\]]*)\]:/, '')
    .trim();

  return content;
};

const getLanguage = (message) => {
  const languageSearch = message.match(/<c(.?)(.?)(.?)>\[([^\]]*)\]:<\/c>/);
  // eslint-disable-next-line no-unused-vars
  const [_, r, g, b, name] = languageSearch || ['', '0', '0', '0', ''];
  const color = convertToRGB(r, g, b);
  const language = name ? { name, color } : false;

  return language;
};

export const parseConversation = (message, type) => {
  const username = getUsername(message);

  const character = getCharacter(message, type);

  const content = getContent(message, type);

  const language = getLanguage(message);

  return { username, character, type, language, content };
};

export const parseChatLog = (message) => {
  const datetime = getDatetime(message);

  const content = message.replace(/^\[[^\]]*\] \[[^\]]*\]/, '');

  return { username: false, character: datetime, type: false, language: false, content };
};

export const destructureMessage = (message) => {
  const usernameSearch = message.match(/^\[([^\]]*)\]/);
  const [_, username] = usernameSearch || ['', ''];
  const trimUsername = message.slice(_?.length || 0, message.length).trim();

  const characterSearch = trimUsername.match(/([^:]*):/);
  const disguiseSearch = trimUsername.match(/<c...>([^<]*)<\/c>:/);

  const [__, character] = disguiseSearch || characterSearch || ['', ''];

  const trimCharacter = trimUsername.slice(__?.length + 1 || 0, trimUsername.length).trim();

  const typeSearch = trimCharacter.match(/\[([^\]]*)\]/);
  const [___, type] = typeSearch || ['', ''];
  const trimType = trimCharacter.slice(___?.length || 0, trimCharacter.length).trim();

  const languageSearch = trimType.match(/<c(.?)(.?)(.?)>(\[[^\]]*\]):<\/c>/);
  const [____, r, g, b, lang] = languageSearch || ['', '0', '0', '0', ''];
  const language = { name: lang, color: convertToRGB(r, g, b) };
  const trimLanguage = trimType.slice(____?.length || 0, trimType.length).trim();

  const content = trimLanguage
    .replace(COLOR_KEYS_REGEX, '')
    .replace(COLOR_END_REGEX, '');

  return { username, character, type, language, content };
};
