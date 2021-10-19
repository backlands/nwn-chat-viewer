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
  const language = [lang, convertToRGB(r, g, b)];
  const trimLanguage = trimType.slice(____?.length || 0, trimType.length).trim();

  const content = trimLanguage
    .replaceAll(COLOR_KEYS_REGEX, '')
    .replaceAll(COLOR_END_REGEX, '');

  return [username, character, type, language, content];
};
