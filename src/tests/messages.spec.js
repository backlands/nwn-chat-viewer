import { parseConversation, mergeableMessage } from '../utilities/parsing';

const TELL_TO_DMS = '[the_player] The Character: [Tell]  <c��>Sent to DM: </c><c��>A full message sent to the DM team.</c>';
const TELL_TO_PLAYER = '[player] The Character: [Tell]  A private : message!';
const ANONYMOUS_TELL_TO_PLAYER = 'Grip : [Tell]  Sounds like a good plan :)';

const DM_MESSAGE = 'The Gamemaster : [Tell]  The game masters message.';

const GENERAL_TALK_MESSAGE = '[cr@zy_user name] Jim Jon`es (Slave): [Talk] Conversational message.';
const GENERAL_TALK_MESSAGE_LANGUAGE = '[cr@zy_user name] Jim Jon`es (Slave): [Talk]  <c�>[Abyssal]:</c> Conversational : message.';

const WHISPER_MESSAGE = '[A Player Name] Joe Smith: [Whisper]  "A whispered message."';
const WHISPER_MESSAGE_UNKNOWN = 'Joe Smith: [Whisper]  "A whispered message."';
const WHISPER_MESSAGE_LANGUAGE = '[A Player Name] Joe Smith: [Whisper]  <c�>[Undercommon]:</c> "A whispered message."';

const SHOUT_MESSAGE = '[A Pla\'yur] Sing Son\'mir: [Shout]  "A shouted message!"';
const SHOUT_MESSAGE_MISSING_PLAYER = 'Sing Son\'mir: [Shout]  "A shouted message!"';
const SHOUT_MESSAGE_LANGUAGE = '[A Pla\'yur] Sing Son\'mir: [Shout]  <c�>[Undercommon]:</c> "A shouted message!"';

test('tests a tell by a player to a dungeon master', () => {
  const type = mergeableMessage(TELL_TO_DMS);

  expect(parseConversation(TELL_TO_DMS, type)).toStrictEqual({
    username: 'the_player',
    character: 'The Character',
    type: 'Tell',
    language: false,
    content: 'Sent to DM: A full message sent to the DM team.',
  });
});

test('tests a tell by a player to another player', () => {
  const type = mergeableMessage(TELL_TO_PLAYER);

  expect(parseConversation(TELL_TO_PLAYER, type)).toStrictEqual({
    username: 'player',
    character: 'The Character',
    type: 'Tell',
    language: false,
    content: 'A private : message!',
  });
});

test('tests a secret tell by a player to another player', () => {
  const type = mergeableMessage(ANONYMOUS_TELL_TO_PLAYER);

  expect(parseConversation(ANONYMOUS_TELL_TO_PLAYER, type)).toStrictEqual({
    username: false,
    character: 'Grip',
    type: 'Tell',
    language: false,
    content: 'Sounds like a good plan :)',
  });
});

test('tests a tell by a dungeon master', () => {
  const type = mergeableMessage(DM_MESSAGE);

  expect(parseConversation(DM_MESSAGE, type)).toStrictEqual({
    username: false,
    character: 'The Gamemaster',
    type: 'Tell',
    language: false,
    content: 'The game masters message.',
  });
});

test('tests a message by a player', () => {
  const type = mergeableMessage(GENERAL_TALK_MESSAGE);

  expect(parseConversation(GENERAL_TALK_MESSAGE, type)).toStrictEqual({
    username: 'cr@zy_user name',
    character: 'Jim Jon`es (Slave)',
    type: 'Talk',
    language: false,
    content: 'Conversational message.',
  });
});

test('tests a message by a player with a language', () => {
  const type = mergeableMessage(GENERAL_TALK_MESSAGE_LANGUAGE);

  expect(parseConversation(GENERAL_TALK_MESSAGE_LANGUAGE, type)).toStrictEqual({
    username: 'cr@zy_user name',
    character: 'Jim Jon`es (Slave)',
    type: 'Talk',
    language: {
      name: 'Abyssal',
      color: [139, 252, 252],
    },
    content: 'Conversational : message.',
  });
});

test('tests a whisper by a player', () => {
  const type = mergeableMessage(WHISPER_MESSAGE);

  expect(parseConversation(WHISPER_MESSAGE, type)).toStrictEqual({
    username: 'A Player Name',
    character: 'Joe Smith',
    type: 'Whisper',
    language: false,
    content: '"A whispered message."',
  });
});

test('tests a whisper by an unknown player', () => {
  const type = mergeableMessage(WHISPER_MESSAGE_UNKNOWN);

  expect(parseConversation(WHISPER_MESSAGE_UNKNOWN, type)).toStrictEqual({
    username: false,
    character: 'Joe Smith',
    type: 'Whisper',
    language: false,
    content: '"A whispered message."',
  });
});

test('tests a whisper by a player with a language', () => {
  const type = mergeableMessage(WHISPER_MESSAGE_LANGUAGE);

  expect(parseConversation(WHISPER_MESSAGE_LANGUAGE, type)).toStrictEqual({
    username: 'A Player Name',
    character: 'Joe Smith',
    type: 'Whisper',
    language: {
      name: 'Undercommon',
      color: [139, 252, 252],
    },
    content: '"A whispered message."',
  });
});

test('tests a shout by a player', () => {
  const type = mergeableMessage(SHOUT_MESSAGE);

  expect(parseConversation(SHOUT_MESSAGE, type)).toStrictEqual({
    username: "A Pla'yur",
    character: "Sing Son'mir",
    type: 'Shout',
    language: false,
    content: '"A shouted message!"',
  });
});

test('tests a shout by an unknown player', () => {
  const type = mergeableMessage(SHOUT_MESSAGE_MISSING_PLAYER);

  expect(parseConversation(SHOUT_MESSAGE_MISSING_PLAYER, type)).toStrictEqual({
    username: false,
    character: "Sing Son'mir",
    type: 'Shout',
    language: false,
    content: '"A shouted message!"',
  });
});

test('tests a shout by a player with a language', () => {
  const type = mergeableMessage(SHOUT_MESSAGE_LANGUAGE);

  expect(parseConversation(SHOUT_MESSAGE_LANGUAGE, type)).toStrictEqual({
    username: "A Pla'yur",
    character: "Sing Son'mir",
    type: 'Shout',
    language: {
      name: 'Undercommon',
      color: [139, 252, 252],
    },
    content: '"A shouted message!"',
  });
});
