import React, { useMemo } from 'react';

import Log from './Log';

import { destructureMessage, parseConversation, parseChatLog } from '../../utilities/parsing';
import { MESSAGE_REGEX } from '../../constants';
import './styles.scss';

const mergeableMessage = (message) => {
  const search = message.match(MESSAGE_REGEX);

  return search === null ? false : search[1];
};

const filterableMessage = (message, endings) => {
  if (message === endings) return true;
  if (message === '') return true;
  if (message === 'Unknown Update sub-message') return true;
  if (message.includes('nwsync:')) return true;
  if (message.includes('Error:')) return true;
  if (message.includes('GOG:')) return true;
  if (message.includes('Your cryptographic public identity')) return true;
  if (message.includes('Game is using local port')) return true;
  if (message.includes('ValidateGFFResource')) return true;
  return false;
};

const Viewer = ({ chatlog }) => {
  // Merges together all consecutive paragraphs of messages based on last visible
  // speaking method: Talk, Whisper, Shout, DM, Tell, Party.
  const parsedChatlog = useMemo(() => {
    if (chatlog) {
      const LINE_ENDINGS = chatlog.match('\r\n') ? '\r\n' : '\n';

      return chatlog.split(LINE_ENDINGS).reduce(({ dialog, combat, lastType }, curr) => {
        const filter = filterableMessage(curr, LINE_ENDINGS);
        const type = mergeableMessage(curr);

        let previousMessage;

        if (lastType === 'dialog') {
          previousMessage = dialog.length - 1 >= 0 ? dialog[dialog.length - 1] : false;
        } else {
          previousMessage = combat.length - 1 >= 0 ? combat[combat.length - 1] : false;
        }

        if (filter) return { dialog, combat, lastType };

        if (!type && previousMessage) {
          previousMessage.content = `${previousMessage?.content}\r\n${curr}`;

          return { dialog, combat, lastType };
        }

        switch (type) {
          case 'CHAT WINDOW TEXT':
            return {
              dialog,
              combat: [...combat, parseChatLog(curr)],
              lastType: 'combat',
            };

          case 'Talk':
          case 'Whisper':
          case 'Shout':
          case 'Tell':
            return {
              dialog: [...dialog, parseConversation(curr, type)],
              combat,
              lastType: 'dialog',
            };

          default:
            return {
              dialog: [...dialog, destructureMessage(curr)],
              combat,
              lastType: 'dialog',
            };
        }
      }, { dialog: [], combat: [], lastType: undefined });
    }

    return false;
  }, [chatlog]);

  if (parsedChatlog) {
    return (
      <div className="Viewer">
        <Log title="Chat Log" portraits chatlog={parsedChatlog.dialog} />
        <Log title="Gameplay Log" chatlog={parsedChatlog.combat} />
      </div>
    );
  }

  return null;
};

export default Viewer;
