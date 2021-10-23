import { parseConversation } from '../utilities/parsing';

const TELL_TO_DMS = '[the_player] The Character: [Tell]  <c��>Sent to DM: </c><c��>A full message sent to the DM team.</c>';
const TELL_TO_PLAYER = '[player] The Character: [Tell]  A private message!';

const DM_MESSAGE = 'The Gamemaster : [Tell]  The game masters message.';

const GENERAL_TALK_MESSAGE = '[cr@zy_user name] Jim Jon`es (Slave): [Talk] Conversational message.';
const GENERAL_TALK_MESSAGE_LANGUAGE = '[cr@zy_user name] Jim Jon`es (Slave): [Talk]  <c�>[Abyssal]:</c> Conversational message.';

const WHISPER_MESSAGE = '[A Player Name] Joe Smith: [Whisper]  "A whispered message."';
const WHISPER_MESSAGE_UNKNOWN = 'Joe Smith: [Whisper]  "A whispered message."';
const WHISPER_MESSAGE_LANGUAGE = '[A Player Name] Joe Smith: [Whisper]  <c�>[Undercommon]:</c> "A whispered message."';

const SHOUT_MESSAGE = '[A Pla\'yur] Sing Son\'mir: [Shout]  "A shouted message!"';
const SHOUT_MESSAGE_MISSING_PLAYER = 'Sing Son\'mir: [Shout]  "A shouted message!"';
const SHOUT_MESSAGE_LANGUAGE = '[A Pla\'yur] Sing Son\'mir: [Shout]  <c�>[Undercommon]:</c> "A shouted message!"';

test('tests a tell by a player to a dungeon master', () => {
  expect(parseConversation(TELL_TO_DMS, 'Tell')).toStrictEqual({
    username: 'the_player',
    character: 'The Character',
    type: 'Tell',
    language: false,
    content: 'Sent to DM: A full message sent to the DM team.',
  });
});

test('tests a tell by a player to another player', () => {
  expect(parseConversation(TELL_TO_PLAYER, 'Tell')).toStrictEqual({
    username: 'player',
    character: 'The Character',
    type: 'Tell',
    language: false,
    content: 'A private message!',
  });
});

test('tests a tell by a dungeon master', () => {
  expect(parseConversation(DM_MESSAGE, 'Tell')).toStrictEqual({
    username: false,
    character: 'The Gamemaster',
    type: 'Tell',
    language: false,
    content: 'The game masters message.',
  });
});

test('tests a message by a player', () => {
  expect(parseConversation(GENERAL_TALK_MESSAGE, 'Talk')).toStrictEqual({
    username: 'cr@zy_user name',
    character: 'Jim Jon`es (Slave)',
    type: 'Talk',
    language: false,
    content: 'Conversational message.',
  });
});

test('tests a message by a player with a language', () => {
  expect(parseConversation(GENERAL_TALK_MESSAGE_LANGUAGE, 'Talk')).toStrictEqual({
    username: 'cr@zy_user name',
    character: 'Jim Jon`es (Slave)',
    type: 'Talk',
    language: {
      name: 'Abyssal',
      color: [139, 252, 252],
    },
    content: 'Conversational message.',
  });
});

test('tests a whisper by a player', () => {
  expect(parseConversation(WHISPER_MESSAGE, 'Whisper')).toStrictEqual({
    username: 'A Player Name',
    character: 'Joe Smith',
    type: 'Whisper',
    language: false,
    content: '"A whispered message."',
  });
});

test('tests a whisper by an unknown player', () => {
  expect(parseConversation(WHISPER_MESSAGE_UNKNOWN, 'Whisper')).toStrictEqual({
    username: false,
    character: 'Joe Smith',
    type: 'Whisper',
    language: false,
    content: '"A whispered message."',
  });
});

test('tests a whisper by a player with a language', () => {
  expect(parseConversation(WHISPER_MESSAGE_LANGUAGE, 'Whisper')).toStrictEqual({
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
  expect(parseConversation(SHOUT_MESSAGE, 'Shout')).toStrictEqual({
    username: "A Pla'yur",
    character: "Sing Son'mir",
    type: 'Shout',
    language: false,
    content: '"A shouted message!"',
  });
});

test('tests a shout by an unknown player', () => {
  expect(parseConversation(SHOUT_MESSAGE_MISSING_PLAYER, 'Shout')).toStrictEqual({
    username: false,
    character: "Sing Son'mir",
    type: 'Shout',
    language: false,
    content: '"A shouted message!"',
  });
});

test('tests a shout by a player with a language', () => {
  expect(parseConversation(SHOUT_MESSAGE_LANGUAGE, 'Shout')).toStrictEqual({
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
